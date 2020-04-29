/*
 * @Author: Caven
 * @Date: 2020-01-03 09:38:21
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-29 21:08:32
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
    this._layerEvent.on(DC.LayerEventType.ADD, this._addHandler, this)
    this._layerEvent.on(DC.LayerEventType.REMOVE, this._removeHandler, this)
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
   * The hook for added
   */
  _addedHook() {}

  /**
   * The hook for removed
   */
  _removedHook() {}

  /**
   *
   * The layer added callback function
   * Subclasses need to be overridden
   * @param {*} veiwer
   *
   */
  _addHandler(viewer) {
    this._viewer = viewer
    if (this._delegate instanceof Cesium.PrimitiveCollection) {
      this._viewer.scene.primitives.add(this._delegate)
    } else {
      this._viewer.dataSources.add(this._delegate)
    }
    this._addedHook && this._addedHook()
    this._state = DC.LayerState.ADDED
  }

  /**
   * The layer removed callback function
   * Subclasses need to be overridden
   */
  _removeHandler() {
    if (!this._delegate) {
      return false
    }
    if (this._viewer) {
      this._cache = {}
      if (this._delegate instanceof Cesium.PrimitiveCollection) {
        this._delegate.removeAll()
        this._viewer.scene.primitives.remove(this._delegate)
      } else if (this._delegate.then) {
        this._delegate.then(dataSource => {
          dataSource.entities.removeAll()
        })
        this._viewer.dataSources.remove(this._delegate)
      } else {
        this._delegate.entities && this._delegate.entities.removeAll()
        this._viewer.dataSources.remove(this._delegate)
      }
      this._removedHook && this._removedHook()
      this._state = DC.LayerState.REMOVED
    }
  }

  /**
   *
   * The layer add overlay function
   * @param {*} overlay
   *
   */
  _addOverlay(overlay) {
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
   * The layer remove overlay function
   * @param {*} overlay
   *
   */
  _removeOverlay(overlay) {
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
   * Add overlay
   * @param {*} overlay
   *
   */
  addOverlay(overlay) {
    this._addOverlay(overlay)
    return this
  }

  /**
   *
   * Add overlays
   * @param {*} overlays
   *
   */
  addOverlays(overlays) {
    if (Array.isArray(overlays)) {
      overlays.forEach(item => {
        this._addOverlay(overlay)
      })
    }
    return this
  }

  /**
   * Remove overlay
   * @param {*} overlay
   */
  removeOverlay(overlay) {
    this._removeOverlay(overlay)
    return this
  }

  /**
   *
   * @param {*} overlayId
   */
  getOverlay(overlayId) {
    return this._cache[overlayId] || undefined
  }

  /**
   *
   * @param {*} id
   */
  getOverlayById(id) {
    let overlay = undefined
    Object.keys(this._cache).forEach(key => {
      if (this._cache[key].id === id) {
        overlay = this._cache[key]
      }
    })
    return overlay
  }

  /**
   *
   * @param {*} atrrName
   * @param {*} attrVal
   */
  getOverlaysByAttr(atrrName, attrVal) {
    let result = []
    Object.keys(this._cache).forEach(key => {
      if (this._cache[key].attr[atrrName] === attrVal) {
        result.push[this._cache[key]]
      }
    })
    return result
  }

  /**
   *
   * @param {*} method
   * @param {*} context
   */
  eachOverlay(method, context) {
    Object.keys(this._cache).forEach(key => {
      method && method.call(context, this._cache[key])
    })
    return this
  }

  /**
   * Get all Overlays
   */
  getOverlays() {
    let result = []
    Object.keys(this._cache).forEach(key => {
      result.push(this._cache[key])
    })
    return result
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
  addTo(viewer) {
    if (viewer && viewer.addLayer) {
      viewer.addLayer(this)
    }
    return this
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {}
}

export default Layer
