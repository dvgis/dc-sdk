/*
 * @Author: Caven
 * @Date: 2020-01-07 09:00:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-19 16:48:53
 */
import Cesium from '@/namespace'

DC.T = class {
  /**
   *
   * @param {*} cartesian
   * 卡迪尔坐标转84坐标
   */
  static transformCartesianToWSG84(cartesian) {
    if (cartesian) {
      let ellipsoid = Cesium.Ellipsoid.WGS84
      let cartographic = ellipsoid.cartesianToCartographic(cartesian)
      return new DC.Position(
        Cesium.Math.toDegrees(
          cartographic.longitude ? cartographic.longitude.toFix(6) : 0
        ),
        Cesium.Math.toDegrees(
          cartographic.latitude ? cartographic.latitude.toFix(6) : 0
        ),
        cartographic.height ? cartographic.height.toFix(2) : 0
      )
    }
    return new DC.Position(0, 0)
  }

  /**
   *
   * @param {*} position
   * 84坐标转卡迪尔坐标
   */
  static transformWSG84ToCartesian(position) {
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
   * @param {*} position
   * 84坐标转制图坐标
   */
  static transformWSG84ToCartographic(position) {
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
   * @param {*} cartesianArr
   * 卡迪尔坐标数组转84坐标数组
   */
  static transformCartesianArrayToWSG84Array(cartesianArr) {
    return cartesianArr
      ? cartesianArr.map(item => DC.T.transformCartesianToWSG84(item))
      : []
  }

  /**
   *
   * @param {*} WSG84Arr
   * 84坐标数组转卡迪尔坐标数组
   */
  static transformWSG84ArrayToCartesianArray(WSG84Arr) {
    return WSG84Arr
      ? WSG84Arr.map(item => DC.T.transformWSG84ToCartesian(item))
      : []
  }

  static transformWindowCoordToWSG84(position, viewer) {}

  static transformWSG84ToWindowCoord(position, viewer) {}

  static transformWSG84ToCanvasCoord(position) {}

  static transformCanvasCoordToWSG84(position) {}
}
