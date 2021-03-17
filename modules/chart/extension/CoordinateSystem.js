/**
 * @Author: Caven
 * @Date: 2020-02-02 16:21:35
 */

import { Cesium } from '@dc-modules/namespace'

class CoordinateSystem {
  constructor(viewer, api) {
    this._viewer = viewer
    this._dimensions = ['lng', 'lat']
    this._mapOffset = [0, 0]
    this._api = api
  }

  setMapOffset(mapOffset) {
    this._mapOffset = mapOffset
    return this
  }

  getViewer() {
    return this._viewer
  }

  dataToPoint(data) {
    let scene = this._viewer.scene
    let result = [0, 0]
    let cartesian3 = Cesium.Cartesian3.fromDegrees(data[0], data[1])
    if (!cartesian3) {
      return result
    }
    if (
      scene.mode === Cesium.SceneMode.SCENE3D &&
      Cesium.Cartesian3.angleBetween(scene.camera.position, cartesian3) >
        Cesium.Math.toRadians(80)
    ) {
      return false
    }
    let coords = scene.cartesianToCanvasCoordinates(cartesian3)
    if (!coords) {
      return result
    }
    return [coords.x - this._mapOffset[0], coords.y - this._mapOffset[1]]
  }

  pointToData(point) {
    let ellipsoid = this._viewer.scene.globe.ellipsoid
    let cartesian3 = new Cesium.Cartesian3(
      point[0] + this._mapOffset[0],
      point[1] + this._mapOffset[1],
      0
    )
    let cartographic = ellipsoid.cartesianToCartographic(cartesian3)
    return [
      Cesium.Math.toDegrees(cartographic.longitude),
      Cesium.Math.toDegrees(cartographic.latitude)
    ]
  }

  getViewRect() {
    let api = this._api
    return new echarts.graphic.BoundingRect(
      0,
      0,
      api.getWidth(),
      api.getHeight()
    )
  }

  getRoamTransform() {
    return echarts.matrix.create()
  }

  get dimensions() {
    return this._dimensions
  }

  static get dimensions() {
    return ['lng', 'lat']
  }

  static create(ecModel, api) {
    let coordinateSys = undefined
    ecModel.eachComponent('GLMap', function(model) {
      coordinateSys = new CoordinateSystem(echarts.viewer.delegate, api)
      coordinateSys.setMapOffset(model.__mapOffset || [0, 0])
      model.coordinateSystem = coordinateSys
    })
    ecModel.eachSeries(function(model) {
      'GLMap' === model.get('coordinateSystem') &&
        (model.coordinateSystem = coordinateSys)
    })
  }
}

export default CoordinateSystem
