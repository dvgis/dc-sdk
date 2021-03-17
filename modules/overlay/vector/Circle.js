/**
 * @Author: Caven
 * @Date: 2020-01-31 18:57:02
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Circle extends Overlay {
  constructor(center, radius) {
    super()
    this._delegate = new Cesium.Entity({ polygon: {} })
    this._center = Parse.parsePosition(center)
    this._radius = +radius || 0
    this._rotateAmount = 0
    this._stRotation = 0
    this.type = Overlay.getOverlayType('circle')
    this._state = State.INITIALIZED
  }

  set center(center) {
    this._center = Parse.parsePosition(center)
    this._delegate.polygon.hierarchy = this._computeHierarchy()
    return this
  }

  get center() {
    return this._center
  }

  set radius(radius) {
    this._radius = +radius
    this._delegate.polygon.hierarchy = this._computeHierarchy()
    return this
  }

  get radius() {
    return this._radius
  }

  set rotateAmount(amount) {
    this._rotateAmount = +amount
    this._delegate.polygon.stRotation = new Cesium.CallbackProperty(time => {
      this._stRotation += this._rotateAmount
      if (this._stRotation >= 360 || this._stRotation <= -360) {
        this._stRotation = 0
      }
      return Cesium.Math.toRadians(this._stRotation)
    })
    return this
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
        granularity: 0.005
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
   *
   * @param style
   * @returns {Circle}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['positions']
    this._style = style
    Util.merge(this._delegate.polygon, this._style)
    return this
  }
}

Overlay.registerType('circle')

export default Circle
