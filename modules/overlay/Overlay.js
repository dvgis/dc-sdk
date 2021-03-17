/**
 * @Author: Caven
 * @Date: 2020-01-03 12:18:17
 */

import State from '@dc-modules/state/State'
import { Util } from '@dc-modules/utils'
import { OverlayEventType, OverlayEvent } from '@dc-modules/event'
import OverlayType from './OverlayType'

class Overlay {
  constructor() {
    this._id = Util.uuid()
    this._bid = Util.uuid() // Business id
    this._delegate = undefined
    this._layer = undefined
    this._state = undefined
    this._show = true
    this._style = {}
    this._attr = {}
    this._allowDrillPicking = false
    this._contextMenu = []
    this._overlayEvent = new OverlayEvent()
    this.type = undefined
    this.on(OverlayEventType.ADD, this._onAdd, this)
    this.on(OverlayEventType.REMOVE, this._onRemove, this)
  }

  get overlayId() {
    return this._id
  }

  set id(id) {
    this._bid = id
    return this
  }

  get id() {
    return this._bid
  }

  set show(show) {
    this._show = show
    this._delegate && (this._delegate.show = this._show)
    return this
  }

  get show() {
    return this._show
  }

  set attr(attr) {
    this._attr = attr
    return this
  }

  get attr() {
    return this._attr
  }

  set allowDrillPicking(allowDrillPicking) {
    this._allowDrillPicking = allowDrillPicking
    return this
  }

  get allowDrillPicking() {
    return this._allowDrillPicking
  }

  get overlayEvent() {
    return this._overlayEvent
  }

  get delegate() {
    return this._delegate
  }

  get state() {
    return this._state
  }

  set contextMenu(menus) {
    this._contextMenu = menus
    return this
  }

  get contextMenu() {
    return this._contextMenu
  }

  /**
   * The hook for mount layer
   * Subclasses need to be overridden
   * @private
   */
  _mountedHook() {}

  /**
   * The hook for added
   * @returns {boolean}
   * @private
   */
  _addedHook() {
    if (!this._delegate) {
      return false
    }
    this._delegate.layerId = this._layer?.layerId
    this._delegate.overlayId = this._id
  }

  /**
   * The hook for removed
   * Subclasses need to be overridden
   * @private
   */
  _removedHook() {}

  /**
   * Add handler
   * @param layer
   * @private
   */
  _onAdd(layer) {
    if (!layer) {
      return
    }
    this._layer = layer
    this._mountedHook && this._mountedHook()
    // for Entity
    if (this._layer?.delegate?.entities && this._delegate) {
      this._layer.delegate.entities.add(this._delegate)
    } else if (this._layer?.delegate?.add && this._delegate) {
      // for Primitive
      this._layer.delegate.add(this._delegate)
    }
    this._addedHook && this._addedHook()
    this._state = State.ADDED
  }

  /**
   * Remove handler
   * @private
   */
  _onRemove() {
    if (!this._layer || !this._delegate) {
      return
    }
    // for Entity
    if (this._layer?.delegate?.entities) {
      this._layer.delegate.entities.remove(this._delegate)
    } else if (this._layer?.delegate?.remove) {
      // for Primitive
      this._layer.delegate.remove(this._delegate)
    }
    this._removedHook && this._removedHook()
    this._state = State.REMOVED
  }

  /**
   * Sets Text with Style
   * @param text
   * @param textStyle
   * @returns {Overlay}
   */
  setLabel(text, textStyle) {
    this._delegate &&
      (this._delegate.label = {
        ...textStyle,
        text: text
      })
    return this
  }

  /**
   * Sets style
   * @param style
   * @returns {Overlay}
   */
  setStyle(style) {
    return this
  }

  /**
   * Removes from layer
   * @returns {Overlay}
   */
  remove() {
    if (this._layer) {
      this._layer.removeOverlay(this)
    }
    return this
  }

  /**
   * adds to layer
   * @param layer
   * @returns {Overlay}
   */
  addTo(layer) {
    if (layer && layer.addOverlay) {
      layer.addOverlay(this)
    }
    return this
  }

  /**
   * Subscribe event
   * @param type
   * @param callback
   * @param context
   * @returns {Overlay}
   */
  on(type, callback, context) {
    this._overlayEvent.on(type, callback, context || this)
    return this
  }

  /**
   * Unsubscribe event
   * @param type
   * @param callback
   * @param context
   * @returns {Overlay}
   */
  off(type, callback, context) {
    this._overlayEvent.off(type, callback, context || this)
    return this
  }

  /**
   * Trigger subscription event
   * @param type
   * @param params
   * @returns {Overlay}
   */
  fire(type, params) {
    this._overlayEvent.fire(type, params)
    return this
  }

  /**
   *
   * @param type
   */
  static registerType(type) {
    if (type) {
      OverlayType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   *
   * @param type
   * @returns {*|undefined}
   */
  static getOverlayType(type) {
    return OverlayType[type.toLocaleUpperCase()] || undefined
  }
}

export default Overlay
