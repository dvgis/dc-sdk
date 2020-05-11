/*
 * @Author: Caven
 * @Date: 2020-04-11 12:58:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:19:49
 */

const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class Corridor extends Overlay {
  constructor(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Corridor: the positions invalid')
    }
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('corridor')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Corridor: the positions invalid')
    }
    this._positions = Parse.parsePositions(positions)
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
        return Transform.transformWGS84ArrayToCartesianArray(this._positions)
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
    this._delegate.corridor && Util.merge(this._delegate.corridor, this._style)
    return this
  }
}

Overlay.registerType('corridor')

export default Corridor
