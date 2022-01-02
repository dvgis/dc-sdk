/**
 * @Author: Caven
 * @Date: 2021-11-08 20:35:42
 */

import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class CloudPrimitive extends Overlay {
  constructor(position) {
    super()
    this._position = Parse.parsePosition(position)
    this._delegate = {
      position: undefined,
      scale: { x: 12, y: 8 }
    }
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('cloud_primitive')
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

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
  }

  /**
   *
   * @param style
   * @returns {CloudPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['position']
    Util.merge(this._style, style)
    Util.merge(this._delegate, style)
    return this
  }
}

Overlay.registerType('cloud_primitive')

export default CloudPrimitive
