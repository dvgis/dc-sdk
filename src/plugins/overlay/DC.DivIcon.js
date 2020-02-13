/*
 * @Author: Caven
 * @Date: 2020-02-12 21:46:22
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-13 16:28:20
 */

import Overlay from '../../core/overlay/Overlay'

DC.DivIcon = class extends Overlay {
  constructor(position, content) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    super()
    this._position = position
    this._delegate = DC.DomUtil.create('div', 'div-icon')
    this._delegate.setAttribute('id', this._id)
    this._delegate.style.position = 'absolute'
    this._delegate.style.top = '0'
    this._delegate.style.left = '0'
    if (content && typeof content === 'string') {
      this._delegate.innerHTML = content
    } else if (content && content instanceof Element) {
      this._delegate.appendChild(content)
    }
    this._delegate.addEventListener('click', e => {
      this._overlayEvent.fire(DC.MouseEventType.CLICK, {
        layer: this._layer,
        overlay: this,
        position: DC.T.transformWSG84ToCartesian(this._position)
      })
    })
  }

  set show(show) {
    this._show = show
    this._delegate.style.visibility = this._show ? 'visible' : 'hidden'
  }

  get show() {
    return this._show
  }

  set position(position) {
    this._position = position
  }

  get position() {
    return this._position
  }

  _updateWindowCoord(windowCoord) {
    let x = windowCoord.x - this._delegate.offsetWidth / 2
    let y = windowCoord.y - this._delegate.offsetHeight / 2
    this._delegate.style.transform = `translate3d(${Math.round(
      x
    )}px,${Math.round(y)}px, 0)`
  }

  /**
   *
   * @param {*} layer
   * Overrides parent methods
   */
  _addCallback(layer) {
    this._layer = layer
    this._layer.delegate.appendChild(this._delegate)
    this._state = DC.OverlayState.ADDED
  }

  /**
   * Overrides parent methods
   */
  _removeCallback() {
    if (this._layer) {
      this._layer.delegate.removeChild(this._delegate)
      this._state = DC.OverlayState.REMOVED
    }
  }

  addClass(name) {
    DC.DomUtil.addClass(this._delegate, name)
    return this
  }
}
