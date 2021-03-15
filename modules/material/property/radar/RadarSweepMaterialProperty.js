/**
 * @Author: Caven
 * @Date: 2021-02-27 23:53:08
 */

import MaterialProperty from '../../MaterialProperty'

const { Cesium } = DC.Namespace

class RadarSweepMaterialProperty extends MaterialProperty {
  constructor(options = {}) {
    super(options)
  }

  getType(time) {
    return Cesium.Material.RadarSweepType
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
      (other instanceof RadarSweepMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._speed, other._speed))
    )
  }
}

Object.defineProperties(RadarSweepMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  speed: Cesium.createPropertyDescriptor('speed')
})

export default RadarSweepMaterialProperty
