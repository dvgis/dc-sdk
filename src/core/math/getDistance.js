/*
 * @Author: Caven
 * @Date: 2020-03-31 20:58:06
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-31 20:59:00
 */
export default function getDistance(positions) {
  let distance = 0
  for (let i = 0; i < positions.length - 1; i++) {
    let point1cartographic = DC.T.transformWGS84ToCartographic(positions[i])
    let point2cartographic = DC.T.transformWGS84ToCartographic(positions[i + 1])
    let geodesic = new Cesium.EllipsoidGeodesic()
    geodesic.setEndPoints(point1cartographic, point2cartographic)
    let s = geodesic.surfaceDistance
    s = Math.sqrt(
      Math.pow(s, 2) +
        Math.pow(point2cartographic.height - point1cartographic.height, 2)
    )
    distance = distance + s
  }
  return distance.toFixed(3)
}
