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

class DynamicModel extends Overlay {
  constructor(modelUrl) {
    super()
    this._delegate = new Cesium.Entity({ model: {} })
    this._posistion = new Cesium.SampledPositionProperty()
    this._modelUrl = modelUrl
    this._timeLine = {}
    this._lastTime = undefined
    this.type = Overlay.getOverlayType('dynamic-model')
    this._state = State.INITIALIZED
  }

  get position() {
    return this._position
  }

  get timeLine() {
    return this._timeLine
  }

  _mountedHook() {
    this._posistion.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD
    this._delegate.position = this._posistion
    this._delegate.orientation = new Cesium.VelocityOrientationProperty(
      this._posistion
    )
  }

  /**
   *
   * @param position
   * @param interval
   */
  addPosition(position, interval) {
    let now = Cesium.JulianDate.now()
    let time = Cesium.JulianDate.addSeconds(
      now,
      interval,
      new Cesium.JulianDate()
    )
    this._lastTime = Cesium.JulianDate.toIso8601(time)
    let cartesian = Transform.transformWGS84ToCartesian(
      Parse.parsePosition(position)
    )
    this._posistion.addSample(time, cartesian)
    this._timeLine[this._lastTime] = cartesian
    return this
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
    delete style['uri'] && delete style['position']
    this._style = style
    Util.merge(this._delegate.model, this._style)
    return this
  }
}

Overlay.registerType('dynamic-model')

export default DynamicModel
