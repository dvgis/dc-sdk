/**
 * @Author: Caven
 * @Date: 2019-12-31 17:32:01
 */

import { DomUtil } from '../utils'
import { MouseEventType } from '../event'
import State from '../state/State'
import Widget from './Widget'

class ContextMenu extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-context-menu')
    this._ulEl = DomUtil.create('ul', 'menu-list', this._wrapper)
    this._config = {}
    this._positionChangeable = false
    this.type = Widget.getWidgetType('contextmenu')
    this._state = State.INITIALIZED
  }

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
    return this
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.on(MouseEventType.RIGHT_CLICK, this._rightClickHandler, this)
    this._viewer.on(MouseEventType.CLICK, this._clickHandler, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.off(MouseEventType.RIGHT_CLICK, this._rightClickHandler, this)
    this._viewer.off(MouseEventType.CLICK, this._clickHandler, this)
  }

  /**
   *
   * @private
   */
  _mountContent() {
    let homeMenu = DomUtil.create('li', 'menu-item', this._ulEl)
    homeMenu.innerHTML = '飞到默认位置'
    let self = this
    homeMenu.onclick = () => {
      self._viewer.delegate.camera.flyHome(0)
      self.hide()
    }
    this._ready = true
  }

  /**
   *
   * @param e
   * @private
   */
  _rightClickHandler(e) {
    if (e && e.windowPosition && this._enable) {
      this._updateWindowCoord(e.windowPosition)
    }
  }

  /**
   *
   * @param e
   * @private
   */
  _clickHandler(e) {
    this.hide()
  }

  /**
   *
   * @param windowCoord
   * @private
   */
  _updateWindowCoord(windowCoord) {
    this._wrapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(windowCoord.x)}px,${Math.round(
      windowCoord.y
    )}px, 0);
    `
  }

  /**
   *
   * @private
   */
  _setCustomClass() {
    DomUtil.setClass(
      this._wrapper,
      `dc-context-menu ${this._config.customClass}`
    )
  }

  /**
   *
   * @param {*} label
   * @param {*} method
   * @param {*} context
   */
  addMenuItem(label, method, context) {
    if (!label || !method) {
      return this
    }
    let menu = DomUtil.create('li', 'menu-item', null)
    let lastNode = this._ulEl.lastChild
    menu.innerHTML = label
    let self = this
    if (method) {
      menu.onclick = () => {
        method.call(context)
        self.hide()
      }
    }
    this._ulEl.insertBefore(menu, lastNode)
    return this
  }
}

Widget.registerType('contextmenu')

export default ContextMenu
