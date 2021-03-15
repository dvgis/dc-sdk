/**
 * @Author: Liquid
 * @Date: 2021-03-02 13:38:48
 */

import State from '@dc-modules/state/State'
import { DomUtil } from '@dc-modules/utils'
import Widget from '../Widget'

class LoadingMask extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-loading-mask')
    this.type = Widget.getWidgetType('loading_mask')
    this._state = State.INITIALIZED
  }

  /**
   *
   * @private
   */
  _installHook() {
    Object.defineProperty(this._viewer, 'loadingMask', {
      value: this,
      writable: false
    })
  }

  /**
   *
   * @private
   */
  _mountContent() {
    let el = DomUtil.parseDom(
      `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    `,
      true,
      'loading'
    )
    this._wrapper.appendChild(el)
    this._ready = true
  }
}

Widget.registerType('loading_mask')

export default LoadingMask
