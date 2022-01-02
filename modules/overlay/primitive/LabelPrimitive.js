/**
 * @Author: Caven
 * @Date: 2021-06-03 22:28:49
 */

import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class LabelPrimitive extends Overlay {
  constructor(position, text) {
    super()
    this._position = Parse.parsePosition(position)
    this._text = text
    this._delegate = {
      position: undefined,
      text: undefined
    }
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('label_primitive')
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.position = Transform.transformWGS84ToCartesian(
      this._position
    )
    return this
  }

  get position() {
    return this._position
  }

  set text(text) {
    this._text = text
    this._delegate.text = this._text
    return this
  }

  get text() {
    return this._text
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position

    /**
     *  initialize the Overlay parameter
     */
    this.text = this._text
  }

  /**
   *
   * @param {*} text
   * @param {*} textStyle
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets Style
   * @param style
   * @returns {LabelPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['position'] && delete style['text']
    Util.merge(this._style, style)
    Util.merge(this._delegate, style)
    return this
  }
}

Overlay.registerType('label_primitive')

export default LabelPrimitive
