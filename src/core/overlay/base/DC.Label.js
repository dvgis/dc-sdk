/*
 * @Author: Caven
 * @Date: 2020-02-01 11:59:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-20 13:59:58
 */
import Cesium from '@/namespace'
import Overlay from '../Overlay'

DC.Label = class extends Overlay {
  constructor(position, text) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    super()
    this._position = position
    this._text = text
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.LABEL
  }

  set position(position) {
    this._position = position
  }

  get position() {
    return this._position
  }

  set text(icon) {
    this._text = text
  }

  get text() {
    return this._text
  }

  /**
   * prepare entity
   */
  _prepareDelegate() {
    /**
     * set the location
     */
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return DC.T.transformWSG84ToCartesian(this._position)
    })
    /**
     * set the orientation
     */
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
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.label = {
      ...this._style,
      text: new Cesium.CallbackProperty(time => {
        return this._text
      })
    }
    this._delegate.layer = this._layer
    this._delegate.overlayId = this._id
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return
    }
    this._style = style
    this._delegate.label && this._delegate.label.merge(this._style)
    return this
  }
}
