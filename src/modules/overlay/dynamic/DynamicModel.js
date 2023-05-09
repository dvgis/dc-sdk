/**
 * @Author: Caven
 * @Date: 2021-05-05 09:16:35
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'
import DynamicOverlay from './DynamicOverlay'

class DynamicModel extends DynamicOverlay {
  constructor(position, modelUrl) {
    super()
    this._posistion = Parse.parsePosition(position)
    this._modelUrl = modelUrl
    this._delegate = new Cesium.Entity({ model: {} })
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('dynamic_model')
  }

  set modelUrl(modelUrl) {
    this._modelUrl = modelUrl
    this._delegate.model.uri = this._modelUrl
    return this
  }

  get modelUrl() {
    return this._modelUrl
  }

  _mountedHook() {
    /**
     * set the location
     */
    this._sampledPosition.forwardExtrapolationType =
      Cesium.ExtrapolationType.HOLD
    this._startTime = Cesium.JulianDate.now()
    this._sampledPosition.addSample(
      this._startTime,
      Transform.transformWGS84ToCartesian(this._posistion)
    )
    this._delegate.position = this._sampledPosition
    this._delegate.orientation = new Cesium.VelocityOrientationProperty(
      this._sampledPosition
    )
    this._cache.push(this._startTime)
    /**
     *  initialize the Overlay parameter
     */
    this.modelUrl = this._modelUrl
  }

  /**
   * Sets style
   * @param style
   * @returns {DynamicModel}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['uri']
    Util.merge(this._style, style)
    Util.merge(this._delegate.model, style)
    return this
  }
}

Overlay.registerType('dynamic_model')

export default DynamicModel
