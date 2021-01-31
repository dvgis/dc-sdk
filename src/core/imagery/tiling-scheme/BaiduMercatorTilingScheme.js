/**
 * @Author: Caven
 * @Date: 2021-01-31 19:22:04
 */

import BaiduMercatorProjection from '../projection/BaiduMercatorProjection'
import CoordTransform from '../../transform/CoordTransform'

const { Cesium } = DC.Namespace

class BaiduMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
  constructor(options) {
    super(options)
    let projection = new BaiduMercatorProjection()
    this._projection.project = function(cartographic, result) {
      result = result || {}
      if (options?.crs === 'WGS84') {
        result = CoordTransform.WGS84ToGCJ02(
          Cesium.Math.toDegrees(cartographic.longitude),
          Cesium.Math.toDegrees(cartographic.latitude)
        )
        result = CoordTransform.GCJ02ToBD09(result[0], result[1])
      } else {
        result = CoordTransform.GCJ02ToBD09(
          Cesium.Math.toDegrees(cartographic.longitude),
          Cesium.Math.toDegrees(cartographic.latitude)
        )
      }
      result[0] = Math.min(result[0], 180)
      result[0] = Math.max(result[0], -180)
      result[1] = Math.min(result[1], 74.000022)
      result[1] = Math.max(result[1], -71.988531)
      result = projection.lngLatToPoint({
        lng: result[0],
        lat: result[1]
      })
      return new Cesium.Cartesian2(result.x, result.y)
    }

    this._projection.unproject = function(cartesian, result) {
      result = result || {}
      result = projection.mercatorToLngLat({
        lng: cartesian.x,
        lat: cartesian.y
      })
      result[0] = ((result[0] + 180) % 360) - 180
      if (options?.crs === 'WGS84') {
        result = CoordTransform.BD09ToGCJ02(result.lng, result.lat)
        result = CoordTransform.GCJ02ToWGS84(result[0], result[1])
      } else {
        result = CoordTransform.BD09ToGCJ02(result.lng, result.lat)
      }
      return new Cesium.Cartographic(
        Cesium.Math.toRadians(result[0]),
        Cesium.Math.toRadians(result[1])
      )
    }
    this.resolutions = options.resolutions || []
  }

  /**
   *
   * @param x
   * @param y
   * @param level
   * @param result
   * @returns {module:cesium.Rectangle|*}
   */
  tileXYToNativeRectangle(x, y, level, result) {
    const tileWidth = this.resolutions[level]
    const west = x * tileWidth
    const east = (x + 1) * tileWidth
    const north = ((y = -y) + 1) * tileWidth
    const south = y * tileWidth

    if (!Cesium.defined(result)) {
      return new Cesium.Rectangle(west, south, east, north)
    }

    result.west = west
    result.south = south
    result.east = east
    result.north = north
    return result
  }

  /**
   *
   * @param position
   * @param level
   * @param result
   * @returns {undefined|*}
   */
  positionToTileXY(position, level, result) {
    const rectangle = this._rectangle
    if (!Cesium.Rectangle.contains(rectangle, position)) {
      return undefined
    }
    const projection = this._projection
    const webMercatorPosition = projection.project(position)
    if (!Cesium.defined(webMercatorPosition)) {
      return undefined
    }
    const tileWidth = this.resolutions[level]
    const xTileCoordinate = Math.floor(webMercatorPosition.x / tileWidth)
    const yTileCoordinate = -Math.floor(webMercatorPosition.y / tileWidth)
    if (!Cesium.defined(result)) {
      return new Cesium.Cartesian2(xTileCoordinate, yTileCoordinate)
    }
    result.x = xTileCoordinate
    result.y = yTileCoordinate
    return result
  }
}

export default BaiduMercatorTilingScheme
