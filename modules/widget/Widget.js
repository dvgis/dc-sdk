/**
 * @Author: Caven
 * @Date: 2020-01-15 19:17:52
 */

import State from '@dc-modules/state/State'
import WidgetType from './WidgetType'

class Widget {
  constructor() {
    this._viewer = undefined
    this._enable = false
    this._wrapper = undefined
    this._ready = false
    this.type = undefined
  }

  set enable(enable) {
    if (this._enable === enable) {
      return this
    }
    this._enable = enable
    this._state = this._enable ? State.ENABLED : State.DISABLED
    this._enableHook && this._enableHook()
    return this
  }

  get enable() {
    return this._enable
  }

  get state() {
    return this._state
  }

  /**
   * mount content
   * @private
   */
  _mountContent() {}

  /**
   * binds event
   * @private
   */
  _bindEvent() {}

  /**
   * Unbinds event
   * @private
   */
  _unbindEvent() {}

  /**
   * When enable modifies the hook executed, the subclass copies it as required
   * @private
   */
  _enableHook() {
    !this._ready && this._mountContent()
    if (this._enable) {
      !this._wrapper.parentNode &&
        this._viewer.dcContainer.appendChild(this._wrapper)
      this._bindEvent()
    } else {
      this._unbindEvent()
      this._wrapper.parentNode &&
        this._viewer.dcContainer.removeChild(this._wrapper)
    }
  }

  /**
   * Updating the Widget location requires subclass overrides
   * @param windowCoord
   * @private
   */
  _updateWindowCoord(windowCoord) {}

  /**
   * Hook for installed
   * @private
   */
  _installHook() {}

  /**
   * Installs to viewer
   * @param viewer
   */
  install(viewer) {
    this._viewer = viewer
    /**
     * do installHook
     */
    this._installHook && this._installHook()
    this._state = State.INSTALLED
  }

  /**
   * Setting  wrapper
   * @param wrapper
   * @returns {Widget}
   */
  setWrapper(wrapper) {
    return this
  }

  /**
   * Setting widget content
   * @param content
   * @returns {Widget}
   */
  setContent(content) {
    if (content && typeof content === 'string') {
      this._wrapper.innerHTML = content
    } else if (content && content instanceof Element) {
      while (this._wrapper.hasChildNodes()) {
        this._wrapper.removeChild(this._wrapper.firstChild)
      }
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
   * Registers type
   * @param type
   */
  static registerType(type) {
    if (type) {
      WidgetType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   *
   * @param type
   */
  static getWidgetType(type) {
    return WidgetType[type.toLocaleUpperCase()] || undefined
  }
}

export default Widget
