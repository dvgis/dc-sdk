/**
 * @Author: Caven
 * @Date: 2020-04-24 14:49:37
 */

import { Transform } from '@dc-modules/transform'

export default function area(positions) {
  let result = 0
  if (positions && Array.isArray(positions)) {
    let h = 0
    let pos = positions.concat(positions[0])
    for (let i = 1; i < pos.length; i++) {
      let oel = Transform.transformWGS84ToCartesian(pos[i - 1])
      let el = Transform.transformWGS84ToCartesian(pos[i])
      h += oel.x * el.y - el.x * oel.y
    }
    result = Math.abs(h).toFixed(2)
  }
  return result
}
