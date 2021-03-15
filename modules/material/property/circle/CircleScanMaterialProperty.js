/**
 * @Author: Caven
 * @Date: 2021-01-09 20:23:53
 */

import MaterialProperty from '../../MaterialProperty'

const { Cesium } = DC.Namespace

class CircleScanMaterialProperty extends MaterialProperty {
  constructor(options = {}) {
    super(options)
  }

  getType(time) {
    return Cesium.Material.CircleScanType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    result.speed = this._speed
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof CircleScanMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._speed, other._speed))
    )
  }
}

Object.defineProperties(CircleScanMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  speed: Cesium.createPropertyDescriptor('speed')
})

export default CircleScanMaterialProperty
