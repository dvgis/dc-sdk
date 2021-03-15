/**
 * @Author: Caven
 * @Date: 2020-04-11 00:41:47
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Parse from '@dc-modules/parse/Parse'

export default function heading(start, end) {
  let heading = 0
  let startPosition = Parse.parsePosition(start)
  let endPosition = Parse.parsePosition(end)
  startPosition = Transform.transformWGS84ToCartesian(startPosition)
  endPosition = Transform.transformWGS84ToCartesian(endPosition)
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
