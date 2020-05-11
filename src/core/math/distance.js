/*
 * @Author: Caven
 * @Date: 2020-03-31 20:58:06
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 21:48:23
 */

import Transform from '../transform/Transform'

export default function distance(positions) {
  let distance = 0
  if (positions && Array.isArray(positions)) {
    for (let i = 0; i < positions.length - 1; i++) {
      let point1cartographic = Transform.transformWGS84ToCartographic(
        positions[i]
      )
      let point2cartographic = Transform.transformWGS84ToCartographic(
        positions[i + 1]
      )
      let geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(point1cartographic, point2cartographic)
      let s = geodesic.surfaceDistance
      s = Math.sqrt(
        Math.pow(s, 2) +
          Math.pow(point2cartographic.height - point1cartographic.height, 2)
      )
      distance = distance + s
    }
  }

  return distance.toFixed(3)
}
