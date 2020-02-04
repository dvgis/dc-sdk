/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-01 18:29:54
 */

import Cesium from '@/namespace'
import Overlay from '../Overlay'

const DEF_STYLE = {
  pixelSize: 8,
  outlineColor: Cesium.Color.BLUE,
  outlineWidth: 2
}

DC.Point = class extends Overlay {
  constructor(position) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    super()
    this._position = position
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POINT
  }

  set position(position) {
    this._position = position
  }

  get position() {
    return this._position
  }

  /**
   * prepare entity
   */
  _prepareDelegate() {
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
    this._delegate.point = {
      ...DEF_STYLE,
      ...this._style
    }
    this._delegate.layer = this._layer
    this._delegate.overlayId = this._id
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
    this._delegate.point && DC.Util.merge(this._delegate.point, DEF_STYLE, this._style)
    return this
  }
}
