/**
 * @Author: Caven
 * @Date: 2021-01-09 21:33:59
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class TrailLinePrimitive extends Overlay {
  constructor(positions, width = 1) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._width = width
    this._delegate = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: {}
      })
    })
    this.type = Overlay.getOverlayType('trail_line_primitive')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.geometryInstances.geometry = new Cesium.PolylineGeometry({
      positions: Transform.transformWGS84ArrayToCartesianArray(this._positions),
      width: this._width
    })
    return this
  }

  get positions() {
    return this._positions
  }

  /**
   *
   * @private
   */
  _setAppearance() {
    this._delegate.appearance = new Cesium.PolylineMaterialAppearance({
      material: Cesium.Material.fromType('PolylineTrail', {
        color: this._style?.color || new Cesium.Color(1.0, 0.0, 0.0, 0.7),
        speed: this._style?.speed || 5
      })
    })
  }

  _mountedHook() {
    /**
     *  set the positions
     */
    this.positions = this._positions
    /**
     * set the appearance
     */
    !this._delegate.appearance && this._setAppearance()
  }

  /**
   * Sets Style
   * @param style
   * @returns {TrailLinePrimitive}
   */
  setStyle(style = {}) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    style.classificationType &&
      (this._delegate.classificationType = this._style.classificationType)
    this._setAppearance()
    return this
  }
}

Overlay.registerType('trail_line_primitive')

export default TrailLinePrimitive
