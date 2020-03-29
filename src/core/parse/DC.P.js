/*
 * @Author: Caven
 * @Date: 2020-03-22 00:10:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-29 13:14:42
 */
DC.P = class {
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
        return DC.Position.fromCoordArray(item)
      } else if (item instanceof DC.Position) {
        return item
      } else {
        return DC.Position.fromCoordString(item)
      }
    })
  }
}
