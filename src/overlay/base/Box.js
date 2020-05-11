/*
 * @Author: Caven
 * @Date: 2020-02-25 18:28:36
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:48:57
 */

const { Overlay, Util, State, Transform } = DC

const { Cesium } = DC.Namespace

class Box extends Overlay {
  constructor(position, length, width, height) {
    if (!Util.checkPosition(position)) {
      throw new Error('Box: the position invalid')
    }
    super()
    this._position = position
    this._length = length
    this._width = width
    this._height = height
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('box')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Box: the position invalid')
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

  set width(width) {
    this._width = width
  }

  get width() {
    return this._width
  }

  set height(height) {
    this._height = height
  }

  get height() {
    return this._height
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
    this._delegate.box = {
      ...this._style,
      dimensions: new Cesium.CallbackProperty(time => {
        return new Cesium.Cartesian3(this._length, this._width, this._height)
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
    this._delegate.box && Util.merge(this._delegate.box, this._style)
    return this
  }
}

Overlay.registerType('box')

export default Box
