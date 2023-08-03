/**
 * @Author : Caven Chen
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
    const self = this
    Object.defineProperty(this._viewer, 'loadingMask', {
      get() {
        return self
      },
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
