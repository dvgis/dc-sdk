/*
 * @Author: Caven
 * @Date: 2019-12-31 17:32:01
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-05 23:38:09
 */
import Cesium from '@/namespace'
import Widget from './Widget'

class ContextMenu extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-context-menu')
    this._ulEl = DC.DomUtil.create('ul', 'menu-list', this._wapper)
    this.type = DC.WidgetType.CONTEXT_MENU
  }

  _installHook() {
    if (this._viewer) {
      this._viewer.on(
        DC.MouseEventType.RIGHT_CLICK,
        this._rightclickHandler,
        this
      )
      this._viewer.on(DC.MouseEventType.CLICK, this._clickHandler, this)
    }
    this._prepareDefaultMenu()
  }

  _prepareDefaultMenu() {
    let homeMenu = DC.DomUtil.create('li', 'menu-item', this._ulEl)
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
    this._wapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(windowCoord.x)}px,${Math.round(
      windowCoord.y
    )}px, 0);
    `
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
    let menu = DC.DomUtil.create('li', 'menu-item')
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

DC.WidgetType.CONTEXT_MENU = 'contextmenu'

export default ContextMenu
