/**
 * @Author: Caven
 * @Date: 2020-02-25 18:28:36
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Box extends Overlay {
  constructor(position, length, width, height) {
    super()
    this._position = Parse.parsePosition(position)
    this._length = length
    this._width = width
    this._height = height
    this._delegate = new Cesium.Entity({
      box: {
        dimensions: {
          x: +this._length,
          y: +this._width,
          z: +this._height
        }
      }
    })
    this.type = Overlay.getOverlayType('box')
    this._state = State.INITIALIZED
  }

  /**
   *
   * @param position
   * @returns {Box}
   */
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

  set length(length) {
    this._length = length || 0
    this._delegate.box.dimensions.x = +this._length
    return this
  }

  get length() {
    return this._length
  }

  set width(width) {
    this._width = width || 0
    this._delegate.box.dimensions.y = +this._width
    return this
  }

  get width() {
    return this._width
  }

  set height(height) {
    this._height = height || 0
    this._delegate.box.dimensions.z = +this._height
    return this
  }

  get height() {
    return this._height
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
  }

  /**
   * Sets Style
   * @param style
   * @returns {Box}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['length'] && delete style['width'] && delete style['height']
    this._style = style
    Util.merge(this._delegate.box, this._style)
    return this
  }
}

Overlay.registerType('box')

export default Box
