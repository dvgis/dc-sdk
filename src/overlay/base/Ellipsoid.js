/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:27:01
 */
const { Overlay, Util, State, Transform } = DC

const { Cesium } = DC.Namespace

class Ellipsoid extends Overlay {
  constructor(position, radius) {
    if (!Util.checkPosition(position)) {
      throw new Error('Ellipsoid: the position invalid')
    }
    super()
    this._position = position
    this._radius = radius || 0
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('ellipsoid')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Ellipsoid: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set radius(radius) {
    this._radius = radius
  }

  get radius() {
    return this._redius
  }

  _mountedHook() {
    /**
     * set the location
     */
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return Transform.transformWGS84ToCartesian(this._position)
    })
    /**
     * set the orientation
     */
    this._delegate.orientation = new Cesium.CallbackProperty(time => {
      return Cesium.Transforms.headingPitchRollQuaternion(
        Transform.transformWGS84ToCartesian(this._position),
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(this._position.heading),
          Cesium.Math.toRadians(this._position.pitch),
          Cesium.Math.toRadians(this._position.roll)
        )
      )
    })
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.ellipsoid = {
      ...this._style,
      radii: new Cesium.CallbackProperty(time => {
        return this._radius
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
    this._delegate.ellipsoid &&
      Util.merge(this._delegate.ellipsoid, this._style)
    return this
  }
}

Overlay.registerType('ellipsoid')

export default Ellipsoid
