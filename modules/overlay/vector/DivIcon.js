/**
 * @Author: Caven
 * @Date: 2020-02-12 21:46:22
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { DomUtil, Util } from '@dc-modules/utils'
import { MouseEventType } from '@dc-modules/event'
import { isBetween } from '@dc-modules/math'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class DivIcon extends Overlay {
  constructor(position, content) {
    super()
    this._delegate = DomUtil.create('div', 'div-icon')
    this._position = Parse.parsePosition(position)
    this._delegate.setAttribute('id', this._id)
    Util.merge(this._delegate.style, {
      position: 'absolute',
      top: '0',
      left: '0'
    })
    this.content = content
    this.type = Overlay.getOverlayType('div_icon')
    this._state = State.INITIALIZED
  }

  set show(show) {
    this._show = show
    this._delegate.style.visibility = this._show ? 'visible' : 'hidden'
    return this
  }

  get show() {
    return this._show
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    return this
  }

  get position() {
    return this._position
  }

  set content(content) {
    if (content && typeof content === 'string') {
      this._delegate.innerHTML = content
    } else if (content && content instanceof Element) {
      while (this._delegate.hasChildNodes()) {
        this._delegate.removeChild(this._delegate.firstChild)
      }
      this._delegate.appendChild(content)
    }
    return this
  }

  get content() {
    return this._delegate.childNodes || []
  }

  /**
   * Updates style
   * @param style
   * @param distance
   * @private
   */
  _updateStyle(style, distance) {
    let translate3d = 'translate3d(0,0,0)'
    if (style.transform) {
      let x = style.transform.x - this._delegate.offsetWidth / 2
      let y = style.transform.y - this._delegate.offsetHeight / 2
      translate3d = `translate3d(${Math.round(x)}px,${Math.round(y)}px, 0)`
    }

    let scale3d = 'scale3d(1,1,1)'
    let scaleByDistance = this._style.scaleByDistance
    if (distance && scaleByDistance) {
      let nearValue = scaleByDistance.nearValue
      let farValue = scaleByDistance.farValue
      let f = distance / scaleByDistance.far
      if (distance < scaleByDistance.near) {
        scale3d = `scale3d(${nearValue},${nearValue},1)`
      } else if (distance > scaleByDistance.far) {
        scale3d = `scale3d(${farValue},${farValue},1)`
      } else {
        let scale = farValue + f * (nearValue - farValue)
        scale3d = `scale3d(${scale},${scale},1)`
      }
    }

    let distanceDisplayCondition = this._style.distanceDisplayCondition
    if (distance && distanceDisplayCondition) {
      this.show =
        this._show &&
        isBetween(
          distance,
          distanceDisplayCondition.near,
          distanceDisplayCondition.far
        )
    }
    this._delegate.style.transform = `${translate3d} ${scale3d}`
  }

  /**
   *
   * @param layer
   * @returns {boolean}
   * @private
   */
  _onAdd(layer) {
    this._layer = layer
    this._layer.delegate.appendChild(this._delegate)
    this._delegate.addEventListener('click', () => {
      this._overlayEvent.fire(MouseEventType.CLICK, {
        layer: layer,
        overlay: this,
        position: Transform.transformWGS84ToCartesian(this._position)
      })
    })
    this._state = State.ADDED
  }

  /**
   *
   * @private
   */
  _onRemove() {
    if (this._layer) {
      this._layer.delegate.removeChild(this._delegate)
      this._state = State.REMOVED
    }
  }

  /**
   * Sets text
   * @param text
   * @param textStyle
   * @returns {DivIcon}
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets style
   * @param style
   * @returns {DivIcon}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    this._style.className &&
      DomUtil.addClass(this._delegate, this._style.className)
    return this
  }

  /**
   * Parse from entity
   * @param entity
   * @param content
   * @returns {DivIcon}
   */
  static fromEntity(entity, content) {
    let divIcon
    let now = Cesium.JulianDate.now()
    let position = Transform.transformCartesianToWGS84(
      entity.position.getValue(now)
    )
    divIcon = new DivIcon(position, content)
    if (entity.billboard) {
      divIcon.attr = {
        ...entity?.properties?.getValue(now)
      }
    }
    return divIcon
  }
}

Overlay.registerType('div_icon')

export default DivIcon
