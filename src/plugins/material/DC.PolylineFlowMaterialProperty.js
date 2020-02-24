/*
 * @Author: Caven
 * @Date: 2020-02-24 13:53:52
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-24 13:57:34
 */

import Cesium from '@/namespace'

let LineFlowShader = require('../shader/PolylineFlowMaterial.glsl')

DC.PolylineFlowMaterialProperty = class {
  constructor(options) {
    options = options || {}
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = Cesium.defaultValue(
      options.color,
      Cesium.Color.fromBytes(0, 255, 255, 255)
    )
    this._duration = undefined
    this._durationSubscription = undefined
    this.duration = Cesium.defaultValue(options.duration, 45)
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(time) {
    return Cesium.Material.PolylineFlowType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    )
    result.duration = this._duration
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof DC.PolylineFlowMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Cesium.defineProperties(DC.PolylineFlowMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  duration: Cesium.createPropertyDescriptor('duration')
})

Cesium.Material.PolylineFlowType = 'PolylineFlow'
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineFlowType, {
  fabric: {
    type: Cesium.Material.PolylineFlowType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      duration: 45
    },
    source: LineFlowShader
  },
  translucent: function(material) {
    return true
  }
})
