/**
 * @Author: Caven
 * @Date: 2020-01-15 20:27:27
 */

import ImageryType from '../ImageryType'
import BaiduMercatorTilingScheme from '../tiling-scheme/BaiduMercatorTilingScheme'

const { Cesium } = DC.Namespace

const IMG_URL =
  'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46'

const VEC_URL =
  'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020'

const CUSTOM_URL =
  'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid={style}'

const TRAFFIC_URL =
  'http://its.map.baidu.com:8002/traffic/TrafficTileService?time={time}&label={labelStyle}&v=016&level={z}&x={x}&y={y}&scaler=2'

class BaiduImageryProvider {
  constructor(options = {}) {
    this._url =
      options.style === 'img'
        ? IMG_URL
        : options.style === 'vec'
        ? VEC_URL
        : options.style === 'traffic'
        ? TRAFFIC_URL
        : CUSTOM_URL
    this._labelStyle = options.labelStyle || 'web2D'
    this._tileWidth = 256
    this._tileHeight = 256
    this._maximumLevel = 18
    let resolutions = []
    for (let i = 0; i < 19; i++) {
      resolutions[i] = 256 * Math.pow(2, 18 - i)
    }
    this._tilingScheme = new BaiduMercatorTilingScheme({
      rectangleSouthwestInMeters: new Cesium.Cartesian2(
        -20037726.37,
        -12474104.17
      ),
      rectangleNortheastInMeters: new Cesium.Cartesian2(
        20037726.37,
        12474104.17
      ),
      resolutions,
      crs: options.crs || ''
    })
    this._rectangle = this._tilingScheme.rectangle
    this._credit = undefined
    this._token = undefined
    this._style = options.style || 'normal'
  }

  get url() {
    return this._url
  }

  get token() {
    return this._token
  }

  get tileWidth() {
    if (!this.ready) {
      throw new Cesium.DeveloperError(
        'tileWidth must not be called before the imagery provider is ready.'
      )
    }
    return this._tileWidth
  }

  get tileHeight() {
    if (!this.ready) {
      throw new Cesium.DeveloperError(
        'tileHeight must not be called before the imagery provider is ready.'
      )
    }
    return this._tileHeight
  }

  get maximumLevel() {
    if (!this.ready) {
      throw new Cesium.DeveloperError(
        'maximumLevel must not be called before the imagery provider is ready.'
      )
    }
    return this._maximumLevel
  }

  get minimumLevel() {
    if (!this.ready) {
      throw new Cesium.DeveloperError(
        'minimumLevel must not be called before the imagery provider is ready.'
      )
    }
    return 0
  }

  get tilingScheme() {
    if (!this.ready) {
      throw new Cesium.DeveloperError(
        'tilingScheme must not be called before the imagery provider is ready.'
      )
    }
    return this._tilingScheme
  }

  get rectangle() {
    if (!this.ready) {
      throw new Cesium.DeveloperError(
        'rectangle must not be called before the imagery provider is ready.'
      )
    }
    return this._rectangle
  }

  get ready() {
    return !!this._url
  }

  get credit() {
    return this._credit
  }

  get hasAlphaChannel() {
    return true
  }

  getTileCredits(x, y, level) {}

  /**
   * Request Image
   * @param x
   * @param y
   * @param level
   * @returns {Promise<HTMLImageElement | HTMLCanvasElement>}
   */
  requestImage(x, y, level) {
    if (!this.ready) {
      throw new Cesium.DeveloperError(
        'requestImage must not be called before the imagery provider is ready.'
      )
    }
    let url = this._url
      .replace('{x}', String(x))
      .replace('{y}', String(-y))
      .replace('{z}', level)
      .replace('{s}', String(1))
      .replace('{style}', this._style)
      .replace('{labelStyle}', this._labelStyle)
      .replace('{time}', String(new Date().getTime()))
    return Cesium.ImageryProvider.loadImage(this, url)
  }
}

ImageryType.BAIDU = 'baidu'

export default BaiduImageryProvider
