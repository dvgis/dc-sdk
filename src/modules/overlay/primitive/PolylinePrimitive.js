/**
 * @Author: Caven
 * @Date: 2021-06-03 21:16:27
 */

import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import { center, distance } from '@dc-modules/math'
import Overlay from '../Overlay'

class PolylinePrimitive extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = {
      positions: []
    }
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('polyline_primitive')
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.positions = Transform.transformWGS84ArrayToCartesianArray(
      this._positions
    )
    return this
  }

  get positions() {
    return this._positions
  }

  get center() {
    return center(this._positions)
  }

  get distance() {
    return distance(this._positions)
  }

  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this.positions = this._positions
  }

  /**
   * Sets style
   * @param style
   * @returns {PolylinePrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['positions']
    Util.merge(this._style, style)
    Util.merge(this._delegate, style)
    return this
  }
}

Overlay.registerType('polyline_primitive')

export default PolylinePrimitive
