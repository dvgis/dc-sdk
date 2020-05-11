/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:24:34
 */
const { Overlay, Util, State, Transform } = DC

const { Cesium } = DC.Namespace

class Ellipse extends Overlay {
  constructor(position, semiMajorAxis, semiMinorAxis) {
    if (!Util.checkPosition(position)) {
      throw new Error('Ellipse: the position invalid')
    }
    super()
    this._position = position
    this._semiMajorAxis = semiMajorAxis || 0
    this._semiMinorAxis = semiMinorAxis || 0
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('ellipse')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Ellipse: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set semiMajorAxis(semiMajorAxis) {
    this._semiMajorAxis = semiMajorAxis
  }

  get semiMajorAxis() {
    return this._semiMajorAxis
  }

  set semiMinorAxis(semiMinorAxis) {
    this._semiMinorAxis = semiMinorAxis
  }

  get semiMinorAxis() {
    return this._semiMinorAxis
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
    this._delegate.ellipse = {
      ...this._style,
      semiMajorAxis: new Cesium.CallbackProperty(time => {
        return this._semiMajorAxis
      }),
      semiMinorAxis: new Cesium.CallbackProperty(time => {
        return this._semiMinorAxis
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
    this._delegate.ellipse && Util.merge(this._delegate.ellipse, this._style)
    return this
  }
}

Overlay.registerType('ellipse')

export default Ellipse
