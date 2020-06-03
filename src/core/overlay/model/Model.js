/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-03 13:52:52
 */

import { Util } from '../../utils'
import Transform from '../../transform/Transform'
import State from '../../state/State'
import Overlay from '../Overlay'

const { Cesium } = DC.Namespace

class Model extends Overlay {
  constructor(position, modelUrl) {
    if (!Util.checkPosition(position)) {
      throw new Error('Model: the position invalid')
    }
    super()
    this._position = position
    this._modelUrl = modelUrl
    this._delegate = new Cesium.Entity()
    this._rotateAmount = 0
    this.type = Overlay.getOverlayType('model')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Model: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set modelUrl(modelUrl) {
    this._modelUrl = modelUrl
  }

  get modelUrl() {
    return this._modelUrl
  }

  set rotateAmount(amount) {
    this._rotateAmount = amount
  }

  get rotateAmount() {
    return this._rotateAmount
  }

  _mountedHook() {
    /**
     * set the location
     */
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return Transform.transformWGS84ToCartesian(this._position)
    })
    /**
     * set the orientation
     */
    this._delegate.orientation = new Cesium.CallbackProperty(time => {
      if (this._rotateAmount > 0) {
        this._position.heading += this._rotateAmount
        if (this._position.heading === 360) {
          this._position.heading = 0
        }
      }
      return Cesium.Transforms.headingPitchRollQuaternion(
        Transform.transformWGS84ToCartesian(this._position),
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(this._position.heading),
          Cesium.Math.toRadians(this._position.pitch),
          Cesium.Math.toRadians(this._position.roll)
        )
      )
    })
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.model = {
      ...this._style,
      uri: new Cesium.CallbackProperty(time => {
        return this._modelUrl
      })
    }
  }

  /**
   *
   * @param {*} text
   * @param {*} textStyle
   */
  setLabel(text, textStyle) {
    this._delegate.label = {
      ...textStyle,
      text: text
    }
    return this
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length == 0) {
      return this
    }
    this._style = style
    this._delegate.model && Util.merge(this._delegate.model, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity, modelUrl) {
    let now = Cesium.JulianDate.now()
    let position = Transform.transformCartesianToWGS84(
      entity.position.getValue(now)
    )
    let model = new Model(position, modelUrl)
    model.attr = {
      ...entity.properties.getValue(now)
    }
    return model
  }
}

Overlay.registerType('model')

export default Model
