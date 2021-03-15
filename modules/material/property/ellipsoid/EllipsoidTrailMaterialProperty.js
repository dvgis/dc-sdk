/**
 * @Author: Caven
 * @Date: 2021-03-04 22:10:18
 */

import MaterialProperty from '../../MaterialProperty'

const { Cesium } = DC.Namespace

class EllipsoidTrailMaterialProperty extends MaterialProperty {
  constructor(options = {}) {
    super(options)
  }

  getType(time) {
    return Cesium.Material.EllipsoidTrailType
  }

  getValue(time, result) {
    result = Cesium.defaultValue(result, {})
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    result.speed = this._speed
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof EllipsoidTrailMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._speed, other._speed))
    )
  }
}

Object.defineProperties(EllipsoidTrailMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  speed: Cesium.createPropertyDescriptor('speed')
})

export default EllipsoidTrailMaterialProperty
