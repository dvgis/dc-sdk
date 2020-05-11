/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:22:10
 */
const { Overlay, Util, State, Transform } = DC

const { Cesium } = DC.Namespace

class Cylinder extends Overlay {
  constructor(position, length, topRadius, bottomRadius) {
    if (!Util.checkPosition(position)) {
      throw new Error('Cylinder: the position invalid')
    }
    super()
    this._position = position
    this._length = length
    this._topRadius = topRadius
    this._bottomRadius = bottomRadius
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('cylinder')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Cylinder: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set length(length) {
    this._length = length
  }

  get length() {
    return this._length
  }

  set topRadius(topRadius) {
    this._topRadius = topRadius
  }

  get topRadius() {
    return this._topRadius
  }

  set bottomRadius(bottomRadius) {
    this._bottomRadius = bottomRadius
  }

  get bottomRadius() {
    return this._bottomRadius
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
    this._delegate.cylinder = {
      ...this._style,
      topRadius: new Cesium.CallbackProperty(time => {
        return this._topRadius
      }),
      bottomRadius: new Cesium.CallbackProperty(time => {
        return this._bottomRadius
      }),
      length: new Cesium.CallbackProperty(time => {
        return this._length
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
    this._delegate.cylinder && Util.merge(this._delegate.cylinder, this._style)
    return this
  }
}

Overlay.registerType('cylinder')

export default Cylinder
