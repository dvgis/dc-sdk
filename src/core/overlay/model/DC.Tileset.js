/*
 * @Author: Caven
 * @Date: 2020-01-07 08:51:56
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-03 13:41:06
 */
import Cesium from '@/namespace'
import Overlay from '../Overlay'

DC.Tileset = class extends Overlay {
  constructor(url, options = {}) {
    super()
    this._delegate = new Cesium.Cesium3DTileset({
      url: url,
      ...options
    })
    this._state = DC.OverlayState.INITIALIZED
    this._delegate.tileVisible.addEventListener(this._tileVisibleHandler, this)
    this._propertyMap = undefined
  }

  /**
   *
   */
  get readyPromise() {
    return this._delegate.readyPromise
  }

  /**
   *
   * @param {*} layer
   * Overrides parent methods
   */
  _addCallback(layer) {
    this._layer = layer
    this._delegate.readyPromise.then(tileset => {
      this._layer.delegate.add(tileset)
      this._state = DC.OverlayState.ADDED
    })
  }

  /**
   * Overrides parent methods
   */
  _removeCallback() {
    if (this._layer) {
      this._delegate.readyPromise.then(tileset => {
        this._layer.delegate.remove(tileset)
        this._state = DC.OverlayState.REMOVED
      })
    }
  }
  /**
   *
   * @param {*} tile
   */
  _tileVisibleHandler(tile) {
    if (this._properties && this._properties.length) {
      let content = tile.content
      for (let i = 0; i < content.featuresLength; i++) {
        let feature = content.getFeature(i)
        this._properties.forEach(property => {
          if (
            feature.hasProperty(property.key) &&
            feature.getProperty(property.key) === property.keyValue
          ) {
            feature.setProperty(property.propertyName, property.propertyValue)
          }
        })
      }
    }
  }

  /**
   *
   * @param {*} position
   */
  setPosition(position) {
    if (!position || !position instanceof DC.Position) {
      return this
    }
    this._delegate.readyPromise.then(tileset => {
      let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.alt)
      )
      let rotationX = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(position.heading))
      )
      Cesium.Matrix4.multiply(modelMatrix, rotationX, modelMatrix)
      tileset.root.transform = modelMatrix
    })
    return this
  }

  /**
   *
   * @param {*} height
   */
  setHeight(height) {
    this._delegate.readyPromise.then(tileset => {
      let cartographic = Cesium.Cartographic.fromCartesian(
        tileset.boundingSphere.center
      )
      let surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        cartographic.height
      )
      let offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        cartographic.height + height
      )
      let translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
      )
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
    })
    return this
  }

  /**
   *
   * @param {*} scale
   */
  setScale(scale) {
    this._delegate.readyPromise.then(tileset => {
      let modelMatrix = tileset.root.transform
      if (scale > 0 && scale !== 1) {
        Cesium.Matrix4.multiplyByUniformScale(modelMatrix, scale, modelMatrix)
      }
      tileset.root.transform = modelMatrix
    })
    return this
  }

  /**
   *
   */
  setFeatureProperty(properties) {
    this._properties = properties
    return this
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (style && style instanceof Cesium.Cesium3DTileStyle) {
      this._style = style
      this._delegate && (this._delegate.style = this._style)
    }
    return this
  }
}
