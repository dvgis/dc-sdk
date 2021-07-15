/**
 * @Author: Caven
 * @Date: 2020-08-21 18:16:52
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Parse from '@dc-modules/parse/Parse'
import Position from '@dc-modules/position/Position'

export default function mid(start, end) {
  let startPosition = start
  let endPosition = end
  if (!(start instanceof Cesium.Cartesian3)) {
    startPosition = Parse.parsePosition(start)
    startPosition = Transform.transformWGS84ToCartesian(startPosition)
  }
  if (!(end instanceof Cesium.Cartesian3)) {
    endPosition = Parse.parsePosition(end)
    endPosition = Transform.transformWGS84ToCartesian(endPosition)
  }
  let mc = new Cesium.EllipsoidGeodesic(
    startPosition,
    endPosition
  ).interpolateUsingFraction(0.5)

  return new Position(
    Cesium.Math.toDegrees(mc.longitude),
    Cesium.Math.toDegrees(mc.latitude),
    mc.height
  )
}
