/**
 * @Author: Caven
 * @Date: 2021-08-02 20:12:04
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class ModelCollectionPrimitive extends Overlay {
  constructor(positions, modelUrl) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._modelUrl = modelUrl
    this._attrs = []
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('model_collection_primitive')
  }

  get readyPromise() {
    return this._delegate.readyPromise
  }

  set attrs(attrs) {
    this._attrs = attrs
    return this
  }

  get attrs() {
    return this._attrs
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    if (this._layer) {
      this._resetDelegate()
      this._layer.delegate.add(this._delegate)
    }
    return this
  }

  set modelUrl(modelUrl) {
    this._modelUrl = modelUrl
    if (this._layer) {
      this._resetDelegate()
      this._layer.delegate.add(this._delegate)
    }
    return this
  }

  get modelUrl() {
    return this._modelUrl
  }

  _resetDelegate() {
    this._delegate = this._delegate && this._delegate.destroy()
    this._delegate = new Cesium.ModelInstanceCollection({
      url: this._modelUrl,
      instances: this._positions.map(item => {
        let origin = Transform.transformWGS84ToCartesian(item)
        let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          origin,
          new Cesium.HeadingPitchRoll(
            Cesium.Math.toRadians(item.heading),
            Cesium.Math.toRadians(item.pitch),
            Cesium.Math.toRadians(item.roll)
          )
        )
        this._style?.scale &&
          Cesium.Matrix4.multiplyByUniformScale(
            modelMatrix,
            this._style?.scale,
            modelMatrix
          )
        return {
          modelMatrix
        }
      }),
      ...this._style
    })
    this._delegate.layerId = this._layer?.layerId
    this._delegate.overlayId = this._id
  }

  _mountedHook() {
    this._resetDelegate()
  }

  /**
   *
   * @param instanceId
   * @returns {undefined}
   */
  getModelInstance(instanceId) {
    return this._delegate._instances[instanceId] || undefined
  }

  /**
   *
   * @param instanceId
   * @returns {*|{}}
   */
  getAttrByInstanceId(instanceId) {
    return this._attrs[instanceId] || {}
  }

  /**
   *
   * @param style
   * @returns {ModelCollectionPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['instances'] && delete style['url']
    Util.merge(this._style, style)
    if (this._layer) {
      this._resetDelegate()
      this._layer.delegate.add(this._delegate)
    }
    return this
  }
}

Overlay.registerType('model_collection_primitive')

export default ModelCollectionPrimitive
