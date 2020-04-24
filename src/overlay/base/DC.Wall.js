/*
 * @Author: Caven
 * @Date: 2020-02-25 18:28:36
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-16 20:29:32
 */
import Cesium from '@/namespace'
import Overlay from '@/core/overlay/Overlay'

DC.Wall = class extends Overlay {
  constructor(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Wall: the positions invalid')
    }
    super()
    this._positions = DC.P.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.WALL
  }

  set positions(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Wall: the positions invalid')
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
    this._delegate.wall = {
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
    this._delegate.wall && DC.Util.merge(this._delegate.wall, this._style)
    return this
  }
}

DC.OverlayType.WALL = 'wall'
