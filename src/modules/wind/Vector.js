/**
 * @Author: Caven
 * @Date: 2021-01-18 20:25:48
 */

class Vector {
  constructor(u, v) {
    this.u = u
    this.v = v
    this.m = this.magnitude()
  }
  /**
   * the vector value
   * @returns {Number}
   */
  magnitude() {
    return Math.sqrt(this.u * this.u + this.v * this.v)
  }
  /**
   * Angle in degrees (0 to 360º) --> Towards
   * N is 0º and E is 90º
   * @returns {Number}
   */
  directionTo() {
    let verticalAngle = Math.atan2(this.u, this.v)
    let inDegrees = verticalAngle * (180.0 / Math.PI)
    if (inDegrees < 0) {
      inDegrees += 360.0
    }
    return inDegrees
  }

  /**
   * Angle in degrees (0 to 360º) From x-->
   * N is 0º and E is 90º
   * @returns {Number}
   */
  directionFrom() {
    let a = this.directionTo()
    return (a + 180.0) % 360.0
  }
}

export default Vector
