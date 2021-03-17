/**
 * @Author: Caven
 * @Date: 2020-02-01 11:59:28
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Label extends Overlay {
  constructor(position, text) {
    super()
    this._delegate = new Cesium.Entity({ label: {} })
    this._position = Parse.parsePosition(position)
    this._text = text
    this.type = Overlay.getOverlayType('label')
    this._state = State.INITIALIZED
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
    this._delegate.label.text = this._text
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
   * @returns {Label}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['text']
    this._style = style
    Util.merge(this._delegate.label, this._style)
    return this
  }

  /**
   * Parse from entity
   * @param entity
   * @returns {any}
   */
  static fromEntity(entity) {
    let now = Cesium.JulianDate.now()
    let position = Transform.transformCartesianToWGS84(
      entity.position.getValue(now)
    )
    let label = undefined
    if (entity.billboard) {
      label = new Label(position, entity.name)
      label.attr = {
        ...entity?.properties?.getValue(now)
      }
    }
    return label
  }
}

Overlay.registerType('label')

export default Label
