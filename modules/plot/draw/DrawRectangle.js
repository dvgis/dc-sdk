/**
 * @Author: Caven
 * @Date: 2020-08-29 21:30:41
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { Rectangle } from '@dc-modules/overlay'
import Draw from './Draw'

const DEF_STYLE = {
  material: Cesium.Color.YELLOW.withAlpha(0.6)
}

class DrawRectangle extends Draw {
  constructor(style) {
    super()
    this._positions = []
    this._style = {
      ...DEF_STYLE,
      ...style
    }
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity({
      rectangle: {
        ...this._style,
        coordinates: new Cesium.CallbackProperty(time => {
          if (this._positions.length > 1) {
            return Cesium.Rectangle.fromCartesianArray(this._positions)
          } else {
            return null
          }
        }, false)
      }
    })
    this._layer.add(this._delegate)
  }

  _onClick(e) {
    let position = this._clampToGround ? e.surfacePosition : e.position
    let len = this._positions.length
    if (len === 0) {
      this._positions.push(position)
      this.createAnchor(position)
      this._floatingAnchor = this.createAnchor(position)
    }
    this._positions.push(position)
    this.createAnchor(position)
    if (len > 1) {
      this._positions.pop()
      this.unbindEvent()
      let rectangle = new Rectangle(
        Transform.transformCartesianArrayToWGS84Array(this._positions)
      )
      rectangle.setStyle(this._style)
      this._plotEvent.raiseEvent(rectangle)
    }
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '左击选择点位')
    if (this._floatingAnchor) {
      let position = this._clampToGround ? e.surfacePosition : e.position
      this._floatingAnchor.position.setValue(position)
      this._positions.pop()
      this._positions.push(position)
    }
  }
}

export default DrawRectangle
