/**
 * @Author: Caven
 * @Date: 2020-08-29 20:54:37
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { Polyline } from '@dc-modules/overlay'
import Draw from './Draw'

const DEF_STYLE = {
  width: 3,
  material: Cesium.Color.YELLOW.withAlpha(0.6)
}

class DrawPolyline extends Draw {
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
      polyline: {
        ...this._style,
        positions: new Cesium.CallbackProperty(() => {
          return this._positions
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
    this._tooltip.showAt(e.windowPosition, '单击选择点位,右击结束')
    if (this._floatingAnchor) {
      let position = this._clampToGround ? e.surfacePosition : e.position
      this._floatingAnchor.position.setValue(position)
      this._positions.pop()
      this._positions.push(position)
    }
  }

  _onRightClick(e) {
    this.unbindEvent()
    let polyline = new Polyline(
      Transform.transformCartesianArrayToWGS84Array(this._positions)
    )
    polyline.setStyle(this._style)
    this._plotEvent.raiseEvent(polyline)
  }
}

export default DrawPolyline
