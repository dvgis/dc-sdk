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
   * @returns {Promise<AmapImageryProvider>}
   */
  static createAmapImageryLayer(options) {
    return Promise.resolve(new AmapImageryProvider(options))
  }

  /**
   * Create baidu imagery layer
   * @param options
   * @returns {Promise<BaiduImageryProvider>}
   */
  static createBaiduImageryLayer(options) {
    return Promise.resolve(new BaiduImageryProvider(options))
  }

  /**
   * Create geoVis imagery layer
   * @param options
   * @returns {Promise<GeoVisImageryProvider>}
   */
  static createGeoVisImageryLayer(options) {
    return Promise.resolve(new GeoVisImageryProvider(options))
  }

  /**
   * Create google imagery layer
   * @param options
   * @returns {Promise<GoogleImageryProvider>}
   */
  static createGoogleImageryLayer(options) {
    return Promise.resolve(new GoogleImageryProvider(options))
  }

  /**
   * Create tdt imagery layer
   * @param options
   * @returns {Promise<TdtImageryProvider>}
   */
  static createTdtImageryLayer(options) {
    return Promise.resolve(new TdtImageryProvider(options))
  }

  /**
   * Create tencent imagery layer
   * @param options
   * @returns {Promise<TencentImageryProvider>}
   */
  static createTencentImageryLayer(options) {
    return Promise.resolve(new TencentImageryProvider(options))
  }

  /**
   * Create arcgis imagery layer
   * @param options
   * @returns {Promise<ArcGisMapServerImageryProvider>}
   */
  static createArcGisImageryLayer(options) {
    return Cesium.ArcGisMapServerImageryProvider.fromUrl(options.url, options)
  }

  /**
   *
   * @param options
   * @returns {Promise<BingMapsImageryProvider>}
   */
  static createBingImageryLayer(options) {
    return Cesium.BingMapsImageryProvider.fromUrl(options.url, options)
  }

  /**
   *
   * @param options
   * @returns {Promise<OpenStreetMapImageryProvider>}
   */
  static createOSMImageryLayer(options) {
    return Promise.resolve(new Cesium.OpenStreetMapImageryProvider(options))
  }

  /**
   * Create single tile imagery layer
   * @param options
   * @returns {Promise<ImageryProvider>}
   */
  static createSingleTileImageryLayer(options) {
    return Promise.resolve(new Cesium.SingleTileImageryProvider(options))
  }

  /**
   * Create WMS imagery layer
   * @param options
   * @returns {Promise<WebMapServiceImageryProvider>}
   */
  static createWMSImageryLayer(options) {
    return Promise.resolve(new Cesium.WebMapServiceImageryProvider(options))
  }

  /**
   * Create WMTS imagery layer
   * @param options
   * @returns {Promise<WebMapTileServiceImageryProvider>}
   */
  static createWMTSImageryLayer(options) {
    return Promise.resolve(new Cesium.WebMapTileServiceImageryProvider(options))
  }

  /**
   * Create xyz imagery layer
   * @param options
   * @returns {Promise<UrlTemplateImageryProvider>}
   */
  static createXYZImageryLayer(options) {
    return Promise.resolve(new Cesium.UrlTemplateImageryProvider(options))
  }

  /**
   * Create coord imagery layer
   * @param options
   * @returns {Promise<TileCoordinatesImageryProvider>}
   */
  static createCoordImageryLayer(options) {
    return Promise.resolve(new Cesium.TileCoordinatesImageryProvider(options))
  }

  /**
   * Create grid imagery layer
   * @param options
   * @returns {Promise<GridImageryProvider>}
   */
  static createGridImageryLayer(options) {
    return Promise.resolve(new Cesium.GridImageryProvider(options))
  }

  /**
   * Create mapbox imagery layer
   * @param options
   * @returns {Promise<MapboxImageryProvider>}
   */
  static createMapboxImageryLayer(options) {
    return Promise.resolve(new Cesium.MapboxImageryProvider(options))
  }

  /**
   * Create mapbox style imagery layer
   * @param options
   * @returns {Promise<MapboxStyleImageryProvider>}
   */
  static createMapboxStyleImageryLayer(options) {
    return Promise.resolve(new Cesium.MapboxStyleImageryProvider(options))
  }

  /**
   * Create TMS imagery layer
   * @param options
   * @returns {Promise<TileMapServiceImageryProvider>}
   */
  static createTMSImageryLayer(options) {
    return Cesium.TileMapServiceImageryProvider.fromUrl(options.url, options)
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
