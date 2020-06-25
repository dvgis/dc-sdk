/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-25 08:55:35
 */

import { Util } from '../../utils'
import Transform from '../../transform/Transform'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import Overlay from '../Overlay'

const { Cesium } = DC.Namespace

const DEF_STYLE = {
  pixelSize: 8,
  outlineColor: Cesium.Color.BLUE,
  outlineWidth: 2
}

class Point extends Overlay {
  constructor(position) {
    super()
    this._delegate = new Cesium.Entity({ point: {} })
    this._position = Parse.parsePosition(position)
    this.type = Overlay.getOverlayType('point')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Point: the position invalid')
    }
    this._position = Parse.parsePosition(position)
    this._delegate.position = Transform.transformWGS84ToCartesian(
      this._position
    )
    return this
  }

  get position() {
    return this._position
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position

    /**
     *  initialize the Overlay parameter
     */
    Util.merge(this._delegate.point, DEF_STYLE, this._style)
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['position']
    this._style = style
    Util.merge(this._delegate.point, DEF_STYLE, this._style)
    return this
  }
}

Overlay.registerType('point')

export default Point
