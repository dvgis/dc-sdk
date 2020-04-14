/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 19:04:13
 */

import Cesium from '@/namespace'
import Overlay from '../Overlay'

const DEF_STYLE = {
  pixelSize: 8,
  outlineColor: Cesium.Color.BLUE,
  outlineWidth: 2
}

DC.Point = class extends Overlay {
  constructor(position) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    super()
    this._position = position
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POINT
  }

  set position(position) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
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
    this._delegate.point = {
      ...DEF_STYLE,
      ...this._style
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
    this._delegate.point &&
      DC.Util.merge(this._delegate.point, DEF_STYLE, this._style)
    return this
  }
}

DC.OverlayType.POINT = 'point'
