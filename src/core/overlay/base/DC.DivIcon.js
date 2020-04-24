/*
 * @Author: Caven
 * @Date: 2020-02-12 21:46:22
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-24 11:10:38
 */

import Overlay from '@/core/overlay/Overlay'

DC.DivIcon = class extends Overlay {
  constructor(position, content) {
    if (!DC.Util.checkPosition(position)) {
      throw new Error('DC.DivIcon: the position invalid')
    }
    super()
    this._position = position
    this._delegate = DC.DomUtil.create('div', 'div-icon')
    this._delegate.setAttribute('id', this._id)
    DC.Util.merge(this._delegate.style, {
      position: 'absolute',
      top: '0',
      left: '0'
    })
    this.content = content
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.DIVICON
  }

  set show(show) {
    this._show = show
    this._delegate.style.visibility = this._show ? 'visible' : 'hidden'
  }

  get show() {
    return this._show
  }

  set position(position) {
    if (!DC.Util.checkPosition(position)) {
      throw new Error('DC.DivIcon: the position invalid')
    }
    this._position = position
  }

  get position() {
    return this._position
  }

  set content(content) {
    if (content && typeof content === 'string') {
      this._delegate.innerHTML = content
    } else if (content && content instanceof Element) {
      this._delegate.appendChild(content)
    }
  }

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
      this.show = DC.Math.isBetween(
        distance,
        distanceDisplayCondition.near,
        distanceDisplayCondition.far
      )
    }
    this._delegate.style.transform = `${translate3d} ${scale3d}`
  }

  /**
   *
   * @param {*} layer
   * Overrides parent methods
   */
  _addHandler(layer) {
    this._layer = layer
    this._layer.delegate.appendChild(this._delegate)
    this._delegate.addEventListener('click', e => {
      this._overlayEvent.fire(DC.MouseEventType.CLICK, {
        layer: layer,
        overlay: this,
        position: DC.T.transformWSG84ToCartesian(this._position)
      })
    })
    this._state = DC.OverlayState.ADDED
  }

  /**
   * Overrides parent methods
   */
  _removeHandler() {
    if (this._layer) {
      this._layer.delegate.removeChild(this._delegate)
      this._state = DC.OverlayState.REMOVED
    }
  }

  /**
   *
   * @param {*} name
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    style.className && DC.DomUtil.addClass(this._delegate, style.className)
    return this
  }
}

DC.OverlayType.DIVICON = 'divIcon'
