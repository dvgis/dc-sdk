/*
 * @Author: Caven
 * @Date: 2020-02-24 13:09:09
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:33:41
 */

const { Cesium } = DC.Namespace

class PolylineTrailMaterialProperty {
  constructor(options) {
    options = options || {}
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this._duration = undefined
    this._durationSubscription = undefined
    this.color = Cesium.defaultValue(
      options.color,
      Cesium.Color.fromBytes(0, 255, 255, 255)
    )
    this.duration = Cesium.defaultValue(options.duration, 45)
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(time) {
    return Cesium.Material.PolylineTrailType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    )
    result.duration = this._duration
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof PolylineTrailMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Object.defineProperties(PolylineTrailMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  duration: Cesium.createPropertyDescriptor('duration')
})

export default PolylineTrailMaterialProperty
