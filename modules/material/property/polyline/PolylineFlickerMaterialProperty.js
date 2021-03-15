/**
 * @Author: Caven
 * @Date: 2021-01-11 21:08:02
 */

import MaterialProperty from '../../MaterialProperty'

const { Cesium } = DC.Namespace

class PolylineFlickerMaterialProperty extends MaterialProperty {
  constructor(options = {}) {
    super(options)
  }

  getType(time) {
    return Cesium.Material.PolylineFlickerType
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
      (other instanceof PolylineFlickerMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._speed, other._speed))
    )
  }
}

Object.defineProperties(PolylineFlickerMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  speed: Cesium.createPropertyDescriptor('speed')
})

export default PolylineFlickerMaterialProperty
