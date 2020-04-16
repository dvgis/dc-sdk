/*
 * @Author: Caven
 * @Date: 2020-01-19 10:18:23
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-16 20:27:59
 */

import Cesium from '@/namespace'
import Overlay from '../Overlay'

DC.Billboard = class extends Overlay {
  constructor(position, icon) {
    if (!DC.Util.checkPosition(position)) {
      throw new Error('DC.Billboard: the position invalid')
    }
    super()
    this._position = position
    this._icon = icon
    this._size = [32, 32]
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.BILLBOARD
  }

  set position(position) {
    if (!DC.Util.checkPosition(position)) {
      throw new Error('DC.Billboard: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set icon(icon) {
    this._icon = icon
  }

  get icon() {
    return this._icon
  }

  set size(size) {
    this._size = size
  }

  get size() {
    return this._size
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
    this._delegate.billboard = {
      ...this._style,
      image: new Cesium.CallbackProperty(time => {
        return this._icon
      }),
      width: new Cesium.CallbackProperty(time => {
        return this._size[0] || 32
      }),
      height: new Cesium.CallbackProperty(time => {
        return this._size[1] || 32
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
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    this._delegate.billboard &&
      DC.Util.merge(this._delegate.billboard, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity) {
    let position = DC.T.transformCartesianToWSG84(
      entity.position.getValue(Cesium.JulianDate.now())
    )
    let billboard = undefined
    if (entity.billboard) {
      billboard = new DC.Billboard(position, entity.billboard.image)
      billboard.attr = {
        ...entity.properties.getValue(Cesium.JulianDate.now())
      }
    }
    return billboard
  }
}

DC.OverlayType.BILLBOARD = 'billboard'
