/**
 * @Author: Caven
 * @Date: 2020-01-21 15:54:56
 */

import { Cesium } from '@dc-modules/namespace'
import ImageryType from './ImageryType'
import AmapImageryProvider from './provider/AmapImageryProvider'
import BaiduImageryProvider from './provider/BaiduImageryProvider'
import GoogleImageryProvider from './provider/GoogleImageryProvider'
import TdtImageryProvider from './provider/TdtImageryProvider'
import TencentImageryProvider from './provider/TencentImageryProvider'

class ImageryLayerFactory {
  /**
   * Create amap image layer
   * @param options
   * @returns {AmapImageryProvider}
   */
  static createAmapImageryLayer(options) {
    return new AmapImageryProvider(options)
  }

  /**
   * Create baidu image layer
   * @param options
   * @returns {BaiduImageryProvider}
   */
  static createBaiduImageryLayer(options) {
    return new BaiduImageryProvider(options)
  }

  /**
   * Create google image layer
   * @param options
   * @returns {GoogleImageryProvider}
   */
  static createGoogleImageryLayer(options) {
    return new GoogleImageryProvider(options)
  }

  /**
   * Create tdt image layer
   * @param options
   * @returns {TdtImageryProvider}
   */
  static createTdtImageryLayer(options) {
    return new TdtImageryProvider(options)
  }

  /**
   * Create tencent image layer
   * @param options
   * @returns {TencentImageryProvider}
   */
  static createTencentImageryLayer(options) {
    return new TencentImageryProvider(options)
  }

  /**
   * Create arcgis image layer
   * @param options
   * @returns {module:cesium.ArcGisMapServerImageryProvider}
   */
  static createArcGisImageryLayer(options) {
    return new Cesium.ArcGisMapServerImageryProvider(options)
  }

  /**
   * Create single tile image layer
   * @param options
   * @returns {module:cesium.SingleTileImageryProvider}
   */
  static createSingleTileImageryLayer(options) {
    return new Cesium.SingleTileImageryProvider(options)
  }

  /**
   * Create WMS image layer
   * @param options
   * @returns {module:cesium.WebMapServiceImageryProvider}
   */
  static createWMSImageryLayer(options) {
    return new Cesium.WebMapServiceImageryProvider(options)
  }

  /**
   * Create WMTS image layer
   * @param options
   * @returns {module:cesium.WebMapTileServiceImageryProvider}
   */
  static createWMTSImageryLayer(options) {
    return new Cesium.WebMapTileServiceImageryProvider(options)
  }

  /**
   * Create xyz image layer
   * @param options
   * @returns {module:cesium.UrlTemplateImageryProvider}
   */
  static createXYZImageryLayer(options) {
    return new Cesium.UrlTemplateImageryProvider(options)
  }

  /**
   * Create coord image layer
   * @param options
   * @returns {module:cesium.TileCoordinatesImageryProvider}
   */
  static createCoordImageryLayer(options) {
    return new Cesium.TileCoordinatesImageryProvider(options)
  }

  /**
   * Create grid image layer
   * @param options
   * @returns {module:cesium.GridImageryProvider}
   */
  static createGridImageryLayer(options) {
    return new Cesium.GridImageryProvider(options)
  }

  /**
   * Create mapbox image layer
   * @param options
   * @returns {module:cesium.MapboxImageryProvider}
   */
  static createMapboxImageryLayer(options) {
    return new Cesium.MapboxImageryProvider(options)
  }

  /**
   * Create mapbox style image layer
   * @param options
   * @returns {module:cesium.MapboxStyleImageryProvider}
   */
  static createMapboxStyleImageryLayer(options) {
    return new Cesium.MapboxStyleImageryProvider(options)
  }

  /**
   * Create TMS image layer
   * @param options
   * @returns {module:cesium.TileMapServiceImageryProvider}
   */
  static createTMSImageryLayer(options) {
    return new Cesium.TileMapServiceImageryProvider(options)
  }

  /**
   * Create Imagery Layer
   * @param type
   * @param options
   * @returns {any}
   */
  static createImageryLayer(type, options) {
    let imageryLayer = undefined
    switch (type) {
      case ImageryType.AMAP:
        imageryLayer = this.createAmapImageryLayer(options)
        break
      case ImageryType.BAIDU:
        imageryLayer = this.createBaiduImageryLayer(options)
        break
      case ImageryType.GOOGLE:
        imageryLayer = this.createGoogleImageryLayer(options)
        break
      case ImageryType.TDT:
        imageryLayer = this.createTdtImageryLayer(options)
        break
      case ImageryType.TENCENT:
        imageryLayer = this.createTencentImageryLayer(options)
        break
      case ImageryType.ARCGIS:
        imageryLayer = this.createArcGisImageryLayer(options)
        break
      case ImageryType.SINGLE_TILE:
        imageryLayer = this.createSingleTileImageryLayer(options)
        break
      case ImageryType.WMS:
        imageryLayer = this.createWMSImageryLayer(options)
        break
      case ImageryType.WMTS:
        imageryLayer = this.createWMTSImageryLayer(options)
        break
      case ImageryType.XYZ:
        imageryLayer = this.createXYZImageryLayer(options)
        break
      case ImageryType.COORD:
        imageryLayer = this.createCoordImageryLayer(options)
        break
      case ImageryType.GRID:
        imageryLayer = this.createGridImageryLayer(options)
        break
      case ImageryType.MAPBOX:
        imageryLayer = this.createMapboxImageryLayer(options)
        break
      case ImageryType.MAPBOX_STYLE:
        imageryLayer = this.createMapboxStyleImageryLayer(options)
        break
      case ImageryType.TMS:
        imageryLayer = this.createTMSImageryLayer(options)
        break
      default:
        break
    }
    return imageryLayer
  }
}

export default ImageryLayerFactory
