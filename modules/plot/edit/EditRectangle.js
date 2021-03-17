/**
 * @Author: Caven
 * @Date: 2020-08-30 23:41:34
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Edit from './Edit'

class EditRectangle extends Edit {
  constructor(overlay) {
    super()
    this._overlay = overlay
    this._positions = []
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity()
    this._delegate.merge(this._overlay.delegate)
    this._overlay.show = false
    this._delegate.rectangle.coordinates = new Cesium.CallbackProperty(time => {
      if (this._positions.length > 1) {
        return Cesium.Rectangle.fromCartesianArray(this._positions)
      } else {
        return null
      }
    }, false)
    this._layer.add(this._delegate)
  }

  _mountAnchor() {
    this._positions = [].concat(
      Transform.transformWGS84ArrayToCartesianArray(this._overlay.positions)
    )
    this._positions.forEach((item, index) => {
      this.createAnchor(item, index)
    })
  }

  _onClick(e) {
    if (this._isMoving) {
      this._isMoving = false
      if (this._pickedAnchor && this._pickedAnchor.position) {
        let position = this._clampToGround ? e.surfacePosition : e.position
        this._pickedAnchor.position.setValue(position)
        let properties = this._pickedAnchor.properties.getValue(
          Cesium.JulianDate.now()
        )
        this._positions[properties.index] = position
      }
    } else {
      this._isMoving = true
      if (!e.target || !e.target.id) {
        return false
      }
      this._pickedAnchor = e.target.id
    }
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '点击锚点移动,右击结束编辑')
    if (!this._isMoving) {
      return
    }
    if (this._pickedAnchor && this._pickedAnchor.position) {
      let properties = this._pickedAnchor.properties.getValue(
        Cesium.JulianDate.now()
      )
      let position = this._clampToGround ? e.surfacePosition : e.position
      this._pickedAnchor.position.setValue(position)
      this._positions[properties.index] = position
    }
  }

  _onRightClick(e) {
    this.unbindEvent()
    this._overlay.positions = Transform.transformCartesianArrayToWGS84Array(
      this._positions
    )
    this._overlay.show = true
    this._plotEvent.raiseEvent(this._overlay)
  }
}

export default EditRectangle
