/*
 * @Author: Caven
 * @Date: 2020-02-01 11:59:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-16 20:28:16
 */
import Cesium from '@/namespace'
import Overlay from '../Overlay'

DC.Label = class extends Overlay {
  constructor(position, text) {
    if (!DC.Util.checkPosition(position)) {
      throw new Error('DC.Label: the position invalid')
    }
    super()
    this._position = position
    this._text = text
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.LABEL
  }

  set position(position) {
    if (!DC.Util.checkPosition(position)) {
      throw new Error('DC.Label: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set text(text) {
    this._text = text
  }

  get text() {
    return this._text
  }

  _mountedHook() {
    /**
     * set the location
     */
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return DC.T.transformWSG84ToCartesian(this._position)
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
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    this._delegate.label && DC.Util.merge(this._delegate.label, this._style)
    return this
  }
}

DC.OverlayType.LABEL = 'label'
