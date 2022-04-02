/**
 * @Author: Caven
 * @Date: 2020-03-04 18:02:32
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { DomUtil } from '@dc-modules/utils'
import { MouseEventType, SceneEventType } from '@dc-modules/event'
import Widget from '../Widget'

class LocationBar extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-location-bar')
    this._mouseEl = undefined
    this._cameraEl = undefined
    this._state = State.INITIALIZED
    this._lastMouseUpdate = Cesium.getTimestamp()
    this._lastCameraUpdate = Cesium.getTimestamp()
  }

  get type() {
    return Widget.getWidgetType('location_bar')
  }

  /**
   *
   * @private
   */
  _installHook() {
    Object.defineProperty(this._viewer, 'locationBar', {
      value: this,
      writable: false
    })
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.on(MouseEventType.MOUSE_MOVE, this._moveHandler, this)
    this._viewer.on(SceneEventType.CAMERA_CHANGED, this._cameraHandler, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.off(MouseEventType.MOUSE_MOVE, this._moveHandler, this)
    this._viewer.off(SceneEventType.CAMERA_CHANGED, this._cameraHandler, this)
  }

  /**
   *
   * @private
   */
  _mountContent() {
    this._mouseEl = DomUtil.create('div', 'mouse-location', this._wrapper)
    this._cameraEl = DomUtil.create('div', 'camera-location', this._wrapper)
    this._ready = true
  }

  /**
   *
   * @param e
   * @private
   */
  _moveHandler(e) {
    let now = Cesium.getTimestamp()
    if (now < this._lastMouseUpdate + 300) {
      return
    }
    this._lastMouseUpdate = now
    let ellipsoid = Cesium.Ellipsoid.WGS84
    let cartographic = e.surfacePosition
      ? ellipsoid.cartesianToCartographic(e.surfacePosition)
      : undefined
    let lng = +Cesium.Math.toDegrees(cartographic?.longitude || 0)
    let lat = +Cesium.Math.toDegrees(cartographic?.latitude || 0)
    let alt = cartographic
      ? +this._viewer.scene.globe.getHeight(cartographic)
      : 0
    this._mouseEl.innerHTML = `
      <span>经度：${lng.toFixed(8)}</span>
      <span>纬度：${lat.toFixed(8)}</span>
      <span>海拔：${alt.toFixed(2)} 米</span>`
  }

  /**
   *
   * @private
   */
  _cameraHandler() {
    let now = Cesium.getTimestamp()
    if (now < this._lastCameraUpdate + 300) {
      return
    }
    this._lastCameraUpdate = now
    let cameraPosition = this._viewer.cameraPosition
    this._cameraEl.innerHTML = `
      <span>视角：${(+cameraPosition.pitch).toFixed(2)}</span>
      <span>视高：${(+cameraPosition.alt).toFixed(2)} 米</span>
    `
  }
}

Widget.registerType('location_bar')

export default LocationBar
