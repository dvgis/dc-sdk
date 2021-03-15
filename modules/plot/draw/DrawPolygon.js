/**
 * @Author: Caven
 * @Date: 2020-08-29 20:55:14
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { Polygon } from '@dc-modules/overlay'
import Draw from './Draw'

const DEF_STYLE = {
  material: Cesium.Color.YELLOW.withAlpha(0.6),
  fill: true
}

class DrawPolygon extends Draw {
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
      polygon: {
        ...this._style,
        hierarchy: new Cesium.CallbackProperty(() => {
          if (this._positions.length > 2) {
            return new Cesium.PolygonHierarchy(this._positions)
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
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '左击选择点位,右击结束')
    if (this._floatingAnchor) {
      let position = this._clampToGround ? e.surfacePosition : e.position
      this._floatingAnchor.position.setValue(position)
      this._positions.pop()
      this._positions.push(position)
    }
  }

  _onRightClick(e) {
    this.unbindEvent()
    let polygon = new Polygon(
      Transform.transformCartesianArrayToWGS84Array(this._positions)
    )
    polygon.setStyle(this._style)
    this._plotEvent.raiseEvent(polygon)
  }
}

export default DrawPolygon
