/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 14:13:29
 */
import Cesium from '@/namespace'
import Overlay from '@/core/overlay/Overlay'

DC.Ellipsoid = class extends Overlay {
  constructor(position, radius) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('DC.Ellipsoid: the position invalid')
    }
    super()
    this._position = position
    this._radius = radius
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.ELLIPSOID
  }

  set position(position) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('DC.Ellipsoid：the position invalid')
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
      return DC.T.transformWSG84ToCartesian(this._position)
    })
    /**
     * set the orientation
     */
    this._delegate.orientation = new Cesium.CallbackProperty(time => {
      return Cesium.Transforms.headingPitchRollQuaternion(
        DC.T.transformWSG84ToCartesian(this._position),
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
      DC.Util.merge(this._delegate.ellipsoid, this._style)
    return this
  }
}

DC.OverlayType.ELLIPSOID = 'ellipsoid'
