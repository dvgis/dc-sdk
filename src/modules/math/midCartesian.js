/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../namespace'

export default function midCartesian(start, end) {
  let c1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(start)
  let c2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(end)
  let cm = new Cesium.EllipsoidGeodesic(c1, c2).interpolateUsingFraction(0.5)
  return Cesium.Ellipsoid.WGS84.cartographicToCartesian(cm)
}
