/**
 * @Author: Caven
 * @Date: 2020-03-22 00:10:25
 */

import Position from '@dc-modules/position/Position'

class Parse {
  /**
   * Parses all kinds of coordinates to position
   * @param position
   * @returns {Position}
   */
  static parsePosition(position) {
    let result = new Position()
    if (!position) {
      return result
    }
    if (typeof position === 'string') {
      result = Position.fromString(position)
    } else if (Array.isArray(position)) {
      result = Position.fromArray(position)
    } else if (
      !(Object(position) instanceof Position) &&
      Object(position).hasOwnProperty('lng') &&
      Object(position).hasOwnProperty('lat')
    ) {
      result = Position.fromObject(position)
    } else if (Object(position) instanceof Position) {
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
      if (typeof item === 'string') {
        return Position.fromString(item)
      } else if (Array.isArray(item)) {
        return Position.fromArray(item)
      } else if (
        !(Object(item) instanceof Position) &&
        Object(item).hasOwnProperty('lng') &&
        Object(item).hasOwnProperty('lat')
      ) {
        return Position.fromObject(item)
      } else if (Object(item) instanceof Position) {
        return item
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
