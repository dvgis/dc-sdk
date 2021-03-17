/**
 * @Author: Caven
 * @Date: 2020-10-11 18:24:37
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class WaterPrimitive extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.GroundPrimitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: {}
      }),
      asynchronous: true
    })
    this.type = Overlay.getOverlayType('water_primitive')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.geometryInstances.geometry = Cesium.PolygonGeometry.fromPositions(
      {
        positions: Transform.transformWGS84ArrayToCartesianArray(
          this._positions
        ),
        height: this._style?.height,
        extrudedHeight: this._style?.extrudedHeight,
        closeTop: this._style?.closeTop,
        closeBottom: this._style?.closeBottom,
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
      }
    )
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
    if (!this._style) {
      return
    }
    this._delegate.appearance = new Cesium.EllipsoidSurfaceAppearance({
      material: Cesium.Material.fromType('Water', {
        baseWaterColor:
          this._style?.baseWaterColor || new Cesium.Color(0.2, 0.3, 0.6, 1.0),
        blendColor:
          this._style?.blendColor || new Cesium.Color(0.0, 1.0, 0.699, 1.0),
        specularMap: this._style?.specularMap || Cesium.Material.DefaultImageId,
        normalMap: this._style?.normalMap || Cesium.Material.DefaultImageId,
        frequency: this._style?.frequency || 1000.0,
        animationSpeed: this._style?.animationSpeed || 0.01,
        amplitude: this._style?.amplitude || 10,
        specularIntensity: this._style?.specularIntensity || 0.5
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
   * @returns {WaterPrimitive}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    if (this._style?.classificationType) {
      this._delegate.classificationType = this._style.classificationType
    }
    this._setAppearance()
    return this
  }
}

Overlay.registerType('water_primitive')

export default WaterPrimitive
