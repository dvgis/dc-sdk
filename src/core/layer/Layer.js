/*
 * @Author: Caven
 * @Date: 2020-01-03 09:38:21
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 10:19:08
 */
import LayerEvent from '../event/LayerEvent'

class Layer {
  constructor(id) {
    this._id = id || DC.Util.uuid()
    this._delegate = undefined
    this._viewer = undefined
    this._state = undefined
    this._show = true
    this._cache = {}
    this._attr = {}
    this._layerEvent = new LayerEvent()
    this._layerEvent.on(DC.LayerEventType.ADD, this._addCallback, this)
    this._layerEvent.on(DC.LayerEventType.REMOVE, this._removeCallback, this)
    this._layerEvent.on(DC.LayerEventType.ADD_OVERLAY, this._addOverlayCallback, this)
    this._layerEvent.on(DC.LayerEventType.REMOVE_OVERLAY, this._removeOverlayCallback, this)
    this.type = undefined
  }

  set show(show) {
    this._show = show
    this._delegate && (this._delegate.show = this._show)
  }

  get show() {
    return this._show
  }

  get layerEvent() {
    return this._layerEvent
  }

  set attr(attr) {
    this._attr = attr
  }

  get attr() {
    return this._attr
  }

  get id() {
    return this._id
  }

  get delegate() {
    return this._delegate
  }

  get state() {
    return this._state
  }

  // 子类需要覆盖重写
  _addCallback(veiwer) {}

  // 子类需要覆盖重写
  _removeCallback() {}

  _addOverlayCallback(overlay) {
    if (overlay && overlay.overlayEvent && overlay.state !== DC.OverlayState.ADDED) {
      overlay.overlayEvent.fire(DC.OverlayEventType.ADD, this)
      this._cache[overlay.id] = overlay
    }
  }

  _removeOverlayCallback(overlay) {
    if (overlay && overlay.overlayEvent && overlay.state !== DC.OverlayState.REMOVED) {
      overlay.overlayEvent.fire(DC.OverlayEventType.REMOVE, this)
      delete this._cache[overlay.id]
    }
  }

  addOverlay(overlay) {
    this._addOverlayCallback(overlay)
    return this
  }

  removeOverlay(overlay) {
    this._removeOverlayCallback(overlay)
    return this
  }

  getOverlayByAttr(atrrName, attrVal) {
    let overlay = undefined
    for (let key in this._cache) {
      if (this._cache[key].attr[atrrName] === attrVal) {
        overlay = this._cache[key]
      }
    }
    return overlay
  }

  eachOverlay(method, context) {
    for (let key in this._cache) {
      method.call(context, this._cache[key])
    }
    return this
  }

  // 子类需要覆盖重写
  clear() {}

  remove() {
    if (this._viewer) {
      this._viewer.removeLayer(this)
    }
  }

  addToViewer(viewer) {
    if (viewer) {
      viewer.addLayer(this)
    }
    return this
  }
}

export default Layer
