/*
 * @Author: Caven
 * @Date: 2020-01-31 18:57:02
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-12 21:00:59
 */
import Cesium from '@/namespace'
import Overlay from '../Overlay'

DC.Circle = class extends Overlay {
  constructor(center, redius) {
    if (!center || !(center instanceof DC.Position)) {
      throw new Error('the center invalid')
    }
    super()
    this._center = center
    this._redius = redius
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.CIRCLE
  }

  set center(center) {
    this._center = center
  }

  get center() {
    return this._center
  }

  set radius(radius) {
    this._redius = radius
  }

  get radius() {
    return this._redius
  }

  /**
   * prepare entity
   */
  _prepareDelegate() {
    /**
     * set the location
     */
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return DC.T.transformWSG84ToCartesian(this._center)
    })
    /**
     * set the orientation
     */
    this._delegate.orientation = new Cesium.CallbackProperty(time => {
      return Cesium.Transforms.headingPitchRollQuaternion(
        DC.T.transformWSG84ToCartesian(this._center),
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(this._center.heading),
          Cesium.Math.toRadians(this._center.pitch),
          Cesium.Math.toRadians(this._center.roll)
        )
      )
    })
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.ellipse = {
      ...this._style,
      semiMajorAxis: new Cesium.CallbackProperty(time => {
        return this._radius
      }),
      semiMinorAxis: new Cesium.CallbackProperty(time => {
        return this._radius
      })
    }
    this._delegate.layer = this._layer
    this._delegate.overlayId = this._id
  }

  /**
   *
   * @param {*} text
   * @param {*} textStyle
   */
  setLabel(text, textStyle) {
    this._delegate.label = {
      text: text,
      ...textStyle
    }
    return this
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return
    }
    this._style = style
    this._delegate.ellipse && this._delegate.ellipse.merge(this._style)
    return this
  }
}
