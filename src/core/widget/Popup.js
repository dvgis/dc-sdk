/*
 * @Author: Caven
 * @Date: 2020-01-15 19:16:45
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-01 15:04:08
 */

import Widget from './Widget'

class Popup extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-popup')
  }

  _setWindowCoord(windowCoord) {
    let x = windowCoord.x + 10
    let y = windowCoord.y - this._wapper.offsetHeight / 2
    this._wapper.style.zIndex = 1
    this._wapper.style.transform = `translate3d(${x}px,${y}px, 0)`
  }
}

export default Popup
