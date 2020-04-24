/*
 * @Author: Caven
 * @Date: 2020-04-23 09:29:56
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-23 12:38:10
 */

export default function getBounds(positions = [], expand = 0) {
  let minLng = 180
  let minLat = 90
  let maxLng = -180
  let maxLat = -90
  positions
    .filter(item => item instanceof DC.Position)
    .forEach(item => {
      minLng = Math.min(minLng, item.lng)
      minLat = Math.min(minLat, item.lat)
      maxLng = Math.max(maxLng, item.lng)
      maxLat = Math.max(maxLat, item.lat)
    })

  if (expand > 0) {
    let diffLng = Math.abs(maxLng - maxLng)
    let diffLat = Math.abs(maxLat - minLat)
    minLng -= diffLng * expand
    minLat -= diffLat * expand
    maxLng += diffLng * expand
    maxLat += diffLat * expand
  }
  return {
    west: minLng,
    south: minLat,
    east: maxLng,
    north: maxLat
  }
}
