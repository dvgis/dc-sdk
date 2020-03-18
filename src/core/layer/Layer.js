/*
 * @Author: Caven
 * @Date: 2020-01-03 09:38:21
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-18 22:21:57
 */
import Cesium from '@/namespace'
import { LayerEvent } from '@/core/event'

class Layer {
  constructor(id) {
    this._id = id || DC.Util.uuid()
    this._delegate = undefined
    this._viewer = undefined
    this._state = undefined
    this._show = true
    this._cache = {}
    this._attr = {}
    this._style = {}
    this._layerEvent = new LayerEvent()
    this._layerEvent.on(DC.LayerEventType.ADD, this._addCallback, this)
    this._layerEvent.on(DC.LayerEventType.REMOVE, this._removeCallback, this)
    this._layerEvent.on(
      DC.LayerEventType.ADD_OVERLAY,
      this._addOverlayCallback,
      this
    )
    this._layerEvent.on(
      DC.LayerEventType.REMOVE_OVERLAY,
      this._removeOverlayCallback,
      this
    )
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

  /**
   *
   * @param {*} veiwer
   * the layer added callback function
   * subclasses need to be overridden
   */
  _addCallback(viewer) {
    this._viewer = viewer
    if (!this._delegate) {
      return
    }
    if (this._delegate instanceof Cesium.PrimitiveCollection) {
      this._viewer.delegate.scene.primitives.add(this._delegate)
    } else {
      this._viewer.delegate.dataSources.add(this._delegate)
    }
    this._state = DC.LayerState.ADDED
  }

  /**
   * the layer removed callback function
   * subclasses need to be overridden
   */
  _removeCallback() {
    if (!this._delegate) {
      return
    }
    if (this._viewer) {
      this._cache = {}
      if (this._delegate instanceof Cesium.PrimitiveCollection) {
        this._delegate.removeAll()
        this._viewer.delegate.scene.primitives.remove(this._delegate)
      } else if (this._delegate.then) {
        this._delegate.then(dataSource => {
          dataSource.entities.removeAll()
        })
        this._viewer.delegate.dataSources.remove(this._delegate)
      } else {
        this._delegate.entities && this._delegate.entities.removeAll()
        this._viewer.delegate.dataSources.remove(this._delegate)
      }
      this._state = DC.LayerState.REMOVED
    }
  }

  /**
   *
   * @param {*} overlay
   * the layer add overlay callback function
   */
  _addOverlayCallback(overlay) {
    if (
      overlay &&
      overlay.overlayEvent &&
      overlay.state !== DC.OverlayState.ADDED
    ) {
      overlay.overlayEvent.fire(DC.OverlayEventType.ADD, this)
      this._cache[overlay.id] = overlay
      if (this._state === DC.LayerState.CLEARED) {
        this._state = DC.LayerState.ADDED
      }
    }
  }

  /**
   *
   * @param {*} overlay
   * the layer remove overlay callback function
   */
  _removeOverlayCallback(overlay) {
    if (
      overlay &&
      overlay.overlayEvent &&
      overlay.state !== DC.OverlayState.REMOVED
    ) {
      overlay.overlayEvent.fire(DC.OverlayEventType.REMOVE, this)
      delete this._cache[overlay.id]
    }
  }

  /**
   *
   * @param {*} overlay
   * the layer add overlay
   */
  addOverlay(overlay) {
    this._addOverlayCallback(overlay)
    return this
  }

  /**
   *
   * @param {*} overlay
   */
  removeOverlay(overlay) {
    this._removeOverlayCallback(overlay)
    return this
  }

  /**
   *
   * @param {*} id
   */
  getOverlay(id) {
    return this._cache[id] || undefined
  }

  /**
   *
   * @param {*} atrrName
   * @param {*} attrVal
   */
  getOverlayByAttr(atrrName, attrVal) {
    let overlay = undefined
    for (let key in this._cache) {
      if (this._cache[key].attr[atrrName] === attrVal) {
        overlay = this._cache[key]
      }
    }
    return overlay
  }

  /**
   *
   * @param {*} method
   * @param {*} context
   */
  eachOverlay(method, context) {
    for (let key in this._cache) {
      method.call(context, this._cache[key])
    }
    return this
  }

  /**
   *
   */
  clear() {}

  /**
   *
   */
  remove() {
    if (this._viewer) {
      this._viewer.removeLayer(this)
    }
  }

  /**
   *
   * @param {*} viewer
   */
  addToViewer(viewer) {
    if (viewer && viewer.addLayer) {
      viewer.addLayer(this)
    }
    return this
  }
  /**
   *
   * @param {*} Style
   */
  setStyle(Style) {}
}

export default Layer
