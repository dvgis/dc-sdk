/*
 * @Author: Caven
 * @Date: 2020-02-25 18:28:36
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-25 20:02:19
 */
import Cesium from '@/namespace'
import Overlay from '../../core/overlay/Overlay'

DC.Wall = class extends Overlay {
  constructor(positions) {
    if (
      !positions ||
      (typeof positions !== 'string' && !Array.isArray(positions))
    ) {
      throw new Error('the positions invalid')
    }
    super()
    this._positions = []
    this._preparePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.WALL
  }

  set positions(positions) {
    this._preparePositions(positions)
  }

  get positions() {
    return this._positions
  }

  /**
   *
   * @param {*} positions
   */
  _preparePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';')
    }
    this._positions = positions.map(item => {
      if (Array.isArray(item)) {
        return DC.Position.fromCoordArray(item)
      } else if (item instanceof DC.Position) {
        return item
      } else {
        return DC.Position.fromCoordString(item)
      }
    })
  }

  /**
   * prepare entity
   */
  _prepareDelegate() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.wall = {
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
      return
    }
    this._style = style
    this._delegate.wall && DC.Util.merge(this._delegate.wall, this._style)
    return this
  }
}
