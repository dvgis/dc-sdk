/*
 * @Author: Caven
 * @Date: 2020-02-12 21:44:24
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-13 17:42:56
 */
import Cesium from '@/namespace'
import '../../core/overlay/base/DC.Billboard'

DC.CustomBillboard = class extends DC.Billboard {
  constructor(position, icon) {
    super(position, icon)
  }

  setLine(style) {
    if (this._position && this._position.alt > 0 && this._delegate) {
      if (!this._delegate.polyline) {
        let position = new DC.Position()
        this._delegate.polyline = {
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
      this._delegate.polyline && this._delegate.polyline.merge(style)
    }
    return this
  }

  setCircle(redius, style) {
    !this._delegate.ellipse && (this._delegate.ellipse = {})
    this._delegate.ellipse.merge({
      semiMajorAxis: redius,
      semiMinorAxis: redius,
      ...style
    })
    return this
  }
}
