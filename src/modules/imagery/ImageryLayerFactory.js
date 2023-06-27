/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../namespace'
import ImageryType from './ImageryType'
import AmapImageryProvider from './provider/AmapImageryProvider'
import BaiduImageryProvider from './provider/BaiduImageryProvider'
import GeoVisImageryProvider from './provider/GeoVisImageryProvider.js'
import GoogleImageryProvider from './provider/GoogleImageryProvider'
import TdtImageryProvider from './provider/TdtImageryProvider'
import TencentImageryProvider from './provider/TencentImageryProvider'

class ImageryLayerFactory {
  /**
   * Create amap imagery layer
   * @param options
   * @returns {AmapImageryProvider}
   */
  static createAmapImageryLayer(options) {
    return new AmapImageryProvider(options)
  }

  /**
   * Create baidu imagery layer
   * @param options
   * @returns {BaiduImageryProvider}
   */
  static createBaiduImageryLayer(options) {
    return new BaiduImageryProvider(options)
  }

  /**
   * Create geoVis imagery layer
   * @param options
   * @returns {GeoVisImageryProvider}
   */
  static createGeoVisImageryLayer(options) {
    return new GeoVisImageryProvider(options)
  }

  /**
   * Create google imagery layer
   * @param options
   * @returns {GoogleImageryProvider}
   */
  static createGoogleImageryLayer(options) {
    return new GoogleImageryProvider(options)
  }

  /**
   * Create tdt imagery layer
   * @param options
   * @returns {TdtImageryProvider}
   */
  static createTdtImageryLayer(options) {
    return new TdtImageryProvider(options)
  }

  /**
   * Create tencent imagery layer
   * @param options
   * @returns {TencentImageryProvider}
   */
  static createTencentImageryLayer(options) {
    return new TencentImageryProvider(options)
  }

  /**
   * Create arcgis imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createArcGisImageryLayer(options) {
    return new Cesium.ArcGisMapServerImageryProvider(options)
  }

  /**
   *
   * @param options
   * @returns {BingMapsImageryProvider}
   */
  static createBingImageryLayer(options) {
    return new Cesium.BingMapsImageryProvider(options)
  }

  /**
   *
   * @param options
   * @returns {OpenStreetMapImageryProvider}
   */
  static createOSMImageryLayer(options) {
    return new Cesium.OpenStreetMapImageryProvider(options)
  }

  /**
   * Create single tile imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createSingleTileImageryLayer(options) {
    return new Cesium.SingleTileImageryProvider(options)
  }

  /**
   * Create WMS imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createWMSImageryLayer(options) {
    return new Cesium.WebMapServiceImageryProvider(options)
  }

  /**
   * Create WMTS imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createWMTSImageryLayer(options) {
    return new Cesium.WebMapTileServiceImageryProvider(options)
  }

  /**
   * Create xyz imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createXYZImageryLayer(options) {
    return new Cesium.UrlTemplateImageryProvider(options)
  }

  /**
   * Create coord imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createCoordImageryLayer(options) {
    return new Cesium.TileCoordinatesImageryProvider(options)
  }

  /**
   * Create grid imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createGridImageryLayer(options) {
    return new Cesium.GridImageryProvider(options)
  }

  /**
   * Create mapbox imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createMapboxImageryLayer(options) {
    return new Cesium.MapboxImageryProvider(options)
  }

  /**
   * Create mapbox style imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createMapboxStyleImageryLayer(options) {
    return new Cesium.MapboxStyleImageryProvider(options)
  }

  /**
   * Create TMS imagery layer
   * @param options
   * @returns {ImageryProvider}
   */
  static createTMSImageryLayer(options) {
    return new Cesium.TileMapServiceImageryProvider(options)
  }

  /**
   * Create Imagery Layer by Type
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
      case ImageryType.GEO_VIS:
        imageryLayer = this.createGeoVisImageryLayer(options)
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
      case ImageryType.BING:
        imageryLayer = this.createBingImageryLayer(options)
        break
      case ImageryType.OSM:
        imageryLayer = this.createOSMImageryLayer(options)
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
