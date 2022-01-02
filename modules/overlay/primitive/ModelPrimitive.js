/**
 * @Author: Caven
 * @Date: 2021-05-14 00:33:27
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class ModelPrimitive extends Overlay {
  constructor(position, modelUrl) {
    super()
    this._position = Parse.parsePosition(position)
    this._modelUrl = modelUrl
    this._delegate = Cesium.Model.fromGltf({ url: modelUrl })
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('model_primitive')
  }

  get readyPromise() {
    return this._delegate.readyPromise
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    let origin = Transform.transformWGS84ToCartesian(this._position)
    this._delegate.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
      origin,
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(this._position.heading),
        Cesium.Math.toRadians(this._position.pitch),
        Cesium.Math.toRadians(this._position.roll)
      )
    )
    return this
  }

  get position() {
    return this._position
  }

  set modelUrl(modelUrl) {
    this._modelUrl = modelUrl
    this._delegate = Cesium.Model.fromGltf({ url: modelUrl })
    this.position = this._position
    return this
  }

  get modelUrl() {
    return this._modelUrl
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
  }

  /**
   *
   * @param name
   */
  getMaterial(name) {
    return this._delegate.getMaterial(name)
  }

  /**
   *
   * @param name
   */
  getMesh(name) {
    return this._delegate.getMesh(name)
  }

  /**
   *
   * @param name
   * @returns {*}
   */
  getNode(name) {
    return this._delegate.getNode(name)
  }

  /**
   *
   * @returns {*}
   */
  getNodes() {
    return this._delegate._runtime.nodes
  }

  /**
   * Sets style
   * @param style
   * @returns {ModelPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    Util.merge(this._style, style)
    Util.merge(this._delegate, style)
    return this
  }
}

Overlay.registerType('model_primitive')

export default ModelPrimitive
