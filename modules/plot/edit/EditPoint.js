/**
 * @Author: Caven
 * @Date: 2020-08-30 22:04:36
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Edit from './Edit'

class EditPoint extends Edit {
  constructor(overlay) {
    super()
    this._overlay = overlay
    this._position = undefined
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity()
    this._delegate.merge(this._overlay.delegate)
    this._overlay.show = false
    this._position = this._delegate.position.getValue(Cesium.JulianDate.now())
    this._delegate.position = new Cesium.CallbackProperty(() => {
      return this._position
    })
    this._layer.add(this._delegate)
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '右击结束编辑')
    this._position = this._clampToGround ? e.surfacePosition : e.position
  }

  _onRightClick(e) {
    this.unbindEvent()
    this._overlay.position = Transform.transformCartesianToWGS84(this._position)
    this._overlay.show = true
    this._plotEvent.raiseEvent(this._overlay)
  }
}

export default EditPoint
