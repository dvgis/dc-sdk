/**
 * @Author: Caven
 * @Date: 2020-04-14 18:30:45
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Ellipse extends Overlay {
  constructor(position, semiMajorAxis, semiMinorAxis) {
    super()
    this._position = Parse.parsePosition(position)
    this._semiMajorAxis = +semiMajorAxis || 0
    this._semiMinorAxis = +semiMinorAxis || 0
    this._delegate = new Cesium.Entity({ ellipse: {} })
    this.type = Overlay.getOverlayType('ellipse')
    this._state = State.INITIALIZED
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.position = Transform.transformWGS84ToCartesian(
      this._position
    )
    this._delegate.orientation = Cesium.Transforms.headingPitchRollQuaternion(
      Transform.transformWGS84ToCartesian(this._position),
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(this._position.heading),
        Cesium.Math.toRadians(this._position.pitch),
        Cesium.Math.toRadians(this._position.roll)
      )
    )
    return this
  }

  get position() {
    return this._position
  }

  set semiMajorAxis(semiMajorAxis) {
    this._semiMajorAxis = +semiMajorAxis || 0
    this._delegate.ellipse.semiMajorAxis = this._semiMajorAxis
    return this
  }

  get semiMajorAxis() {
    return this._semiMajorAxis
  }

  set semiMinorAxis(semiMinorAxis) {
    this._semiMinorAxis = +semiMinorAxis || 0
    this._delegate.ellipse.semiMinorAxis = this._semiMinorAxis
    return this
  }

  get semiMinorAxis() {
    return this._semiMinorAxis
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
    /**
     *  initialize the Overlay parameter
     */
    this.semiMajorAxis = this._semiMajorAxis
    this.semiMinorAxis = this._semiMinorAxis
  }

  /**
   * Sets Style
   * @param style
   * @returns {Ellipse}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['semiMajorAxis'] && delete style['semiMinorAxis']
    this._style = style
    Util.merge(this._delegate.ellipse, this._style)
    return this
  }
}

Overlay.registerType('ellipse')

export default Ellipse
