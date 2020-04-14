/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 19:05:24
 */
import Cesium from '@/namespace'
import Overlay from '@/core/overlay/Overlay'

DC.Cylinder = class extends Overlay {
  constructor(position, length, topRadius, bottomRadius) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('DC.Cylinder：the position invalid')
    }
    super()
    this._position = position
    this._length = length
    this._topRadius = topRadius
    this._bottomRadius = bottomRadius
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.CYLINDER
  }

  set position(position) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('DC.Cylinder：the position invalid')
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
    this._delegate.cylinder &&
      DC.Util.merge(this._delegate.cylinder, this._style)
    return this
  }
}

DC.OverlayType.CYLINDER = 'cylinder'
