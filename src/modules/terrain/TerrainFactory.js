/**
 * @Author: Caven
 * @Date: 2020-01-21 15:54:56
 */

import { Cesium } from '@dc-modules/namespace'
import TerrainType from './TerrainType'

class TerrainFactory {
  /**
   * Create ellipsoid terrain
   * @param options
   * @returns {module:cesium.EllipsoidTerrainProvider}
   */
  static createEllipsoidTerrain(options) {
    return new Cesium.EllipsoidTerrainProvider(options)
  }

  /**
   * Create url terrain
   * @param options
   * @returns {module:cesium.CesiumTerrainProvider}
   */
  static createUrlTerrain(options) {
    return new Cesium.CesiumTerrainProvider(options)
  }

  /**
   * Create google terrain
   * @param options
   * @returns {module:cesium.GoogleEarthEnterpriseTerrainProvider}
   */
  static createGoogleTerrain(options) {
    return new Cesium.GoogleEarthEnterpriseTerrainProvider(options)
  }

  /**
   * Create arcgis terrain
   * @param options
   * @returns {module:cesium.ArcGISTiledElevationTerrainProvider}
   */
  static createArcgisTerrain(options) {
    return new Cesium.ArcGISTiledElevationTerrainProvider(options)
  }

  /**
   * Create vr terrain
   * @param options
   * @returns {module:cesium.VRTheWorldTerrainProvider}
   */
  static createVRTerrain(options) {
    return new Cesium.VRTheWorldTerrainProvider(options)
  }

  /**
   * Create Terrain
   * @param type
   * @param options
   * @returns {any}
   */
  static createTerrain(type, options) {
    let terrain = undefined
    switch (type) {
      case TerrainType.NONE:
        terrain = this.createEllipsoidTerrain(options)
        break
      case TerrainType.XYZ:
        terrain = this.createUrlTerrain(options)
        break
      case TerrainType.GOOGLE:
        terrain = this.createGoogleTerrain(options)
        break
      case TerrainType.ARCGIS:
        terrain = this.createArcgisTerrain(options)
        break
      case TerrainType.VR:
        terrain = this.createVRTerrain(options)
        break
      default:
        break
    }
    return terrain
  }
}

export default TerrainFactory
