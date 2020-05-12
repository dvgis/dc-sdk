/*
 * @Author: Caven
 * @Date: 2020-01-31 16:25:29
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:09:24
 */

import Draw from './Draw'

const { OverlayType, Transform } = DC

const { Cesium } = DC.Namespace

const DEF_STYLE = {
  pixelSize: 10,
  outlineColor: Cesium.Color.BLUE,
  outlineWidth: 5
}

class DrawPoint extends Draw {
  constructor(plotInfo, style) {
    super(plotInfo)
    this._position = Cesium.Cartesian3.ZERO
    this._style = {
      ...DEF_STYLE,
      ...style
    }
  }

  _mouseClickHandler(e) {
    this._position = e.target ? e.position : e.surfacePosition
    this._unbindEnvet()
    this._plotEvent.raiseEvent({
      type: OverlayType.POINT,
      points: [Transform.transformCartesianToWGS84(this._position)]
    })
  }

  _mouseMoveHandler(e) {
    this._position = e.target ? e.position : e.surfacePosition
    this._viewer.tooltip.showAt(e.windowPosition, '单击选择点位')
  }

  _prepareDelegate() {
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return this._position
    })
    this._delegate.point = {
      ...this._style
    }
    this._layer.entities.add(this._delegate)
  }
}

export default DrawPoint
