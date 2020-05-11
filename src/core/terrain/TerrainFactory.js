/*
 * @Author: Caven
 * @Date: 2020-01-21 15:54:56
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:07:56
 */

const { Cesium } = DC.Namespace

class TerrainFactory {
  /**
   * Create ellipsoid terrain
   */
  static createEllipsoidTerrain(options) {
    return new Cesium.EllipsoidTerrainProvider(options)
  }

  /**
   * Create url terrain
   */
  static createUrlTerrain(options) {
    return new Cesium.CesiumTerrainProvider(options)
  }

  /**
   *  Create google terrain
   */
  static createGoogleTerrain(options) {
    return new Cesium.GoogleEarthEnterpriseTerrainProvider(options)
  }

  /**
   *  Create arcgis terrain
   */
  static createArcgisTerrain(options) {
    return new Cesium.ArcGISTiledElevationTerrainProvider(options)
  }

  /**
   *  Create vr terrain
   */
  static createVRTerrain(options) {
    return new Cesium.VRTheWorldTerrainProvider(options)
  }
}

export default TerrainFactory
