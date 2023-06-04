/**
 * @Author : Caven Chen
 */

import Overlay from '../Overlay'
import State from '../../state/State'
import Parse from '../../parse/Parse'
import { Transform } from '../../transform'
import { Util } from '../../utils'
import { center, distance } from '../../math'

class PolylinePrimitive extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = {
      positions: [],
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
