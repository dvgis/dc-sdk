/*
 * @Author: Caven
 * @Date: 2020-01-15 19:16:45
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-02 15:30:04
 */

import Widget from './Widget'

class Popup extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-popup')
    this._config = undefined
    this.type = DC.WidgetType.POPUP
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
    this._wapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(x)}px,${Math.round(y)}px, 0);
    `
  }

  _setCustomClass() {
    DC.DomUtil.setClass(this._wapper, `dc-popup ${this._config.customClass}`)
  }

  _setArrowStyle() {}

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
  }
}

DC.WidgetType.POPUP = 'popup'

export default Popup
