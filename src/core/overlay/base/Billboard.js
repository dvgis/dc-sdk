/*
 * @Author: Caven
 * @Date: 2020-01-19 10:18:23
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-03 13:52:37
 */

import { Util } from '../../utils'
import Transform from '../../transform/Transform'
import State from '../../state/State'
import Overlay from '../Overlay'

const { Cesium } = DC.Namespace

class Billboard extends Overlay {
  constructor(position, icon) {
    if (!Util.checkPosition(position)) {
      throw new Error('Billboard: the position invalid')
    }
    super()
    this._position = position
    this._icon = icon
    this._size = [32, 32]
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('billboard')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Billboard: the position invalid')
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
    if (!Array.isArray(size)) {
      throw new Error('Billboard: the size invalid')
    }
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
      return Transform.transformWGS84ToCartesian(this._position)
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
      Util.merge(this._delegate.billboard, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity) {
    let billboard = undefined
    let now = Cesium.JulianDate.now()
    let position = Transform.transformCartesianToWGS84(
      entity.position.getValue(now)
    )
    if (entity.billboard) {
      billboard = new Billboard(position, entity.billboard.image.getValue(now))
      billboard.attr = {
        ...entity.properties.getValue(now)
      }
    }
    return billboard
  }
}

Overlay.registerType('billboard')

export default Billboard
