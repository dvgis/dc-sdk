/**
 * @Author: Caven
 * @Date: 2020-01-31 16:25:29
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { Point } from '@dc-modules/overlay'
import Draw from './Draw'

const DEF_STYLE = {
  pixelSize: 10,
  outlineColor: Cesium.Color.BLUE,
  outlineWidth: 5
}

class DrawPoint extends Draw {
  constructor(style) {
    super()
    this._position = Cesium.Cartesian3.ZERO
    this._style = {
      ...DEF_STYLE,
      ...style
    }
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity({
      position: new Cesium.CallbackProperty(() => {
        return this._position
      }, false),
      point: {
        ...this._style
      }
    })
    this._layer.add(this._delegate)
  }

  _onClick(e) {
    this._position = this._clampToGround ? e.surfacePosition : e.position
    this.unbindEvent()
    let point = new Point(Transform.transformCartesianToWGS84(this._position))
    point.setStyle(this._style)
    this._plotEvent.raiseEvent(point)
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '单击选择点位')
    this._position = this._clampToGround ? e.surfacePosition : e.position
  }
}

export default DrawPoint
