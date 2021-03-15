/**
 * @Author: Caven
 * @Date: 2020-08-16 11:14:23
 */

/**
 * Some of the code borrows from MAPV
 * https://github.com/huiyan-fe/mapv/blob/3292c7c25dbbf29af3cf7b3acb48108d60b3eed8/src/utils/curve.js
 */
export default function curve(points, options) {
  options = options || {}
  let curvePoints = []
  for (let i = 0; i < points.length - 1; i++) {
    let p = getCurveByTwoPoints(points[i], points[i + 1], options.count)
    if (p && p.length > 0) {
      curvePoints = curvePoints.concat(p)
    }
  }
  return curvePoints
}

/**
 * Get a curvilinear coordinate set of points based on two points
 * @param obj1
 * @param obj2
 * @param count
 * @returns {null|[]}
 */
function getCurveByTwoPoints(obj1, obj2, count) {
  if (!obj1 || !obj2) {
    return null
  }
  let curveCoordinates = []
  count = count || 40 // 曲线是由一些小的线段组成的，这个表示这个曲线所有到的折线的个数
  let B1 = function(x) {
    return 1 - 2 * x + x * x
  }
  let B2 = x => {
    return 2 * x - 2 * x * x
  }
  let B3 = x => {
    return x * x
  }

  let t, h, h2, lat3, lng3, t2
  let inc = 0
  let lat1 = parseFloat(obj1.lat)
  let lat2 = parseFloat(obj2.lat)
  let lng1 = parseFloat(obj1.lng)
  let lng2 = parseFloat(obj2.lng)

  // 计算曲线角度的方法
  if (lng2 > lng1) {
    if (lng2 - lng1 > 180) {
      if (lng1 < 0) {
        lng1 = 180 + 180 + lng1
        lng2 = 180 + 180 + lng2
      }
    }
  }
  // 此时纠正了 lng1 lng2

  t2 = 0
  // 纬度相同
  if (lat2 === lat1) {
    t = 0
    h = lng1 - lng2
    // 经度相同
  } else if (lng2 === lng1) {
    t = Math.PI / 2
    h = lat1 - lat2
  } else {
    t = Math.atan((lat2 - lat1) / (lng2 - lng1))
    h = (lat2 - lat1) / Math.sin(t)
  }
  if (t2 === 0) {
    t2 = t + Math.PI / 5
  }
  h2 = h / 2
  lng3 = h2 * Math.cos(t2) + lng1
  lat3 = h2 * Math.sin(t2) + lat1

  for (let i = 0; i < count + 1; i++) {
    let x = lng1 * B1(inc) + lng3 * B2(inc) + lng2 * B3(inc)
    let y = lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc)
    let lng1_src = obj1.lng
    let lng2_src = obj2.lng
    curveCoordinates.push([lng1_src < 0 && lng2_src > 0 ? x - 360 : x, y])
    inc = inc + 1 / count
  }
  return curveCoordinates
}
