/*
 * @Author: Caven
 * @Date: 2020-02-26 10:15:55
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:05:57
 */

const { Cesium } = DC.Namespace

class PolylineEmissionMaterialProperty {
  constructor(options) {
    options = options || {}
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = Cesium.defaultValue(
      options.color,
      new Cesium.Color(1.0, 0.0, 0.0, 0.7)
    )
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(time) {
    return Cesium.Material.PolylineEmissionType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof PolylineEmissionMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Object.defineProperties(PolylineEmissionMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color')
})

export default PolylineEmissionMaterialProperty
