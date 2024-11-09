
/**
 * @Author : Caven Chen
 */

import Parse from '../parse/Parse'
import { getLib } from '../../global-api/index.js'

class GeoTools {
  /**
   *
   * @param position
   * @param radius
   * @param steps
   * @returns {*[]}
   */
  static pointBuffer(position, radius, steps = 8) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const point = turf.point(Parse.parsePointCoordToArray(position))
    const buffered = turf.buffer(point, radius, { units: 'meters', steps })
    return buffered?.geometry?.coordinates[0] || []
  }

  /**
   *
   * @param positions
   * @param radius
   * @param steps
   * @returns {*[]}
   */
  static polylineBuffer(positions, radius, steps = 8) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const polyline = turf.lineString(Parse.parsePolylineCoordToArray(positions))
    const buffered = turf.buffer(polyline, radius, { units: 'meters', steps })
    return buffered?.geometry?.coordinates[0] || []
  }

  /**
   *
   * @param positions
   * @param radius
   * @param steps
   * @returns {*[]}
   */
  static polygonBuffer(positions, radius, steps = 8) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const polygon = turf.polygon(Parse.parsePolygonCoordToArray(positions, true))
    const buffered = turf.buffer(polygon, radius, { units: 'meters', steps })
    return buffered?.geometry?.coordinates[0] || []
  }

  /**
   *
   * @param center
   * @param radius
   * @param startAngle
   * @param endAngle
   * @param steps
   * @returns {*[]}
   */
  static sector(center, radius, startAngle, endAngle, steps = 64) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const point = turf.point(Parse.parsePointCoordToArray(center))
    const sector = turf.sector(point, radius, startAngle, endAngle, {
      units: 'meters',
      steps,
    })
    return sector?.geometry?.coordinates[0] || []
  }

  /**
   *
   * @param positions
   * @param factor
   * @returns {*[]}
   */
  static transformPolylineScale(positions, factor) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const polyline = turf.lineString(Parse.parsePolylineCoordToArray(positions))
    const scaledPolyline = turf.transformScale(polyline, factor)
    return scaledPolyline?.geometry?.coordinates || []
  }

  /**
   *
   * @param positions
   * @param factor
   * @returns {*[]}
   */
  static transformPolygonScale(positions, factor) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const polygon = turf.polygon(Parse.parsePolygonCoordToArray(positions, true))
    const scaledPolygon = turf.transformScale(polygon, factor)
    return scaledPolygon?.geometry?.coordinates[0] || []
  }

  /**
   *
   * @param positions
   * @param angle
   * @returns {*[]}
   */
  static transformPolylineRotate(positions, angle) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const polyline = turf.lineString(Parse.parsePolylineCoordToArray(positions))
    const rotatedPolyline = turf.transformRotate(polyline, angle)
    return rotatedPolyline?.geometry?.coordinates || []
  }

  /**
   *
   * @param positions
   * @param angle
   * @returns {*[]}
   */
  static transformPolygonRotate(positions, angle) {
    const turf = getLib("turf")
    if(!turf) {
      throw 'missing turf'
    }
    const polygon = turf.polygon(Parse.parsePolygonCoordToArray(positions, true))
    const rotatedPolyline = turf.transformRotate(polygon, angle)
    return rotatedPolyline?.geometry?.coordinates[0] || []
  }
}

export default GeoTools
