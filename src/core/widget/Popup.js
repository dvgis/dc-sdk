/*
 * @Author: Caven
 * @Date: 2020-01-15 19:16:45
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-01 19:02:13
 */

import Widget from './Widget'

class Popup extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-popup')
    this._contentEl = DC.DomUtil.create('div', 'popup-content', this._wapper)
    this._config = undefined
  }

  _installHook() {
    this.enable = true
  }

  _updateWindowCoord(windowCoord) {
    let x = windowCoord.x - this._wapper.offsetWidth / 2
    let y = windowCoord.y - this._wapper.offsetHeight
    if (this._config && this._config.position === 'left') {
      x = windowCoord.x - this._wapper.offsetWidth
    } else if (this._config && this._config.position === 'right') {
      x = windowCoord.x
    }
    if (this._config && this._config.arrow) {
    }
    this._wapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(x)}px,${Math.round(y)}px, 0);
    `
  }

  _setCustomClass() {}

  _setCustomBg() {}

  _setArrowStyle() {}

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
    config.customBg && this._setCustomBg()
    config.arrow && this._setArrowStyle()
  }
}

export default Popup
