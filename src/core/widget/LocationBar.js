/*
 * @Author: Caven
 * @Date: 2020-03-04 18:02:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:34:03
 */

import { MouseEventType, SceneEventType } from '../event'
import { DomUtil } from '../utils'
import State from '../state/State'
import Widget from './Widget'

class LocationBar extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-location-bar')
    this._mouseEl = DomUtil.create('div', 'mouse-location', this._wrapper)
    this._cameraEl = DomUtil.create('div', 'camera-location', this._wrapper)
    this.type = Widget.getWidgetType('location_bar')
    this._state = State.INITIALIZED
  }

  _installHook() {
    this._viewer.on(MouseEventType.MOUSE_MOVE, this._moveHandler, this)
    this._viewer.on(SceneEventType.CAMERA_CHANGED, this._cameraHandler, this)
  }

  _moveHandler(movement) {
    if (this._enable) {
    }
  }

  _cameraHandler(e) {
    if (this._enable) {
    }
  }
}

Widget.registerType('location_bar')

export default LocationBar
