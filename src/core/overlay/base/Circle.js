/**
 * @Author: Caven
 * @Date: 2020-01-31 18:57:02
 */

import { Util } from '../../utils'
import Transform from '../../transform/Transform'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import Overlay from '../Overlay'

const { Cesium } = DC.Namespace

class Circle extends Overlay {
  constructor(center, radius) {
    super()
    this._delegate = new Cesium.Entity({ ellipse: {} })
    this._center = Parse.parsePosition(center)
    this._radius = +radius || 0
    this._rotateAmount = 0
    this._stRotation = 0
    this.type = Overlay.getOverlayType('circle')
    this._state = State.INITIALIZED
  }

  set center(center) {
    this._center = Parse.parsePosition(center)
    this._delegate.position = Transform.transformWGS84ToCartesian(this._center)
    return this
  }

  get center() {
    return this._center
  }

  set radius(radius) {
    this._radius = +radius
    this._delegate.ellipse.semiMajorAxis = this._radius
    this._delegate.ellipse.semiMinorAxis = this._radius
    return this
  }

  get radius() {
    return this._radius
  }

  set rotateAmount(amount) {
    this._rotateAmount = +amount
    if (this._rotateAmount > 0) {
      this._delegate.ellipse.stRotation = new Cesium.CallbackProperty(time => {
        if (this._rotateAmount > 0) {
          this._stRotation += this._rotateAmount
          if (this._stRotation >= 360) {
            this._stRotation = 0
          }
        }
        return this._stRotation
      })
    }
    return this
  }

  get rotateAmount() {
    return this._rotateAmount
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.center = this._center

    /**
     *  initialize the Overlay parameter
     */
    this.radius = this._radius
  }

  /**
   *
   * @param style
   * @returns {Circle}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['semiMajorAxis'] && delete style['semiMinorAxis']
    this._style = style
    Util.merge(this._delegate.ellipse, this._style)
    return this
  }
}

Overlay.registerType('circle')

export default Circle
