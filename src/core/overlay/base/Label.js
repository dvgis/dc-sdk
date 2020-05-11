/*
 * @Author: Caven
 * @Date: 2020-02-01 11:59:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:38:18
 */

import { Util } from '../../utils'
import Transform from '../../transform/Transform'
import State from '../../state/State'
import Overlay from '../Overlay'

const { Cesium } = DC.Namespace

class Label extends Overlay {
  constructor(position, text) {
    if (!Util.checkPosition(position)) {
      throw new Error('Label: the position invalid')
    }
    super()
    this._position = position
    this._text = text
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('label')
    this._state = State.INITIALIZED
  }

  set position(position) {
    if (!Util.checkPosition(position)) {
      throw new Error('Label: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set text(text) {
    this._text = text
  }

  get text() {
    return this._text
  }

  _mountedHook() {
    /**
     * set the location
     */
    this._delegate.position = new Cesium.CallbackProperty(time => {
      return Transform.transformWGS84ToCartesian(this._position)
    })

    /**
     *  initialize the Overlay parameter
     */
    this._delegate.label = {
      ...this._style,
      text: new Cesium.CallbackProperty(time => {
        return this._text
      })
    }
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    this._delegate.label && Util.merge(this._delegate.label, this._style)
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
