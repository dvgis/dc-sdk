/*
 * @Author: Caven
 * @Date: 2020-03-06 17:56:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:32:33
 */

const { Cesium } = DC.Namespace

class CircleWaveMaterialProperty {
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
    this.count = Math.max(Cesium.defaultValue(options.count, 2), 1)
    this.gradient = Cesium.defaultValue(options.gradient, 0.1)
    if (this.gradient < 0) {
      this.gradient = 0
    } else if (this.gradient > 1) {
      this.gradient = 1
    }
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(time) {
    return Cesium.Material.CircleWaveType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    result.duration = this._duration
    result.count = this.count
    result.gradient = this.gradient
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof CircleWaveMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Object.defineProperties(CircleWaveMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  duration: Cesium.createPropertyDescriptor('duration')
})

export default CircleWaveMaterialProperty
