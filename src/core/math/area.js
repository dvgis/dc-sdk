/**
 * @Author: Caven
 * @Date: 2020-04-24 14:49:37
 */

import Transform from '../transform/Transform'

const { Cesium } = DC.Namespace

export default function area(positions) {
  let result = 0
  if (positions && Array.isArray(positions)) {
    let h = 0
    let ellipsoid = Cesium.Ellipsoid.WGS84
    let positions = [...positions].concat(positions[0])
    for (let i = 1; i < positions.length; i++) {
      let oel = ellipsoid.cartographicToCartesian(
        Transform.transformWGS84ToCartographic(positions[i - 1])
      )
      let el = ellipsoid.cartographicToCartesian(
        Transform.transformWGS84ToCartographic(positions[i])
      )
      h += oel.x * el.y - el.x * oel.y
    }
    result = Math.abs(h).toFixed(2)
  }
  return result
}
