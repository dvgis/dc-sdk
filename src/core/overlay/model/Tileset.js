/**
 * @Author: Caven
 * @Date: 2020-01-07 08:51:56
 */

import Parse from '../../parse/Parse'
import State from '../../state/State'
import Overlay from '../Overlay'

const { Cesium } = DC.Namespace

class Tileset extends Overlay {
  constructor(url, options = {}) {
    super()
    this._delegate = new Cesium.Cesium3DTileset({
      ...options,
      url: url
    })
    this._tileVisibleCallback = undefined
    this._height = undefined
    this._properties = undefined
    this._stopTime = undefined
    this._duration = undefined
    this._center = undefined
    this.type = Overlay.getOverlayType('tileset')
    this._state = State.INITIALIZED
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
  _addHandler(layer) {
    if (!layer) {
      return false
    }
    this._layer = layer
    this._delegate.readyPromise.then(tileset => {
      this._layer.delegate.add(tileset)
      tileset.layer = layer
      tileset.overlayId = this._id
      this._state = State.ADDED
    })
  }

  /**
   * Overrides parent methods
   */
  _removeHandler() {
    if (!this._layer) {
      return false
    }
    this._delegate.readyPromise.then(tileset => {
      this._layer.delegate.remove(tileset)
      this._state = State.REMOVED
    })
  }

  /**
   *
   * @param tile
   * @private
   */
  _tileVisibleHandler(tile) {
    this._updateProperties(tile)
  }

  /**
   * Updates properties
   * @param tile
   * @private
   */
  _updateProperties(tile) {
    if (this._properties && this._properties.length) {
      let content = tile.content
      for (let i = 0; i < content.featuresLength; i++) {
        let feature = content.getFeature(i)
        this._properties.forEach(property => {
          if (
            feature.hasProperty(property.key) &&
            feature.getProperty(property.key) === property['keyValue']
          ) {
            feature.setProperty(
              property['propertyName'],
              property['propertyValue']
            )
          }
        })
      }
    }
  }

  /**
   *
   * @param height
   * @private
   */
  _setHeight(height) {
    this._delegate.readyPromise.then(tileset => {
      let surface = Cesium.Cartesian3.fromRadians(
        this._center.longitude,
        this._center.latitude,
        this._center.height
      )
      let offset = Cesium.Cartesian3.fromRadians(
        this._center.longitude,
        this._center.latitude,
        this._center.height + height
      )
      let translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
      )
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
    })
  }

  /**
   * Sets position
   * @param position
   * @returns {Tileset}
   */
  setPosition(position) {
    position = Parse.parsePosition(position)
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
   * @param {*} text
   * @param {*} textStyle
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets height
   * @param height
   * @returns {Tileset}
   */
  setHeight(height) {
    this._height = height
    this._delegate.readyPromise.then(tileset => {
      this._center = Cesium.Cartographic.fromCartesian(
        tileset.boundingSphere.center
      )
      this._setHeight(this._height)
    })
    return this
  }

  /**
   * Sets scale
   * @param scale
   * @returns {Tileset}
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
   * Sets feature property
   * @param properties
   * @returns {Tileset}
   */
  setFeatureProperty(properties) {
    this._properties = properties
    !this._tileVisibleCallback &&
      (this._tileVisibleCallback = this._delegate.tileVisible.addEventListener(
        this._tileVisibleHandler,
        this
      ))
    return this
  }

  /**
   * Sets style
   * @param style
   * @returns {Tileset}
   */
  setStyle(style) {
    if (style && style instanceof Cesium.Cesium3DTileStyle) {
      this._style = style
      this._delegate.style = this._style
    }
    return this
  }
}

Overlay.registerType('tileset')

export default Tileset
