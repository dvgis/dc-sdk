/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-16 20:29:27
 */
import Cesium from '@/namespace'
import Overlay from '@/core/overlay/Overlay'

DC.PolylineVolume = class extends Overlay {
  constructor(positions, shape) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.PolylineVolume: the positions invalid')
    }
    super()
    this._positions = DC.P.parsePositions(positions)
    this._shape = shape
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POLYLINE_VOLUME
  }

  set positions(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.PolylineVolume: the positions invalid')
    }
    this._positions = DC.P.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  set shape(shape) {
    if (!shape || !Array.isArray(shape)) {
      throw new Error('DC.PolylineVolume: the shape invalid')
    }
    this._shape = shape
  }

  get shape() {
    return this._shape
  }

  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.polylineVolume = {
      ...this._style,
      positions: new Cesium.CallbackProperty(time => {
        return DC.T.transformWSG84ArrayToCartesianArray(this._positions)
      }),
      shape: new Cesium.CallbackProperty(time => {
        return this._shape
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
    this._delegate.polylineVolume &&
      DC.Util.merge(this._delegate.polylineVolume, this._style)
    return this
  }
}

DC.OverlayType.POLYLINE_VOLUME = 'polylineVolume'
