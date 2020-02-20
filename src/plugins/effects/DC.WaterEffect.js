/*
 * @Author: Caven
 * @Date: 2020-01-14 18:25:41
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-20 13:45:59
 */
import Cesium from '@/namespace'
import Effect from './Effect'

DC.WaterEffect = class extends Effect {
  constructor(positions) {
    super()
    this._positions = positions
  }

  _prepareDelegate() {
    let geometry = Cesium.PolygonGeometry.fromPositions({})
    this._delegate = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry
      })
    })
  }
}
