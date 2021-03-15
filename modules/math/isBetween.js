/**
 * @Author: Caven
 * @Date: 2020-03-31 20:58:06
 */

export default function isBetween(value, min, max) {
  value = parseFloat(value) || 0.0
  return value >= parseFloat(min) && value <= parseFloat(max)
}
