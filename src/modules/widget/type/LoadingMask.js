/**
 * @Author: Liquid
 * @Date: 2021-03-02 13:38:48
 */

import Widget from '../Widget'
import State from '../../state/State'
import { DomUtil } from '../../utils'

class LoadingMask extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget loading-mask')
    this._state = State.INITIALIZED
  }

  get type() {
    return Widget.getWidgetType('loading_mask')
  }

  /**
   *
   * @private
   */
  _installHook() {
    Object.defineProperty(this._viewer, 'loadingMask', {
      value: this,
      writable: false,
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
