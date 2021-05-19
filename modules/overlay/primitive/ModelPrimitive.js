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
    this.type = Overlay.getOverlayType('model_primitive')
    this._state = State.INITIALIZED
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
   * Sets style
   * @param style
   * @returns {ModelPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    Util.merge(this._delegate, this._style)
    return this
  }
}

Overlay.registerType('model_primitive')

export default ModelPrimitive
