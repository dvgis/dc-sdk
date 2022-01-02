/**
 * @Author: Caven
 * @Date: 2021-06-03 21:06:17
 */

import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class BillboardPrimitive extends Overlay {
  constructor(position, icon) {
    super()
    this._position = Parse.parsePosition(position)
    this._icon = icon
    this._size = [32, 32]
    this._delegate = {
      position: undefined,
      image: undefined,
      width: 0,
      height: 0
    }
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('billboard_primitive')
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.position = Transform.transformWGS84ToCartesian(
      this._position
    )
    return this
  }

  get position() {
    return this._position
  }

  set icon(icon) {
    this._icon = icon
    this._delegate.image = this._icon
    return this
  }

  get icon() {
    return this._icon
  }

  set size(size) {
    if (!Array.isArray(size)) {
      throw new Error('Billboard Primitive: the size invalid')
    }
    this._size = size
    this._delegate.width = this._size[0] || 32
    this._delegate.height = this._size[1] || 32
    return this
  }

  get size() {
    return this._size
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
    /**
     *  initialize the Overlay parameter
     */
    this.icon = this._icon
    this.size = this._size
  }

  /**
   *
   * @param style
   * @returns {BillboardPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['position'] &&
      delete style['image'] &&
      delete style['width'] &&
      delete style['height']
    Util.merge(this._style, style)
    Util.merge(this._delegate, style)
    return this
  }
}

Overlay.registerType('billboard_primitive')

export default BillboardPrimitive
