/*
 * @Author: Caven
 * @Date: 2019-12-31 17:32:01
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 15:09:03
 */

import Widget from './Widget'

class ContextMenu extends Widget {
  constructor() {
    super()
    this._viewer = undefined
    this._position = undefined
    this._wapper = DC.DomUtil.create('div', 'dc-context-menu')
    this._state = DC.WidgetState.INSTALLED
    this.type = DC.WidgetType.ContextMenu
  }

  _handleRightclick(movement) {}

  _handleclick(movement) {
    this.hide()
  }
}

export default ContextMenu
