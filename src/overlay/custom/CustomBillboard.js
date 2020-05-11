/*
 * @Author: Caven
 * @Date: 2020-02-12 21:44:24
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:18:04
 */

const { Billboard, Position, State, Transform } = DC

const { Cesium } = DC.Namespace

class CustomBillboard extends Billboard {
  constructor(position, icon) {
    super(position, icon)
    this._state = State.INITIALIZED
    this.type = Overlay.getOverlayType('custom_billboard')
  }

  /**
   *
   * @param {*} style
   */
  setVLine(style) {
    if (this._position.alt > 0 && !this._delegate.polyline) {
      let position = new Position()
      this._delegate.polyline = {
        ...style,
        positions: new Cesium.CallbackProperty(time => {
          position.lng = this._position.lng
          position.lat = this._position.lat
          position.alt = 0
          return Transform.transformWGS84ArrayToCartesianArray([
            position,
            this._position
          ])
        })
      }
    }
    return this
  }

  /**
   *
   * @param {*} radius
   * @param {*} style
   * @param {*} rotateAmount
   */
  setBottomCircle(radius, style, rotateAmount) {
    let stRotation = 0
    let amount = rotateAmount || 0
    this._delegate.ellipse = {
      ...style,
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      stRotation: new Cesium.CallbackProperty(time => {
        if (amount > 0) {
          stRotation += amount
          if (stRotation >= 360) {
            stRotation = 0
          }
        }
        return stRotation
      })
    }
    return this
  }
}

Overlay.registerType('custom_billboard')

export default CustomBillboard
