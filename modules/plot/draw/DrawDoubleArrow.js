/**
 * @Author: Caven
 * @Date: 2020-08-30 16:43:12
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { DoubleArrow } from '@dc-modules/overlay'
import Draw from './Draw'
import DoubleArrowGraphics from '../graphics/DoubleArrowGraphics'

const DEF_STYLE = {
  material: Cesium.Color.YELLOW.withAlpha(0.6),
  fill: true
}

class DrawDoubleArrow extends Draw {
  constructor(style) {
    super()
    this._positions = []
    this._floatingAnchor = undefined
    this._style = {
      ...DEF_STYLE,
      ...style
    }
    this._graphics = new DoubleArrowGraphics()
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity({
      polygon: {
        ...this._style,
        hierarchy: new Cesium.CallbackProperty(() => {
          if (this._positions.length > 2) {
            this._graphics.positions = this._positions
            return this._graphics.hierarchy
          } else {
            return null
          }
        }, false)
      }
    })
    this._layer.add(this._delegate)
  }

  _onClick(e) {
    let len = this._positions.length
    let position = this._clampToGround ? e.surfacePosition : e.position
    if (len === 0) {
      this._positions.push(position)
      this.createAnchor(position)
      this._floatingAnchor = this.createAnchor(position)
    }
    this._positions.push(position)
    this._graphics.positions = this._positions
    this.createAnchor(position)
    if (len > 3) {
      this._positions.pop()
      this.unbindEvent()
      let doubleArrow = new DoubleArrow(
        Transform.transformCartesianArrayToWGS84Array(this._positions)
      )
      doubleArrow.setStyle(this._style)
      this._plotEvent.raiseEvent(doubleArrow)
    }
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '单击选择点位')
    if (this._floatingAnchor) {
      let position = this._clampToGround ? e.surfacePosition : e.position
      this._floatingAnchor.position.setValue(position)
      this._positions.pop()
      this._positions.push(position)
    }
  }
}

export default DrawDoubleArrow
