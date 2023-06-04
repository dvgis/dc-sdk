/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../namespace'
import { Transform } from '../transform'
import Position from '../position/Position'

export default function center(positions) {
  if (positions && Array.isArray(positions)) {
    let boundingSphere = Cesium.BoundingSphere.fromPoints(
      Transform.transformWGS84ArrayToCartesianArray(positions)
    )
    return Transform.transformCartesianToWGS84(boundingSphere.center)
  }

  return new Position()
}
