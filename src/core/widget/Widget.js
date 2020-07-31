/**
 * @Author: Caven
 * @Date: 2020-01-15 19:17:52
 */

import State from '../state/State'
import WidgetType from './WidgetType'

const { Cesium } = DC.Namespace

class Widget {
  constructor() {
    this._viewer = undefined
    this._position = undefined
    this._enable = false
    this._wrapper = undefined
    this._positionChangeable = false
    this.type = undefined
  }

  set enable(enable) {
    this._enable = enable
    this._state = this._enable ? State.ENABLED : State.DISABLED
    this._enableHook && this._enableHook()
  }

  get enable() {
    return this._enable
  }

  get state() {
    return this._state
  }

  /**
   * bind Event
   */
  _bindEvent() {}

  /**
   * unbind Event
   */
  _unbindEvent() {}

  /**
   * When enable modifies the hook executed, the subclass copies it as required
   */
  _enableHook() {
    !this._wrapper.parentNode &&
      this._viewer &&
      this._viewer.dcContainer.appendChild(this._wrapper)
    this._wrapper &&
      (this._wrapper.style.visibility = this._enable ? 'visible' : 'hidden')
    this._enable ? this._bindEvent() : this._unbindEvent()
  }

  /**
   * updating the Widget location requires subclass overrides
   * @param {*} windowCoord
   */
  _updateWindowCoord(windowCoord) {}

  /**
   *
   */
  _installHook() {}

  /**
   *
   * @param {*} viewer
   *
   */
  install(viewer) {
    this._viewer = viewer
    this._state = State.INSTALLED
    /**
     *  add postRender Listener
     */
    if (this._viewer && this._wrapper && this._positionChangeable) {
      let self = this
      let scene = this._viewer.scene
      scene.postRender.addEventListener(() => {
        if (
          self._position &&
          self._enable &&
          self._updateWindowCoord &&
          self._wrapper.style.visibility === 'visible'
        ) {
          let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            scene,
            self._position
          )
          windowCoord && self._updateWindowCoord(windowCoord)
        }
      })
    }

    /**
     * excute installHook
     */
    this._installHook && this._installHook()
  }

  /**
   * Setting widget content
   * @param {*} content
   */
  setContent(content) {
    if (content && typeof content === 'string') {
      this._wrapper.innerHTML = content
    } else if (content && content instanceof Element) {
      this._wrapper.appendChild(content)
    }
    return this
  }

  /**
   * hide widget
   */
  hide() {
    this._wrapper &&
      (this._wrapper.style.cssText = `
    visibility:hidden;
    `)
  }

  /**
   *
   * @param {*} type
   */
  static registerType(type) {
    if (type) {
      WidgetType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   *
   * @param {*} type
   */
  static getWidgetType(type) {
    return WidgetType[type.toLocaleUpperCase()] || undefined
  }
}

export default Widget
