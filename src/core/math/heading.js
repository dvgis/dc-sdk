/**
 * @Author: Caven
 * @Date: 2020-04-11 00:41:47
 */

import Transform from '../transform/Transform'
import Position from '../position/Position'

const { Cesium } = DC.Namespace

export default function heading(startPosition, endPosition) {
  let heading = 0
  if (startPosition instanceof Position) {
    startPosition = Transform.transformWGS84ToCartesian(startPosition)
  }
  if (endPosition instanceof Position) {
    endPosition = Transform.transformWGS84ToCartesian(endPosition)
  }
  let v = Cesium.Cartesian3.subtract(
    endPosition,
    startPosition,
    new Cesium.Cartesian3()
  )
  if (v) {
    Cesium.Cartesian3.normalize(v, v)
    let up = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(
      startPosition,
      new Cesium.Cartesian3()
    )
    let east = Cesium.Cartesian3.cross(
      Cesium.Cartesian3.UNIT_Z,
      up,
      new Cesium.Cartesian3()
    )
    let north = Cesium.Cartesian3.cross(up, east, new Cesium.Cartesian3())
    heading = Math.atan2(
      Cesium.Cartesian3.dot(v, east),
      Cesium.Cartesian3.dot(v, north)
    )
  }
  return heading
}
