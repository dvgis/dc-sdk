/**
 * @Author: Caven
 * @Date: 2021-06-03 21:06:17
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Overlay from '../Overlay'
import LabelPrimitive from './LabelPrimitive'

const DEF_STYLE = {
  maxOffsetY: 10,
  offsetAmount: 0.1
}

class BounceLabelPrimitive extends LabelPrimitive {
  constructor(position, text) {
    super(position, text)
    this._currentOffset = new Cesium.Cartesian2(0, 0)
    this._isUp = true
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('bounce_label_primitive')
  }

  /**
   *
   * @param frameState
   */
  update(frameState) {
    if (!this._show) {
      return
    }
    let maxOffsetY = this._style?.maxOffsetY || DEF_STYLE.maxOffsetY
    let offsetAmount = this._style?.offsetAmount || DEF_STYLE.offsetAmount
    if (this._currentOffset.y >= 0) {
      this._isUp = true
    } else if (this._currentOffset.y <= -maxOffsetY) {
      this._isUp = false
    }
    this._currentOffset.y += offsetAmount * (this._isUp ? -1 : 1)
    this._delegate.pixelOffset = this._currentOffset
  }

  /**
   * @return {*}
   */
  destroy() {
    return Cesium.destroyObject(this)
  }
}

Overlay.registerType('bounce_label_primitive')

export default BounceLabelPrimitive
