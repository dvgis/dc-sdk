/*
 * @Author: Caven
 * @Date: 2020-02-01 12:07:54
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-11 18:32:54
 */

import Widget from './Widget'

class Tooltip extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-tool-tip')
    this.type = DC.WidgetType.TOOL_TIP
  }

  _updateWindowCoord(windowCoord) {
    let x = windowCoord.x + 10
    let y = windowCoord.y - this._wapper.offsetHeight / 2
    this._wapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(x)}px,${Math.round(y)}px, 0);
    `
  }
}

export default Tooltip
