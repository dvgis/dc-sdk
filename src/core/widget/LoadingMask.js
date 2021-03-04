/**
 * @Author: Liquid
 * @Date: 2021-03-02 13:38:48
 */
import { DomUtil } from '../utils'
import State from '../state/State'
import Widget from './Widget'

class LoadlingModule extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create(
      'div',
      'loading-container'
    )
    this.type = Widget.getWidgetType('loadlingMask')
    this._state = State.INITIALIZED
    this.addLoading()
  }

  /**
   *
   * @private
   */
  _installHook() {
    Object.defineProperty(this._viewer, 'loadlingMask', {
      value: this,
      writable: false
    })
  }

  set enable(enable) {
    if (this._enable === enable) {
      return this
    }
    enable ? this.show() : this.hide()
    this._enable = enable
    this._state = this._enable ? State.ENABLED : State.DISABLED
    this._enableHook && this._enableHook()
    return this
  }

  _enableHook() {
    !this._wrapper.parentNode &&
      this._viewer &&
      this._viewer.dcContainer.appendChild(this._wrapper)
  }

  addLoading() {
    let htmlStr = `
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    this._wrapper.innerHTML = htmlStr
  }

  show() {
    this._wrapper.style.visibility = 'visible'
  }

  hide() {
    this._wrapper.style.visibility = 'hidden'
  }
}

Widget.registerType('loadlingMask')

export default LoadlingModule
