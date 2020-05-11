/*
 * @Author: Caven
 * @Date: 2020-02-25 18:28:36
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:45:48
 */

const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class Wall extends Overlay {
  constructor(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Wall: the positions invalid')
    }
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('wall')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Wall: the positions invalid')
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
    this._delegate.wall = {
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
    this._delegate.wall && Util.merge(this._delegate.wall, this._style)
    return this
  }
}

Overlay.registerType('wall')

export default Wall
