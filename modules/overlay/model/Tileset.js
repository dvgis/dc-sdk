/**
 * @Author: Caven
 * @Date: 2020-01-07 20:51:56
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import Overlay from '../Overlay'

class Tileset extends Overlay {
  constructor(url, options = {}) {
    super()
    this._delegate = new Cesium.Cesium3DTileset({
      ...options,
      url: url
    })
    this._tileVisibleCallback = undefined
    this._properties = undefined
    this._fragmentShader = undefined
    this._replaceFS = false
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('tileset')
  }

  get readyPromise() {
    return this._delegate.readyPromise
  }

  /**
   *
   * @private
   */
  _bindVisibleEvent() {
    this._tileVisibleCallback && this._tileVisibleCallback()
    this._tileVisibleCallback = this._delegate.tileVisible.addEventListener(
      this._updateTile,
      this
    )
  }

  /**
   * Updates tile
   * @param tile
   * @private
   */
  _updateTile(tile) {
    let content = tile.content
    let model = content._model
    // sets properties
    for (let i = 0; i < content.featuresLength; i++) {
      let feature = content.getFeature(i)
      if (this._properties && this._properties.length) {
        this._properties.forEach(property => {
          if (
            feature.hasProperty(property['key']) &&
            feature.getProperty(property['key']) === property['keyValue']
          ) {
            feature.setProperty(
              property['propertyName'],
              property['propertyValue']
            )
          }
        })
      }
    }
    // sets fragmentShader
    if (
      this._fragmentShader &&
      model &&
      model._sourcePrograms &&
      model._rendererResources
    ) {
      Object.keys(model._sourcePrograms).forEach(key => {
        let program = model._sourcePrograms[key]
        let sourceShaders = model._rendererResources.sourceShaders
        if (this._replaceFS) {
          sourceShaders[program.fragmentShader] = this._fragmentShader
        } else {
          let oldFS = sourceShaders[program.fragmentShader]
          sourceShaders[program.fragmentShader] = oldFS.replace(
            'gl_FragColor = vec4(color, 1.0);\n}',
            `gl_FragColor = vec4(color, 1.0);
             ${this._fragmentShader}\n}
            `
          )
        }
      })
      model._shouldRegenerateShaders = true
    }
  }

  /**
   * Sets position
   * @param position
   * @returns {Tileset}
   */
  setPosition(position) {
    position = Parse.parsePosition(position)
    this.readyPromise.then(tileset => {
      let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.alt)
      )
      let rotation = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromHeadingPitchRoll(
          new Cesium.HeadingPitchRoll(
            Cesium.Math.toRadians(position.heading),
            Cesium.Math.toRadians(position.pitch),
            Cesium.Math.toRadians(position.roll)
          )
        )
      )
      Cesium.Matrix4.multiply(modelMatrix, rotation, modelMatrix)
      tileset.root.transform = modelMatrix
    })
    return this
  }

  /**
   *
   * @param heading
   * @param pitch
   * @param roll
   * @returns {Tileset}
   */
  setHeadingPitchRoll(heading, pitch, roll) {
    this.readyPromise.then(tileset => {
      let modelMatrix = tileset.root.transform
      let rotation = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromHeadingPitchRoll(
          new Cesium.HeadingPitchRoll(
            Cesium.Math.toRadians(heading || 0),
            Cesium.Math.toRadians(pitch || 0),
            Cesium.Math.toRadians(roll || 0)
          )
        )
      )
      Cesium.Matrix4.multiply(modelMatrix, rotation, modelMatrix)
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
   * Clamps To Ground
   * @returns {Tileset}
   */
  clampToGround() {
    this.readyPromise.then(tileset => {
      let center = Cesium.Cartographic.fromCartesian(
        tileset.boundingSphere.center
      )
      let surface = Cesium.Cartesian3.fromRadians(
        center.longitude,
        center.latitude,
        center.height
      )
      let offset = Cesium.Cartesian3.fromRadians(
        center.longitude,
        center.latitude,
        0
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
   * Sets height
   * @param height
   * @param isAbsolute
   * @returns {Tileset}
   */
  setHeight(height, isAbsolute = false) {
    this.readyPromise.then(tileset => {
      let center = Cesium.Cartographic.fromCartesian(
        tileset.boundingSphere.center
      )
      let surface = Cesium.Cartesian3.fromRadians(
        center.longitude,
        center.latitude,
        center.height
      )
      let offset = Cesium.Cartesian3.fromRadians(
        center.longitude,
        center.latitude,
        isAbsolute ? height : center.height + height
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
   * Sets scale
   * @param scale
   * @returns {Tileset}
   */
  setScale(scale) {
    this.readyPromise.then(tileset => {
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
  setProperties(properties) {
    this._properties = properties
    this._bindVisibleEvent()
    return this
  }

  /**
   * Sets feature FS
   * @param fragmentShader
   * @returns {Tileset}
   */
  setCustomShader(fragmentShader) {
    this._replaceFS = true
    this._fragmentShader = fragmentShader
    this._bindVisibleEvent()
    return this
  }

  /**
   *
   * @param fragmentShader
   * @return {Tileset}
   */
  replaceFS(fragmentShader) {
    this._replaceFS = true
    this._fragmentShader = fragmentShader
    this._bindVisibleEvent()
    return this
  }

  /**
   *
   * @param fragmentShader
   * @return {Tileset}
   */
  appendFS(fragmentShader) {
    this._replaceFS = false
    this._fragmentShader = fragmentShader
    this._bindVisibleEvent()
    return this
  }

  /**
   *
   * @param splitDirection
   * @return {Tileset}
   */
  setSplitDirection(splitDirection) {
    this.readyPromise.then(tileset => {
      tileset.splitDirection = splitDirection
    })
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
