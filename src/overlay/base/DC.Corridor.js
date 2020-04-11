/*
 * @Author: Caven
 * @Date: 2020-04-11 12:58:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-11 12:59:25
 */

import Cesium from '@/namespace'
import Overlay from '@/core/overlay/Overlay'

DC.Corridor = class extends Overlay {
  constructor(positions) {
    if (
      !positions ||
      (typeof positions !== 'string' && !Array.isArray(positions))
    ) {
      throw new Error('the positions invalid')
    }
    super()
    this._positions = DC.P.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.CORRIDOR
  }

  set positions(positions) {
    this._positions = DC.P.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  /**
   * prepare entity
   */
  _prepareDelegate() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.corridor = {
      ...this._style,
      positions: new Cesium.CallbackProperty(time => {
        return DC.T.transformWSG84ArrayToCartesianArray(this._positions)
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
