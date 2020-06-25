/*
 * @Author: Caven
 * @Date: 2020-02-01 11:59:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-25 08:55:22
 */

import { Util } from '../../utils'
import Transform from '../../transform/Transform'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import Overlay from '../Overlay'

const { Cesium } = DC.Namespace

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
   *
   * @param {*} style
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
   *
   * @param {*} entity
   */
  static fromEntity(entity) {
    let position = Transform.transformCartesianToWGS84(
      entity.position.getValue(Cesium.JulianDate.now())
    )
    let label = undefined
    if (entity.billboard) {
      label = new Label(position, item.name)
      label.attr = {
        ...entity.properties.getValue(Cesium.JulianDate.now())
      }
    }
    return label
  }
}

Overlay.registerType('label')

export default Label
