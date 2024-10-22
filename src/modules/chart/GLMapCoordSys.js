/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../namespace'
const { Cartesian3, Ellipsoid, Math: CesiumMath } = Cesium

export function createGLMapCoordSys(echarts) {
  function GLMapCoordSys(api) {
    this._api = api
    this._viewer = Object(api.getZr()).viewer
    this._mapOffset = [0, 0]
    this.dimensions = ['lng', 'lat']
  }

  /**
   *
   * @returns
   */
  GLMapCoordSys.prototype.getViewer = function () {
    return this._viewer
  }

  /**
   *
   * @param {*} mapOffset
   * @returns
   */
  GLMapCoordSys.prototype.setMapOffset = function (mapOffset) {
    this._mapOffset = mapOffset
    return this
  }

  /**
   *
   * @param {*} data
   * @returns
   */
  GLMapCoordSys.prototype.dataToPoint = function (data) {
    let result = []
    let cartesian3 = Cartesian3.fromDegrees(data[0], data[1])
    if (!cartesian3) {
      return result
    }
    let up = Ellipsoid.WGS84.geodeticSurfaceNormal(cartesian3, new Cartesian3())
    let cd = this._viewer.camera.direction
    if (Cartesian3.dot(up, cd) >= 0) {
      return result
    }
    let coords = this._viewer.scene.cartesianToCanvasCoordinates(cartesian3)
    if (!coords) {
      return result
    }
    return [coords.x - this._mapOffset[0], coords.y - this._mapOffset[1]]
  }

  /**
   *
   * @param {*} point
   * @returns
   */
  GLMapCoordSys.prototype.pointToData = function (point) {
    let ellipsoid = this._viewer.scene.globe.ellipsoid
    let cartesian3 = new Cartesian3(
      point[0] + this._mapOffset[0],
      point[1] + this._mapOffset[1],
      0
    )
    let cartographic = ellipsoid.cartesianToCartographic(cartesian3)
    return [
      CesiumMath.toDegrees(cartographic.longitude),
      CesiumMath.toDegrees(cartographic.latitude),
    ]
  }

  /**
   *
   * @returns
   */
  GLMapCoordSys.prototype.getViewRect = function () {
    let api = this._api
    return new echarts.graphic.BoundingRect(
      0,
      0,
      api.getWidth(),
      api.getHeight()
    )
  }

  /**
   *
   * @returns
   */
  GLMapCoordSys.prototype.getRoamTransform = function () {
    return echarts.matrix.create()
  }

  /**
   *
   * @param {*} ecModel
   * @param {*} api
   */
  GLMapCoordSys.create = function (ecModel, api) {
    let coordinateSys = undefined
    ecModel.eachComponent('GLMap', function (model) {
      coordinateSys = new GLMapCoordSys(api)
      coordinateSys.setMapOffset(model['__mapOffset'] || [0, 0])
      model.coordinateSystem = coordinateSys
    })
    ecModel.eachSeries(function (model) {
      'GLMap' === model.get('coordinateSystem') &&
        (model.coordinateSystem = coordinateSys)
    })
  }

  GLMapCoordSys.dimensions = ['lng', 'lat']
  return GLMapCoordSys
}
