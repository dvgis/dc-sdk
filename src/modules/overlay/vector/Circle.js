/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../../namespace'
import Overlay from '../Overlay'
import State from '../../state/State'
import Parse from '../../parse/Parse'
import { Util } from '../../utils'
import { Transform } from '../../transform'

class Circle extends Overlay {
  constructor(center, radius) {
    super()
    this._delegate = new Cesium.Entity({ polygon: {} })
    this._center = Parse.parsePosition(center)
    this._radius = +radius || 0
    this._rotateAmount = 0
    this._stRotation = 0
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('circle')
  }

  set center(center) {
    this._center = Parse.parsePosition(center)
    this._delegate.polygon.hierarchy = this._computeHierarchy()
  }

  get center() {
    return this._center
  }

  set radius(radius) {
    this._radius = +radius
    this._delegate.polygon.hierarchy = this._computeHierarchy()
  }

  get radius() {
    return this._radius
  }

  set rotateAmount(amount) {
    this._rotateAmount = +amount
    this._delegate.polygon.stRotation = new Cesium.CallbackProperty(() => {
      this._stRotation += this._rotateAmount
      if (this._stRotation >= 360 || this._stRotation <= -360) {
        this._stRotation = 0
      }
      return Cesium.Math.toRadians(this._stRotation)
    }, false)
  }

  get rotateAmount() {
    return this._rotateAmount
  }

  /**
   *
   * @private
   */
  _computeHierarchy() {
    let result = new Cesium.PolygonHierarchy()
    let cep = Cesium.EllipseGeometryLibrary.computeEllipsePositions(
      {
        center: Transform.transformWGS84ToCartesian(this._center),
        semiMajorAxis: this._radius,
        semiMinorAxis: this._radius,
        rotation: 0,
        granularity: 0.005,
      },
      false,
      true
    )
    let pnts = Cesium.Cartesian3.unpackArray(cep.outerPositions)
    pnts.push(pnts[0])
    result.positions = pnts
    return result
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.center = this._center
  }

  /**
   * Sets Text with Style
   * @param text
   * @param textStyle
   * @returns {Circle}
   */
  setLabel(text, textStyle) {
    this._delegate.position = Transform.transformWGS84ToCartesian(this._center)
    this._delegate.label = {
      ...textStyle,
      text: text,
    }
    return this
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
    delete style['positions']
    Util.merge(this._style, style)
    Util.merge(this._delegate.polygon, style)
    return this
  }
}

Overlay.registerType('circle')

export default Circle
