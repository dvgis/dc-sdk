/**
 * @Author: Caven
 * @Date: 2020-08-21 18:16:52
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Parse from '@dc-modules/parse/Parse'
import Position from '@dc-modules/position/Position'

export default function mid(start, end) {
  let startPosition = Parse.parsePosition(start)
  let endPosition = Parse.parsePosition(end)
  startPosition = Transform.transformWGS84ToCartographic(startPosition)
  endPosition = Transform.transformWGS84ToCartographic(endPosition)

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
