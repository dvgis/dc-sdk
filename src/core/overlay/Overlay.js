/*
 * @Author: Caven
 * @Date: 2020-01-03 12:18:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-25 09:07:16
 */
import { Util } from '../utils'
import { OverlayEventType, OverlayEvent } from '../event'
import State from '../state/State'
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
    this._overlayEvent = new OverlayEvent()
    this.type = undefined
    this.on(OverlayEventType.ADD, this._addHandler, this)
    this.on(OverlayEventType.REMOVE, this._removeHandler, this)
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

  get overlayEvent() {
    return this._overlayEvent
  }

  get delegate() {
    return this._delegate
  }

  get state() {
    return this._state
  }

  /**
   * The hook for added
   */
  _addedHook() {
    if (!this._delegate) {
      return false
    }
    this._delegate.layer = this._layer
    this._delegate.overlayId = this._id
  }

  /***
   * The hook for mounted
   */
  _mountedHook() {}

  /**
   * The hook for removed
   */
  _removedHook() {}

  /**
   *
   * @param {*} layer
   */
  _addHandler(layer) {
    if (!layer) {
      return false
    }
    this._layer = layer
    this._mountedHook && this._mountedHook()
    if (this._layer?.delegate?.entities) {
      this._layer.delegate.entities.add(this._delegate)
      this._addedHook && this._addedHook()
      this._state = State.ADDED
    }
  }

  /**
   *
   */
  _removeHandler() {
    if (this._layer?.delegate?.entities) {
      this._layer.delegate.entities.remove(this._delegate)
      this._removedHook && this._removedHook()
      this._state = State.REMOVED
    }
  }

  /**
   * set overlay label
   * @param {*} text
   * @param {*} textStyle
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
   *
   * @param {*} style
   * set overlay style
   */
  setStyle(style) {
    return this
  }

  /**
   * Overlay remove
   */
  remove() {
    if (this._layer) {
      this._layer.removeOverlay(this)
    }
    return this
  }

  /**
   *
   * Overlay add to layer
   * @param {*} layer
   *
   */
  addTo(layer) {
    if (layer && layer.addOverlay) {
      layer.addOverlay(this)
    }
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  on(type, callback, context) {
    this._overlayEvent.on(type, callback, context || this)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  off(type, callback, context) {
    this._overlayEvent.off(type, callback, context || this)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} param
   */
  fire(type, params) {
    this._overlayEvent.fire(type, params)
    return this
  }

  /**
   *
   * @param {*} type
   */
  static registerType(type) {
    if (type) {
      OverlayType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   *
   * @param {*} type
   */
  static getOverlayType(type) {
    return OverlayType[type.toLocaleUpperCase()] || undefined
  }
}

export default Overlay
