/*
 * @Author: Caven
 * @Date: 2020-04-11 12:58:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-16 20:29:06
 */

import Cesium from '@/namespace'
import Overlay from '@/core/overlay/Overlay'

DC.Corridor = class extends Overlay {
  constructor(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Corridor: the positions invalid')
    }
    super()
    this._positions = DC.P.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.CORRIDOR
  }

  set positions(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Corridor: the positions invalid')
    }
    this._positions = DC.P.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.corridor = {
      ...this._style,
      positions: new Cesium.CallbackProperty(time => {
        return DC.T.transformWGS84ArrayToCartesianArray(this._positions)
      })
    }
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
    this._delegate.corridor &&
      DC.Util.merge(this._delegate.corridor, this._style)
    return this
  }
}

DC.OverlayType.CORRIDOR = 'corridor'
