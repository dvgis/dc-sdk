/**
 * @Author: Caven
 * @Date: 2020-03-04 18:02:32
 */

import { MouseEventType, SceneEventType } from '../event'
import { DomUtil } from '../utils'
import State from '../state/State'
import Widget from './Widget'

const { Cesium } = DC.Namespace

class LocationBar extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-location-bar')
    this._mouseEl = undefined
    this._cameraEl = undefined
    this.type = Widget.getWidgetType('location_bar')
    this._state = State.INITIALIZED
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

  _cameraHandler() {
    let cameraPosition = this._viewer.cameraPosition
    this._cameraEl.innerHTML = `
      <span>视角：${(+cameraPosition.pitch).toFixed(2)}</span>
      <span>视高：${(+cameraPosition.alt).toFixed(2)} 米</span>
    `
  }
}

Widget.registerType('location_bar')

export default LocationBar
