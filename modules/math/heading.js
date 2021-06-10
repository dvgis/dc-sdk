/**
 * @Author: Caven
 * @Date: 2020-04-11 00:41:47
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Parse from '@dc-modules/parse/Parse'

export default function heading(start, end) {
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

  let ff = Cesium.Transforms.eastNorthUpToFixedFrame(startPosition)
  let v = Cesium.Cartesian3.subtract(
    endPosition,
    startPosition,
    new Cesium.Cartesian3()
  )
  let vector = Cesium.Matrix4.multiplyByPointAsVector(
    Cesium.Matrix4.inverse(ff, new Cesium.Matrix4()),
    v,
    new Cesium.Cartesian3()
  )
  Cesium.Cartesian3.normalize(vector, vector)
  let heading = Math.atan2(vector.y, vector.x) - Cesium.Math.PI_OVER_TWO
  return Cesium.Math.TWO_PI - Cesium.Math.zeroToTwoPi(heading)
}
