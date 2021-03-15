/**
 * @Author: Caven
 * @Date: 2021-01-13 20:52:47
 */

import MaterialProperty from '../../MaterialProperty'

const IMG = require('@dc-modules/images/lighting.png')

const { Cesium } = DC.Namespace

class PolylineLightingMaterialProperty extends MaterialProperty {
  constructor(options = {}) {
    super(options)
    this._image = undefined
    this._imageSubscription = undefined
    this.image = IMG
  }

  getType(time) {
    return Cesium.Material.PolylineLightingType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    result.image = Cesium.Property.getValueOrUndefined(this._image, time)
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof PolylineLightingMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._image, other._image))
    )
  }
}

Object.defineProperties(PolylineLightingMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  image: Cesium.createPropertyDescriptor('image')
})

export default PolylineLightingMaterialProperty
