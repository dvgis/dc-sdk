/**
 * @Author: Caven
 * @Date: 2020-03-22 00:10:25
 */

import Position from '../position/Position'

class Parse {
  /**
   * Parses all kinds of coordinates to position
   * @param position
   * @returns {Position}
   */
  static parsePosition(position) {
    let result = new Position()
    if (typeof position === 'string') {
      result = Position.fromCoordString(position)
    } else if (Array.isArray(position)) {
      result = Position.fromCoordArray(position)
    } else if (position instanceof Position) {
      result = position
    }
    return result
  }

  /**
   * Parses all kinds of coordinates array to position array
   * @param positions
   * @returns {unknown[]}
   */
  static parsePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';')
    }
    return positions.map(item => {
      if (Array.isArray(item) && item.length) {
        return Position.fromCoordArray(item)
      } else if (item instanceof Position) {
        return item
      } else if (typeof item === 'string' && item) {
        return Position.fromCoordString(item)
      }
    })
  }

  /**
   * Parses point position to array
   * @param position
   * @returns {*[]}
   */
  static parsePointCoordToArray(position) {
    position = this.parsePosition(position)
    return [position.lng, position.lat]
  }

  /**
   * Parses polyline positions to array
   * @param positions
   * @returns {[]}
   */
  static parsePolylineCoordToArray(positions) {
    let result = []
    positions = this.parsePositions(positions)
    positions.forEach(item => {
      result.push([item.lng, item.lat])
    })
    return result
  }

  /**
   * Parses polygon positions to array
   * @param positions
   * @returns {[][]}
   */
  static parsePolygonCoordToArray(positions) {
    let result = []
    positions = this.parsePositions(positions)
    positions.forEach(item => {
      result.push([item.lng, item.lat])
    })
    return [result]
  }
}

export default Parse
