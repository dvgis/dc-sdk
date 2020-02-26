/*
 * @Author: Caven
 * @Date: 2020-02-26 10:15:55
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-26 22:43:40
 */
import Cesium from '@/namespace'

let LineEmissionShader = require('../shader/PolylineEmissionShader.glsl')

DC.PolylineEmissionMaterialProperty = class {
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
      (other instanceof DC.PolylineEmissionMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Cesium.defineProperties(DC.PolylineEmissionMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color')
})

Cesium.Material.PolylineEmissionType = 'PolylineEmission'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.PolylineEmissionType,
  {
    fabric: {
      type: Cesium.Material.PolylineEmissionType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7)
      },
      source: LineEmissionShader
    },
    translucent: function(material) {
      return true
    }
  }
)
