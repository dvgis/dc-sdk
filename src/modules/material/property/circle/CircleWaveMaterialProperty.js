/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../../../namespace'
import MaterialProperty from '../../MaterialProperty'

class CircleWaveMaterialProperty extends MaterialProperty {
  constructor(options = {}) {
    super(options)
    this.count = Math.max(options.count || 3, 1)
    this.gradient = Cesium.Math.clamp(options.gradient || 0.1, 0, 1)
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
    result.speed = Cesium.Property.getValueOrUndefined(this._speed, time)
    result.count = Cesium.Property.getValueOrUndefined(this._count, time)
    result.gradient = Cesium.Property.getValueOrUndefined(this._gradient, time)
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof CircleWaveMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._speed, other._speed))
    )
  }
}

Object.defineProperties(CircleWaveMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  speed: Cesium.createPropertyDescriptor('speed'),
})

export default CircleWaveMaterialProperty
