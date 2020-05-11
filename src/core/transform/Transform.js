/*
 * @Author: Caven
 * @Date: 2020-01-07 09:00:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 16:34:47
 */
import { Cesium } from '../../namespace'
import Position from '../position/Position'

const WMP = new Cesium.WebMercatorProjection()

class Transform {
  /**
   *
   *卡迪尔坐标转84坐标
   * @param {*} cartesian
   *
   */
  static transformCartesianToWGS84(cartesian) {
    if (cartesian) {
      let ellipsoid = Cesium.Ellipsoid.WGS84
      let cartographic = ellipsoid.cartesianToCartographic(cartesian)
      return new Position(
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude),
        cartographic.height
      )
    }
    return new Position(0, 0)
  }

  /**
   *
   * 84坐标转卡迪尔坐标
   * @param {*} position
   *
   */
  static transformWGS84ToCartesian(position) {
    return position
      ? Cesium.Cartesian3.fromDegrees(
          position.lng,
          position.lat,
          position.alt,
          Cesium.Ellipsoid.WGS84
        )
      : Cesium.Cartesian3.ZERO
  }

  /**
   *
   * 84坐标转制图坐标
   * @param {*} position
   *
   */
  static transformWGS84ToCartographic(position) {
    return position
      ? Cesium.Cartographic.fromDegrees(
          position.lng,
          position.lat,
          position.alt
        )
      : Cesium.Cartographic.ZERO
  }

  /**
   *
   * 卡迪尔坐标数组转84坐标数组
   * @param {*} cartesianArr
   *
   */
  static transformCartesianArrayToWGS84Array(cartesianArr) {
    return cartesianArr
      ? cartesianArr.map(item => this.transformCartesianToWGS84(item))
      : []
  }

  /**
   *
   * 84坐标数组转卡迪尔坐标数组
   * @param {*} WGS84Arr
   *
   */
  static transformWGS84ArrayToCartesianArray(WGS84Arr) {
    return WGS84Arr
      ? WGS84Arr.map(item => this.transformWGS84ToCartesian(item))
      : []
  }

  /**
   *
   * @param {*} position
   *
   */
  static transformWGS84ToMercator(position) {
    let mp = WMP.project(
      Cesium.Cartographic.fromDegrees(position.lng, position.lat, position.alt)
    )
    return new DC.Position(mp.x, mp.y, mp.z)
  }

  /**
   *
   * @param {*} position
   *
   */
  static transformMercatorToWGS84(position) {
    let mp = WMP.unproject(
      new Cesium.Cartesian3(position.lng, position.lat, position.alt)
    )
    return new DC.Position(
      Cesium.Math.toDegrees(mp.longitude),
      Cesium.Math.toDegrees(mp.latitude),
      mp.height
    )
  }

  /**
   *
   * @param {*} position
   * @param {*} viewer
   */
  static transformWindowToWGS84(position, viewer) {
    let scene = viewer.scene
    let cartesian = undefined
    if (scene.mode === Cesium.SceneMode.SCENE3D) {
      let ray = scene.camera.getPickRay(position)
      cartesian = scene.globe.pick(ray, scene)
    } else {
      cartesian = scene.camera.pickEllipsoid(position, Cesium.Ellipsoid.WGS84)
    }
    return this.transformCartesianToWGS84(cartesian)
  }

  /**
   *
   * @param {*} position
   * @param {*} viewer
   */
  static transformWGS84ToWindow(position, viewer) {
    let scene = viewer.scene
    let cartesian = SceneTransforms.wgs84ToWindowCoordinates(
      scene,
      this.transformWGS84ToCartesian(position)
    )
    return cartesian
  }
}

export default Transform
