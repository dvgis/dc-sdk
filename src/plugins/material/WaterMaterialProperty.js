/*
 * @Author: Caven
 * @Date: 2020-02-25 21:16:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:16:17
 */

const { Cesium } = DC.Namespace

class WaterMaterialProperty {
  constructor(options) {
    options = options || {}
    this._definitionChanged = new Cesium.Event()
    this._baseWaterColor = undefined
    this._baseWaterColorSubscription = undefined
    this.baseWaterColor = Cesium.defaultValue(
      options.baseWaterColor,
      new Cesium.Color(0.2, 0.3, 0.6, 1.0)
    )
    this._blendColor = undefined
    this._blendColorSubscription = undefined
    this.blendColor = Cesium.defaultValue(
      options.blendColor,
      new Cesium.Color(0.0, 1.0, 0.699, 1.0)
    )
    this._specularMap = undefined
    this._specularMapSubscription = undefined
    this.specularMap = Cesium.defaultValue(
      options.specularMap,
      Cesium.Material.DefaultImageId
    )
    this._normalMap = undefined
    this._normalMapSubscription = undefined
    this.normalMap = Cesium.defaultValue(
      options.normalMap,
      Cesium.Material.DefaultImageId
    )
    this.frequency = Cesium.defaultValue(options.frequency, 10)
    this.animationSpeed = Cesium.defaultValue(options.animationSpeed, 0.01)
    this.amplitude = Cesium.defaultValue(options.amplitude, 1.0)
    this.specularIntensity = Cesium.defaultValue(options.specularIntensity, 0.5)
    this.fadeFactor = Cesium.defaultValue(options.fadeFactor, 1.0)
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType(time) {
    return Cesium.Material.WaterType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.baseWaterColor = Cesium.Property.getValueOrUndefined(
      this._baseWaterColor,
      time
    )
    result.blendColor = Cesium.Property.getValueOrUndefined(
      this._blendColor,
      time
    )
    result.specularMap = Cesium.Property.getValueOrUndefined(
      this._specularMap,
      time
    )
    result.normalMap = Cesium.Property.getValueOrUndefined(
      this._normalMap,
      time
    )
    result.frequency = this.frequency
    result.animationSpeed = this.animationSpeed
    result.amplitude = this.amplitude
    result.specularIntensity = this.specularIntensity
    result.fadeFactor = this.fadeFactor
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof WaterMaterialProperty &&
        Cesium.Property.equals(this._baseWaterColor, other._baseWaterColor))
    )
  }
}

Object.defineProperties(WaterMaterialProperty.prototype, {
  baseWaterColor: Cesium.createPropertyDescriptor('baseWaterColor'),
  blendColor: Cesium.createPropertyDescriptor('blendColor'),
  specularMap: Cesium.createPropertyDescriptor('specularMap'),
  normalMap: Cesium.createPropertyDescriptor('normalMap')
})

export default WaterMaterialProperty
