/**
 * @Author: Caven
 * @Date: 2021-06-03 20:51:25
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

const DEF_STYLE = {
  pixelSize: 8,
  outlineColor: Cesium.Color.BLUE,
  outlineWidth: 2
}

class PointPrimitive extends Overlay {
  constructor(position) {
    super()
    this._position = Parse.parsePosition(position)

    this._delegate = {
      position: undefined
    }
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('point_primitive')
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

    /**
     *  initialize the Overlay parameter
     */
    Util.merge(this._delegate, DEF_STYLE, this._style)
  }

  /**
   * Set style
   * @param style
   * @returns {PointPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['position']
    Util.merge(this._style, style)
    Util.merge(this._delegate, DEF_STYLE, this._style)
    return this
  }
}
Overlay.registerType('point_primitive')

export default PointPrimitive
