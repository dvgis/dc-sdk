/**
 * @Author: Caven
 * @Date: 2020-08-30 23:41:34
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Edit from './Edit'

class EditRectangle extends Edit {
  constructor(overlay) {
    super(overlay)
    this._overlay = overlay
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    this._delegate.rectangle.coordinates = new Cesium.CallbackProperty(time => {
      if (this._positions.length > 1) {
        return Cesium.Rectangle.fromCartesianArray(this._positions)
      } else {
        return null
      }
    }, false)
    this._layer.entities.add(this._delegate)
  }
}

export default EditRectangle
