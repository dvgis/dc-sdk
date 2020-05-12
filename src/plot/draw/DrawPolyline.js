/*
 * @Author: Caven
 * @Date: 2020-01-31 18:18:44
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:10:21
 */

import Draw from './Draw'

const { OverlayType, Transform } = DC

const { Cesium } = DC.Namespace

const DEF_STYLE = {
  width: 3,
  material: Cesium.Color.BLUE.withAlpha(0.6)
}

class DrawPolyline extends Draw {
  constructor(plotInfo, style) {
    super(plotInfo)
    this._tempLine = new Cesium.Entity()
    this._positions = []
    this._tempPoints = []
    this._style = {
      ...DEF_STYLE,
      ...style
    }
  }

  _mouseClickHandler(e) {
    let position = e.target ? e.position : e.surfacePosition
    if (position) {
      this._positions.push(position)
    }
  }

  _mouseMoveHandler(e) {
    let position = e.target ? e.position : e.surfacePosition
    this._viewer.tooltip.showAt(e.windowPosition, '单击选择点位,右击结束')
    if (position && this._positions.length > 0) {
      this._tempPoints = [this._positions[this._positions.length - 1], position]
    }
  }

  _mouseRightClickHandler(e) {
    this._unbindEnvet()
    this._plotEvent.raiseEvent({
      type: OverlayType.POLYLINE,
      points: Transform.transformCartesianArrayToWGS84Array(this._positions)
    })
  }

  _prepareDelegate() {
    this._delegate.polyline = {
      positions: new Cesium.CallbackProperty(time => {
        return this._positions
      }),
      ...this._style
    }
    this._tempLine.polyline = {
      positions: new Cesium.CallbackProperty(time => {
        return this._tempPoints
      }),
      ...this._style
    }
    this._layer.entities.add(this._delegate)
    this._layer.entities.add(this._tempLine)
  }
}

export default DrawPolyline
