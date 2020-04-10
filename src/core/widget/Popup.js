/*
 * @Author: Caven
 * @Date: 2020-01-15 19:16:45
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 13:23:33
 */

import Widget from './Widget'

class Popup extends Widget {
  constructor() {
    super()
    this._wrapper = DC.DomUtil.create('div', 'dc-popup')
    this._config = undefined
    this._positionChangeAble = true
    this.type = DC.WidgetType.POPUP
  }

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
  }

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
    DC.DomUtil.setClass(this._wrapper, `dc-popup ${this._config.customClass}`)
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
}

DC.WidgetType.POPUP = 'popup'

export default Popup
