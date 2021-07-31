/**
 * @Author: Caven
 * @Date: 2021-06-03 21:06:17
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { Util } from '@dc-modules/utils'
import Overlay from '../Overlay'
import BillboardPrimitive from './BillboardPrimitive'

const DEF_STYLE = {
  maxOffsetY: 10,
  offsetAmount: 0.1
}

class BounceBillboardPrimitive extends BillboardPrimitive {
  constructor(position, icon) {
    super(position, icon)
    this._currentOffset = new Cesium.Cartesian2(0, 0)
    this._isUp = true
    this.type = Overlay.getOverlayType('bounce_billboard_primitive')
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
      this._delegate = this._layer.billboards.add(this._delegate)
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
      this._layer.billboards.remove(this._delegate)
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

  /**
   *
   * @param style
   * @returns {BounceBillboardPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['position'] &&
      delete style['image'] &&
      delete style['width'] &&
      delete style['height']
    this._style = style
    Util.merge(this._delegate, this._style)
    return this
  }
}

Overlay.registerType('bounce_billboard_primitive')

export default BounceBillboardPrimitive
