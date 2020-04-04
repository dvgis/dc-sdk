/*
 * @Author: Caven
 * @Date: 2020-02-01 12:07:54
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-04 20:27:27
 */

import Widget from './Widget'

class Tooltip extends Widget {
  constructor() {
    super()
    this._wrapper = DC.DomUtil.create('div', 'dc-tool-tip')
    this.type = DC.WidgetType.TOOLTIP
  }

  /**
   *
   * @param {*} windowCoord
   *
   */
  _updateWindowCoord(windowCoord) {
    let x = windowCoord.x + 10
    let y = windowCoord.y - this._wrapper.offsetHeight / 2
    this._wrapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(x)}px,${Math.round(y)}px, 0);
    `
  }

  /**
   *
   * @param {*} position
   * @param {*} content
   *
   */
  showAt(position, content) {
    if (position) {
      this._updateWindowCoord(position)
    }
    this.setContent(content)
    return this
  }
}

DC.WidgetType.TOOLTIP = 'tooltip'

export default Tooltip
