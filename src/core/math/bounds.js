/**
 * @Author: Caven
 * @Date: 2020-04-23 09:29:56
 */

export default function bounds(positions = [], expand = 0) {
  let minLng = 180
  let minLat = 90
  let maxLng = -180
  let maxLat = -90
  positions.forEach(item => {
    minLng = Math.min(minLng, item.lng || item.x)
    minLat = Math.min(minLat, item.lat || item.y)
    maxLng = Math.max(maxLng, item.lng || item.x)
    maxLat = Math.max(maxLat, item.lat || item.y)
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
