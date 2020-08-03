/**
 * @Author: Caven
 * @Date: 2020-01-21 15:54:56
 */

const { Cesium } = DC.Namespace

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
}

export default TerrainFactory
