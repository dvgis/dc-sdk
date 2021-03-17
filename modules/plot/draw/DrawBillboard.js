/**
 * @Author: Caven
 * @Date: 2020-08-29 20:29:59
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { Billboard } from '@dc-modules/overlay'
import Draw from './Draw'

const IMG_CIRCLE_RED = require('@dc-modules/images/circle_red.png')

const DEF_STYLE = {}

class DrawPoint extends Draw {
  constructor(style) {
    super()
    this._position = Cesium.Cartesian3.ZERO
    this._style = {
      image: IMG_CIRCLE_RED,
      ...DEF_STYLE,
      ...style
    }
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity({
      position: new Cesium.CallbackProperty(() => {
        return this._position
      }, false),
      billboard: {
        ...this._style
      }
    })
    this._layer.add(this._delegate)
  }

  _onClick(e) {
    this._position = this._clampToGround ? e.surfacePosition : e.position
    this.unbindEvent()
    let billboard = new Billboard(
      Transform.transformCartesianToWGS84(this._position),
      this._style.image
    )
    billboard.setStyle(this._style)
    this._plotEvent.raiseEvent(billboard)
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '单击选择点位')
    this._position = this._clampToGround ? e.surfacePosition : e.position
  }
}

export default DrawPoint
