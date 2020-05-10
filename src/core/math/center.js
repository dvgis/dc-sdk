/*
 * @Author: Caven
 * @Date: 2020-04-24 14:43:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-09 21:50:19
 */

import { Cesium } from '../../namespace'

export default function center(positions) {
  if (positions && Array.isArray(positions)) {
    let boundingSphere = Cesium.BoundingSphere.fromPoints(
      DC.T.transformWGS84ArrayToCartesianArray(positions)
    )
    return DC.T.transformCartesianToWGS84(boundingSphere.center)
  }

  return new DC.Position()
}
