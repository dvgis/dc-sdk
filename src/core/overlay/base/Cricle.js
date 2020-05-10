/*
 * @Author: Caven
 * @Date: 2020-01-31 18:57:02
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 09:31:39
 */

import { Cesium } from '../../../namespace'
import { Util } from '../../utils'
import Transform from '../../transform/Transform'
import Overlay from '../Overlay'
import OverlayState from '../OverlayState'

class Circle extends Overlay {
  constructor(center, radius) {
    if (!Util.checkPosition(center)) {
      throw new Error('Circle: the center invalid')
    }
    super()
    this._center = center
    this._radius = radius || 0
    this._delegate = new Cesium.Entity()
    this._rotateAmount = 0
    this._stRotation = 0
    this.type = Overlay.getOverlayType('circle')
    this._state = OverlayState.INITIALIZED
  }

  set center(center) {
    if (!Util.checkPosition(center)) {
      throw new Error('DC.Circle: the center invalid')
    }
    this._center = center
  }

  get center() {
    return this._center
  }

  set radius(radius) {
    this._radius = radius
  }

  get radius() {
    return this._redius
  }

  set rotateAmount(amount) {
    this._rotateAmount = amount
  }

  get rotateAmount() {
    return this._rotateAmount
  }

  _mountedHook() {
    /**
     * set the location
     */
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return Transform.transformWGS84ToCartesian(this._center)
    })
    /**
     * set the orientation
     */
    this._delegate.orientation = new Cesium.CallbackProperty(time => {
      return Cesium.Transforms.headingPitchRollQuaternion(
        Transform.transformWGS84ToCartesian(this._center),
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(this._center.heading),
          Cesium.Math.toRadians(this._center.pitch),
          Cesium.Math.toRadians(this._center.roll)
        )
      )
    })

    /**
     *  initialize the Overlay parameter
     */
    this._delegate.ellipse = {
      ...this._style,
      semiMajorAxis: new Cesium.CallbackProperty(time => {
        return this._radius
      }),
      semiMinorAxis: new Cesium.CallbackProperty(time => {
        return this._radius
      }),
      stRotation: new Cesium.CallbackProperty(time => {
        if (this._rotateAmount > 0) {
          this._stRotation += this._rotateAmount
          if (this._stRotation >= 360) {
            this._stRotation = 0
          }
        }
        return this._stRotation
      })
    }
  }

  /**
   *
   * @param {*} text
   * @param {*} textStyle
   */
  setLabel(text, textStyle) {
    this._delegate.label = {
      text: text,
      ...textStyle
    }
    return this
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    this._delegate.ellipse && Util.merge(this._delegate.ellipse, this._style)
    return this
  }
}

Overlay.registerType('circle')

export default Circle
