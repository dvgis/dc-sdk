/*
 * @Author: Caven
 * @Date: 2020-02-12 21:44:24
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 19:05:37
 */
import Cesium from '@/namespace'
import '@/core/overlay/base/DC.Billboard'

DC.CustomBillboard = class extends DC.Billboard {
  constructor(position, icon) {
    super(position, icon)
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.CUSTOM_BILLBOARD
  }

  /**
   *
   * @param {*} style
   */
  setVLine(style) {
    if (this._position.alt > 0 && !this._delegate.polyline) {
      let position = new DC.Position()
      this._delegate.polyline = {
        ...style,
        positions: new Cesium.CallbackProperty(time => {
          position.lng = this._position.lng
          position.lat = this._position.lat
          position.alt = 0
          return DC.T.transformWSG84ArrayToCartesianArray([
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

DC.OverlayType.CUSTOM_BILLBOARD = 'customBillboard'
