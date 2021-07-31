/**
 * @Author: Caven
 * @Date: 2021-06-03 21:06:17
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { Util } from '@dc-modules/utils'
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
    this.type = Overlay.getOverlayType('bounce_label_primitive')
    this._state = State.INITIALIZED
  }

  /**
   *
   * @param layer
   * @private
   */
  _onAdd(layer) {
    if (!layer) {
      return
    }
    this._layer = layer
    this._mountedHook && this._mountedHook()
    if (this._layer?.delegate?.add && this._delegate) {
      this._delegate = this._layer.labels.add(this._delegate)
      this._layer.delegate.add(this)
    }
    this._addedHook && this._addedHook()
    this._state = State.ADDED
  }

  _onRemove() {
    if (!this._layer || !this._delegate) {
      return
    }
    if (this._layer?.delegate?.remove) {
      this._layer.labels.remove(this._delegate)
      this._layer.delegate.remove(this)
    }
    this._removedHook && this._removedHook()
    this._state = State.REMOVED
  }

  /**
   *
   */
  update() {
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
}

Overlay.registerType('bounce_label_primitive')

export default BounceLabelPrimitive
