/*
 * @Author: Caven
 * @Date: 2020-03-06 17:56:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:04:24
 */

const { Cesium } = DC.Namespace

class CircleFadeMaterialProperty {
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
    return Cesium.Material.CircleFadeType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    result.duration = this._duration
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof CircleFadeMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Object.defineProperties(CircleFadeMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  duration: Cesium.createPropertyDescriptor('duration')
})

export default CircleFadeMaterialProperty
