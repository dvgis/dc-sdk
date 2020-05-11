/*
 * @Author: Caven
 * @Date: 2020-03-31 20:58:06
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:39:22
 */

export default function isBetween(value, min, max) {
  value = parseFloat(value || 0.0)
  return value >= parseFloat(min) && value <= parseFloat(max)
}
