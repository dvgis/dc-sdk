/*
 * @Author: Caven
 * @Date: 2020-01-03 12:18:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-01 11:57:48
 */
import OverlayEvent from '../event/OverlayEvent'
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
    this._overlayEvent.on(DC.OverlayEventType.ADD, this._addCallback, this)
    this._overlayEvent.on(DC.OverlayEventType.REMOVE, this._removeCallback, this)
    this.type = undefined
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

  /***
   *
   */
  _prepareDelegate() {}

  /**
   *
   * @param {*} layer
   */
  _addCallback(layer) {
    this._layer = layer
    this._prepareDelegate()
    if (this._layer && this._layer.delegate && this._layer.delegate.entities) {
      this._layer.delegate.entities.add(this._delegate)
      this._state = DC.OverlayState.ADDED
    }
  }

  /**
   *
   */
  _removeCallback() {
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
      this._layer.layerEvent.fire(DC.LayerEventType.REMOVE_OVERLAY, this)
    }
  }
}

export default Overlay
