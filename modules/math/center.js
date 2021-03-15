/**
 * @Author: Caven
 * @Date: 2020-04-24 14:43:39
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Position from '@dc-modules/position/Position'

export default function center(positions) {
  if (positions && Array.isArray(positions)) {
    let boundingSphere = Cesium.BoundingSphere.fromPoints(
      Transform.transformWGS84ArrayToCartesianArray(positions)
    )
    return Transform.transformCartesianToWGS84(boundingSphere.center)
  }

  return new Position()
}
