/*
 * @Author: Caven
 * @Date: 2020-02-25 22:49:56
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-26 22:44:11
 */

import Cesium from '@/namespace'

DC.RimLightingMaterialProperty = class {
  constructor(options) {
    options = options || {}
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = Cesium.defaultValue(
      options.color,
      new Cesium.Color(1.0, 0.0, 0.0, 0.7)
    )
    this._rimColor = undefined
    this._rimColorSubscription = undefined
    this.rimColor = Cesium.defaultValue(
      options.rimColor,
      new Cesium.Color(1.0, 1.0, 1.0, 0.4)
    )
    this._width = undefined
    this._widthSubscription = undefined
    this.width = Cesium.defaultValue(options.width, 0.3)
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(time) {
    return Cesium.Material.RimLightingType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    result.rimColor = Cesium.Property.getValueOrUndefined(this._rimColor, time)
    result.width = Cesium.Property.getValueOrUndefined(this._width, time)
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof DC.RimLightingMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Cesium.defineProperties(DC.RimLightingMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  rimColor: Cesium.createPropertyDescriptor('rimColor'),
  width: Cesium.createPropertyDescriptor('width')
})
