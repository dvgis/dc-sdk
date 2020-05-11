/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:37:38
 */
const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class PolylineVolume extends Overlay {
  constructor(positions, shape) {
    if (!Util.checkPositions(positions)) {
      throw new Error('PolylineVolume: the positions invalid')
    }
    super()
    this._positions = Parse.parsePositions(positions)
    this._shape = shape
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('polyline_volume')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('PolylineVolume: the positions invalid')
    }
    this._positions = Parse.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  set shape(shape) {
    if (!shape || !Array.isArray(shape)) {
      throw new Error('PolylineVolume: the shape invalid')
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
        return Transform.transformWGS84ArrayToCartesianArray(this._positions)
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
      Util.merge(this._delegate.polylineVolume, this._style)
    return this
  }
}

Overlay.registerType('polyline_volume')

export default PolylineVolume
