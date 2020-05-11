/*
 * @Author: Caven
 * @Date: 2020-02-18 16:08:26
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:28:49
 */

const { Overlay, Util, State, Transform } = DC

const { Cesium } = DC.Namespace

class Plane extends Overlay {
  constructor(position, width, height, direction) {
    if (!Util.checkPosition(position)) {
      throw new Error('Plane: the position invalid')
    }
    super()
    this._position = position
    this._width = width
    this._height = height
    this._plane = new Cesium.Plane(Cesium.Cartesian3.clone(direction), 0.0)
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('plane')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Plane: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
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

  set direction(direction) {
    this._plane = new Cesium.Plane(direction, 0.0)
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
        Transform.transformWGS84ToCartesian(this._center),
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
    this._delegate.plane = {
      ...this._style,
      plane: new Cesium.CallbackProperty(time => {
        return this._plane
      }),
      dimensions: new Cesium.CallbackProperty(time => {
        return { x: this._width, y: this._height }
      })
    }
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    this._delegate.plane && Util.merge(this._delegate.plane, this._style)
    return this
  }
}

Overlay.registerType('plane')

export default Plane
