/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-01 12:05:10
 */

import Overlay from '../Overlay'
import Cesium from '@/namespace'

DC.Model = class extends Overlay {
  constructor(position, modelUrl) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    super()
    this._position = position
    this._modelUrl = modelUrl
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
  }

  set position(position) {
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

  _prepareDelegate() {
    // 设置位置
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return DC.T.transformWSG84ToCartesian(this._position)
    })
    // 设置朝向
    this._delegate.orientation = new Cesium.CallbackProperty(time => {
      return Cesium.Transforms.headingPitchRollQuaternion(
        DC.T.transformWSG84ToCartesian(this._position),
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(this._position.heading),
          Cesium.Math.toRadians(this._position.pitch),
          Cesium.Math.toRadians(this._position.roll)
        )
      )
    })
    // 设置模型参数
    this._delegate.model = {
      ...this._style,
      uri: new Cesium.CallbackProperty(time => {
        return this._modelUrl
      })
    }
    this._delegate.layer = this._layer
    this._delegate.overlayId = this._id
  }

  /**
   *
   * @param {*} text
   * @param {*} textStyle
   */
  bindLabel(text, textStyle) {
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
      return
    }
    this._style = style
    this._delegate.model && this._delegate.model.merge(this._style)
  }
}
