/*
 * @Author: Caven
 * @Date: 2020-01-21 15:54:56
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-09 13:05:36
 */
import Cesium from '@/namespace'
import AmapImageryProvider from './provider/AmapImageryProvider'
import BaiduImageryProvider from './provider/BaiduImageryProvider'
import GoogleImageryProvider from './provider/GoogleImageryProvider'
import TdtImageryProvider from './provider/TdtImageryProvider'
import TencentImageryProvider from './provider/TencentImageryProvider'

DC.ImageryLayerFactory = class {
  /**
   * Create amap image layer
   * @param {*} options
   *
   */
  static createAmapImageryLayer(options) {
    return new AmapImageryProvider(options)
  }

  /**
   * Create baidu image layer
   * @param {*} options
   */
  static createBaiduImageryLayer(options) {
    return new BaiduImageryProvider(options)
  }

  /**
   * Create google image layer
   * @param {*} options
   */
  static createGoogleImageryLayer(options) {
    return new GoogleImageryProvider(options)
  }

  /**
   *  Create tdt image layer
   *  @param {*} options
   */
  static createTdtImageryLayer(options) {
    return new TdtImageryProvider(options)
  }

  /**
   * Create tecent image layer
   */
  static createTencentImageryLayer(options) {
    return new TencentImageryProvider(options)
  }

  /**
   * Create arcgis image layer
   * @param {*} options
   */
  static createArcGisImageryLayer(options) {
    return new Cesium.ArcGisMapServerImageryProvider(options)
  }

  /**
   * Create singel tile image layer
   * @param {*} options
   *
   */
  static createSingleTileImageryLayer(options) {
    return new Cesium.SingleTileImageryProvider(options)
  }

  /**
   * Create wmts image layer
   * @param {*} options
   *
   */
  static createWMTSImageryLayer(options) {
    return new Cesium.WebMapTileServiceImageryProvider(options)
  }

  /**
   * Create xyz image layer
   *  @param {*} options
   *
   */
  static createXYZImageryLayer(options) {
    return new Cesium.UrlTemplateImageryProvider(options)
  }

  /**
   *  Create coord image layer
   *  @param {*} options
   *
   */
  static createCoordImageryLayer(options) {
    return new Cesium.TileCoordinatesImageryProvider(options)
  }

  /**
   *
   * @param {*} type
   * @param {*} options
   */
  static createImageryLayer(type, options) {
    let imageryLayer = undefined
    switch (type) {
      case DC.ImageryType.AMAP:
        imageryLayer = this.createAmapImageryLayer(options)
        break
      case DC.ImageryType.BAIDU:
        imageryLayer = this.createBaiduImageryLayer(options)
        break
      case DC.ImageryType.GOOGLE:
        imageryLayer = this.createGoogleImageryLayer(options)
        break
      case DC.ImageryType.TDT:
        imageryLayer = this.createTdtImageryLayer(options)
        break
      case DC.ImageryType.TENCENT:
        imageryLayer = this.createTencentImageryLayer(options)
        break
      case DC.ImageryType.ARCGIS:
        imageryLayer = this.createArcGisImageryLayer(options)
        break
      case DC.ImageryType.SINGLE_TILE:
        imageryLayer = this.createSingleTileImageryLayer(options)
        break
      case DC.ImageryType.WMTS:
        imageryLayer = this.createWMTSImageryLayer(options)
        break
      case DC.ImageryType.XYZ:
        imageryLayer = this.createXYZImageryLayer(options)
        break
      case DC.ImageryType.COORD:
        imageryLayer = this.createCoordImageryLayer(options)
        break
      default:
        break
    }
    return imageryLayer
  }
}
