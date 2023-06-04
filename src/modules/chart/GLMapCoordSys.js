/**
 * @Author : Caven Chen
 */

import { echarts, Cesium } from '../../namespace'
const { Cartesian3, Ellipsoid, Math: CesiumMath } = Cesium
const { graphic, matrix } = echarts

class GLMapCoordSys {
  constructor(api) {
    this._api = api
    this._viewer = Object(api.getZr()).viewer
    this._mapOffset = [0, 0]
    this.dimensions = ['lng', 'lat']
  }

  getViewer() {
    return this._viewer
  }

  setMapOffset(mapOffset) {
    this._mapOffset = mapOffset
    return this
  }

  dataToPoint(data) {
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

  pointToData(point) {
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

  getViewRect() {
    let api = this._api
    return new graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight())
  }

  getRoamTransform() {
    return matrix.create()
  }

  static create(ecModel, api) {
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
}

GLMapCoordSys.dimensions = ['lng', 'lat']

export default GLMapCoordSys
