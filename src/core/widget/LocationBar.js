/*
 * @Author: Caven
 * @Date: 2020-03-04 18:02:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-11 17:36:18
 */

import Widget from './Widget'

class LocationBar extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-location-bar')
    this._mouseEl = DC.DomUtil.create('div', 'mouse-location', this._wapper)
    this._cameraEl = DC.DomUtil.create('div', 'camera-location', this._wapper)
  }

  _installHook() {
    this._wapper && (this._wapper.style.visibility = 'hidden')
    this._viewer.on(DC.MouseEventType.MOUSE_MOVE, this._moveHandler, this)
    this._viewer.on(DC.SceneEventType.CAMERA_CHANGED, this._cameraHandler, this)
  }

  _moveHandler(movement) {
    if (this._enable) {
    }
  }

  _cameraHandler(e) {
    if (this._enable) {
    }
  }

  install(viewer) {
    this._viewer = viewer
    this._wapper && this._viewer.dcContainer.appendChild(this._wapper)
    this._state = DC.WidgetState.INSTALLED
    this._installHook && this._installHook()
  }
}

DC.WidgetType.LOCATION_BAR = 'locationBar'

export default LocationBar
