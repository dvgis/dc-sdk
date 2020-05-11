/*
 * @Author: Caven
 * @Date: 2019-12-31 17:32:01
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:08:55
 */

import { DomUtil } from '../utils'
import { MouseEventType } from '../event'
import State from '../state/State'
import Widget from './Widget'

const { Cesium } = DC.Namespace

class ContextMenu extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-context-menu')
    this._ulEl = DomUtil.create('ul', 'menu-list', this._wrapper)
    this._config = {}
    this._positionChangeable = true
    this.type = Widget.getWidgetType('contextmenu')
    this._state = State.INITIALIZED
  }

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
  }

  _installHook() {
    if (this._viewer) {
      this._viewer.on(MouseEventType.RIGHT_CLICK, this._rightclickHandler, this)
      this._viewer.on(MouseEventType.CLICK, this._clickHandler, this)
    }
    this._prepareDefaultMenu()
  }

  _prepareDefaultMenu() {
    let homeMenu = DomUtil.create('li', 'menu-item', this._ulEl)
    homeMenu.innerHTML = '飞到默认位置'
    let self = this
    homeMenu.onclick = () => {
      self._viewer.delegate.camera.flyHome(0)
      self.hide()
    }
  }

  _rightclickHandler(e) {
    if (e && e.position && this._enable && this._updateWindowCoord) {
      this._updateWindowCoord(
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          this._viewer.delegate.scene,
          e.position
        )
      )
    }
  }

  _clickHandler(e) {
    this.hide()
  }

  _updateWindowCoord(windowCoord) {
    this._wrapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(windowCoord.x)}px,${Math.round(
      windowCoord.y
    )}px, 0);
    `
  }

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
    let menu = DomUtil.create('li', 'menu-item')
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
