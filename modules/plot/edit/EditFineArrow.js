/**
 * @Author: Caven
 * @Date: 2020-08-30 23:46:07
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '@dc-modules/event'
import { Transform } from '@dc-modules/transform'
import Edit from './Edit'
import FineArrowGraphics from '../graphics/FineArrowGraphics'

class EditFineArrow extends Edit {
  constructor(overlay) {
    super(overlay)
    this._graphics = new FineArrowGraphics()
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    this._delegate.polygon.hierarchy = new Cesium.CallbackProperty(() => {
      if (this._positions.length > 1) {
        this._graphics.positions = this._positions
        return this._graphics.hierarchy
      } else {
        return null
      }
    }, false)
    this._layer.entities.add(this._delegate)
  }
}

export default EditFineArrow
