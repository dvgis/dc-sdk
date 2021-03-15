/**
 * @Author: Caven
 * @Date: 2020-01-19 10:18:23
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Billboard extends Overlay {
  constructor(position, icon) {
    super()
    this._delegate = new Cesium.Entity({ billboard: {} })
    this._position = Parse.parsePosition(position)
    this._icon = icon
    this._size = [32, 32]
    this.type = Overlay.getOverlayType('billboard')
    this._state = State.INITIALIZED
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.position = Transform.transformWGS84ToCartesian(
      this._position
    )
    return this
  }

  get position() {
    return this._position
  }

  set icon(icon) {
    this._icon = icon
    this._delegate.billboard.image = this._icon
    return this
  }

  get icon() {
    return this._icon
  }

  set size(size) {
    if (!Array.isArray(size)) {
      throw new Error('Billboard: the size invalid')
    }
    this._size = size
    this._delegate.billboard.width = this._size[0] || 32
    this._delegate.billboard.height = this._size[1] || 32
    return this
  }

  get size() {
    return this._size
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
    /**
     *  initialize the Overlay parameter
     */
    this.icon = this._icon
    this.size = this._size
  }

  /**
   *
   * @param style
   * @returns {Billboard}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['image'] && delete style['width'] && delete style['height']
    this._style = style
    Util.merge(this._delegate.billboard, this._style)
    return this
  }

  /**
   * Parse from entity
   * @param entity
   * @returns {any}
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
        ...entity?.properties?.getValue(now)
      }
    }
    return billboard
  }
}

Overlay.registerType('billboard')

export default Billboard
