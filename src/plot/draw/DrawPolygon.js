/*
 * @Author: Caven
 * @Date: 2020-01-31 18:59:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:09:41
 */

import Draw from './Draw'

const { OverlayType, Transform } = DC

const { Cesium } = DC.Namespace

const DEF_STYLE = {
  material: Cesium.Color.BLUE.withAlpha(0.6)
}

class DrawPolygon extends Draw {
  constructor(plotInfo, style) {
    super(plotInfo)
    this._hierarchy = new Cesium.PolygonHierarchy()
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
      if (this._positions.length === 2) {
        this._delegate.polyline.show = false
      }
      this._positions.push(position)
      this._hierarchy.positions = this._positions
    }
  }

  _mouseMoveHandler(e) {
    let position = e.target ? e.position : e.surfacePosition
    this._viewer.tooltip.showAt(e.windowPosition, '左击选择点位,右击结束')
    if (position && this._positions.length > 0) {
      this._tempPoints = [this._positions[this._positions.length - 1], position]
      this._hierarchy.positions = [...this._positions, position]
    }
  }

  _mouseRightClickHandler(e) {
    this._unbindEnvet()
    this._plotEvent.raiseEvent({
      type: OverlayType.POLYGON,
      points: Transform.transformCartesianArrayToWGS84Array(this._positions)
    })
  }

  _prepareDelegate() {
    this._delegate.polygon = {
      hierarchy: new Cesium.CallbackProperty(time => {
        return this._hierarchy
      }),
      ...this._style
    }
    this._delegate.polyline = {
      positions: new Cesium.CallbackProperty(time => {
        return this._tempPoints
      }),
      ...this._style
    }
    this._layer.entities.add(this._delegate)
  }
}

export default DrawPolygon
