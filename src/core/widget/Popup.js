/**
 * @Author: Caven
 * @Date: 2020-01-15 19:16:45
 */

import { DomUtil } from '../utils'
import State from '../state/State'
import Widget from './Widget'

class Popup extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-popup')
    this._config = { customClass: '' }
    this._positionChangeable = true
    this.type = Widget.getWidgetType('popup')
    this._state = State.INITIALIZED
  }

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
  }

  /**
   * Override the superclass function
   * @private
   */
  _enableHook() {
    !this._wrapper.parentNode &&
      this._viewer &&
      this._viewer.dcContainer.appendChild(this._wrapper)
  }

  /**
   *
   * @private
   */
  _installHook() {
    this.enable = true
  }

  _updateWindowCoord(windowCoord) {
    let x = windowCoord.x - this._wrapper.offsetWidth / 2
    let y = windowCoord.y - this._wrapper.offsetHeight
    if (this._config && this._config.position === 'left') {
      x = windowCoord.x - this._wrapper.offsetWidth
    } else if (this._config && this._config.position === 'right') {
      x = windowCoord.x
    }
    this._wrapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(x)}px,${Math.round(y)}px, 0);
    `
  }

  _setCustomClass() {
    DomUtil.setClass(this._wrapper, `dc-popup ${this._config.customClass}`)
  }

  /**
   * Setting  wrapper
   * @param wrapper
   * @returns {Widget}
   */
  setWrapper(wrapper) {
    if (wrapper && wrapper instanceof Element) {
      this._wrapper = wrapper
      DomUtil.addClass(this._wrapper, 'dc-popup')
    }
    return this
  }

  /**
   *
   * Setting widget position
   * @param {*} position
   *
   */
  setPosition(position) {
    this._position = position
    this._wrapper &&
      (this._wrapper.style.cssText = `
    visibility:visible;
    `)
    return this
  }

  /**
   *
   * @param {*} position
   * @param {*} content
   */
  showAt(position, content) {
    this.setPosition(position).setContent(content)
    return this
  }
}

Widget.registerType('popup')

export default Popup
