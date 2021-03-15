/**
 * @Author: Caven
 * @Date: 2020-02-12 21:44:24
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class CustomBillboard extends Overlay {
  constructor(position, icon) {
    super()
    this._delegate = new Cesium.Entity({ billboard: {} })
    this._position = Parse.parsePosition(position)
    this._icon = icon
    this._size = [32, 32]
    this.type = Overlay.getOverlayType('custom_billboard')
    this._state = State.INITIALIZED
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
    this._delegate.billboard.image = this._icon
    return this
  }

  get icon() {
    return this._icon
  }

  set size(size) {
    if (!Array.isArray(size)) {
      throw new Error('Billboard: the size invalid')
    }
    this._size = size
    this._delegate.billboard.width = this._size[0] || 32
    this._delegate.billboard.height = this._size[1] || 32
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
   * Sets label
   * @param text
   * @param textStyle
   * @returns {CustomBillboard}
   */
  setLabel(text, textStyle) {
    this._delegate.label = {
      ...textStyle,
      text: text
    }
    return this
  }

  /**
   * Sets Style
   * @param style
   * @returns {CustomBillboard}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['image'] && delete style['width'] && delete style['height']
    this._style = style
    Util.merge(this._delegate.billboard, this._style)
    return this
  }

  /**
   * Sets VLine style
   * @param style
   * @returns {CustomBillboard}
   */
  setVLine(style = {}) {
    if (this._position.alt > 0 && !this._delegate.polyline) {
      let position = this._position.copy()
      position.alt = style.height || 0
      this._delegate.polyline = {
        ...style,
        positions: Transform.transformWGS84ArrayToCartesianArray([
          position,
          this._position
        ])
      }
    }
    return this
  }

  /**
   * @param {*} radius
   * @param {*} style
   * @param {*} rotateAmount
   */
  setBottomCircle(radius, style = {}, rotateAmount = 0) {
    let stRotation = 0
    let amount = rotateAmount
    this._delegate.ellipse = {
      ...style,
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      stRotation: new Cesium.CallbackProperty(time => {
        stRotation += amount
        if (stRotation >= 360 || stRotation <= -360) {
          stRotation = 0
        }
        return stRotation
      })
    }
    return this
  }
}

Overlay.registerType('custom_billboard')

export default CustomBillboard
