/*
 * @Author: Caven
 * @Date: 2020-01-03 12:18:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 19:04:33
 */
import { OverlayEvent } from '@/core/event'

class Overlay {
  constructor() {
    this._id = DC.Util.uuid()
    this._layer = undefined
    this._state = undefined
    this._delegate = undefined
    this._show = true
    this._style = {}
    this._attr = {}
    this._overlayEvent = new OverlayEvent()
    this.type = undefined
    this.on(DC.OverlayEventType.ADD, this._addHandler, this)
    this.on(DC.OverlayEventType.REMOVE, this._removeHandler, this)
  }

  get id() {
    return this._id
  }

  set show(show) {
    this._show = show
    this._delegate && (this._delegate.show = this._show)
  }

  get show() {
    return this._show
  }

  set attr(attr) {
    this._attr = attr
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
    if (this._delegate) {
      this._delegate.layer = this._layer
      this._delegate.overlayId = this._id
    }
  }

  /***
   *
   */
  _mountedHook() {}

  /**
   *
   * @param {*} layer
   */
  _addHandler(layer) {
    this._layer = layer
    this._mountedHook && this._mountedHook()
    if (this._layer && this._layer.delegate && this._layer.delegate.entities) {
      this._layer.delegate.entities.add(this._delegate)
      this._addedHook && this._addedHook()
      this._state = DC.OverlayState.ADDED
    }
  }

  /**
   *
   */
  _removeHandler() {
    if (this._layer && this._layer.delegate && this._layer.delegate.entities) {
      this._layer.delegate.entities.remove(this._delegate)
      this._state = DC.OverlayState.REMOVED
    }
  }

  /**
   *
   * @param {*} style
   * set overlay style
   */
  setStyle(style) {}

  /**
   * 覆盖物删除
   */
  remove() {
    if (this._layer) {
      this._layer.removeOverlay(this)
    }
  }

  /**
   *
   * @param {*} layer
   */
  addToLayer(layer) {
    if (layer) {
      layer.addOverlay(this)
    }
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
}

export default Overlay
