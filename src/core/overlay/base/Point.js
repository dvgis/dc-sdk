/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:07:14
 */

import { Util } from '../../utils'
import Transform from '../../transform/Transform'
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
    if (!Util.checkPosition(position)) {
      throw new Error('Point: the position invalid')
    }
    super()
    this._position = position
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('point')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Point: the position invalid')
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
      return Transform.transformWGS84ToCartesian(this._position)
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
      Util.merge(this._delegate.point, DEF_STYLE, this._style)
    return this
  }
}

Overlay.registerType('point')

export default Point
