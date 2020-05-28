/*
 * @Author: Caven
 * @Date: 2020-03-22 00:10:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-28 15:33:20
 */

import Position from '../position/Position'

class Parse {
  /**
   *
   * @param {*} position
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
   *
   * @param {*} positions
   *
   */
  static parsePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';')
    }
    return positions.map(item => {
      if (Array.isArray(item)) {
        return Position.fromCoordArray(item)
      } else if (item instanceof Position) {
        return item
      } else {
        return Position.fromCoordString(item)
      }
    })
  }

  /**
   *
   * @param {*} position
   */
  static parsePointCoordToArray(position) {
    position = this.parsePosition(position)
    return [position.lng, position.lat]
  }

  /**
   *
   * @param {*} positions
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
   *
   * @param {*} positions
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
