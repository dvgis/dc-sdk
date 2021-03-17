/**
 * @Author: Caven
 * @Date: 2020-04-14 18:20:23
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Ellipsoid extends Overlay {
  constructor(position, radius) {
    super()
    this._position = Parse.parsePosition(position)
    this._radius = radius || { x: 10, y: 10, z: 10 }
    this._delegate = new Cesium.Entity({ ellipsoid: {} })
    this.type = Overlay.getOverlayType('ellipsoid')
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

  set radius(radius) {
    this._radius = radius || { x: 10, y: 10, z: 10 }
    this._delegate.ellipsoid.radii = this._radius
    return this
  }

  get radius() {
    return this._radius
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position

    /**
     *  initialize the Overlay parameter
     */
    this.radius = this._radius
  }

  /**
   * Sets Style
   * @param style
   * @returns {Ellipsoid}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['radius']
    this._style = style
    Util.merge(this._delegate.ellipsoid, this._style)
    return this
  }
}

Overlay.registerType('ellipsoid')

export default Ellipsoid
