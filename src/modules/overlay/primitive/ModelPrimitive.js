/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../../namespace'
import Overlay from '../Overlay'
import State from '../../state/State'
import Parse from '../../parse/Parse'
import { Transform } from '../../transform'
import { Util } from '../../utils'

class ModelPrimitive extends Overlay {
  constructor(position, modelUrl) {
    super()
    this._position = Parse.parsePosition(position)
    this._modelUrl = modelUrl
    this._delegate = Cesium.Model.fromGltfAsync({ url: modelUrl })
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('model_primitive')
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    let origin = Transform.transformWGS84ToCartesian(this._position)
    this._delegate.then((model) => {
      model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        origin,
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(this._position.heading),
          Cesium.Math.toRadians(this._position.pitch),
          Cesium.Math.toRadians(this._position.roll)
        )
      )
    })
  }

  get position() {
    return this._position
  }

  set modelUrl(modelUrl) {
    this._modelUrl = modelUrl
    this._delegate = Cesium.Model.fromGltfAsync({
      url: modelUrl,
      ...this._style,
    })
    this.position = this._position
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
    Util.merge(this._style, style)
    this._delegate.then((model) => {
      Util.merge(model, style)
    })
    return this
  }
}

Overlay.registerType('model_primitive')

export default ModelPrimitive
