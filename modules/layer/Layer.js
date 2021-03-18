/**
 * @Author: Caven
 * @Date: 2020-01-03 09:38:21
 */

import { Cesium } from '@dc-modules/namespace'
import { Util } from '@dc-modules/utils'
import State from '@dc-modules/state/State'
import { LayerEventType, OverlayEventType, LayerEvent } from '@dc-modules/event'
import LayerType from './LayerType'

class Layer {
  constructor(id) {
    this._id = Util.uuid()
    this._bid = id || Util.uuid()
    this._delegate = undefined
    this._viewer = undefined
    this._state = undefined
    this._show = true
    this._cache = {}
    this._attr = {}
    this._layerEvent = new LayerEvent()
    this._layerEvent.on(LayerEventType.ADD, this._onAdd, this)
    this._layerEvent.on(LayerEventType.REMOVE, this._onRemove, this)
    this._state = undefined
    this.type = undefined
  }

  get layerId() {
    return this._id
  }

  get id() {
    return this._bid
  }

  get delegate() {
    return this._delegate
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

  get state() {
    return this._state
  }

  /**
   * The hook for added
   * @private
   */
  _addedHook() {}

  /**
   * The hook for removed
   * @private
   */
  _removedHook() {}

  /**
   * The layer added callback function
   * Subclasses need to be overridden
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
    if (!this._delegate) {
      return
    }
    if (this._delegate instanceof Cesium.PrimitiveCollection) {
      this._viewer.scene.primitives.add(this._delegate)
    } else {
      this._viewer.dataSources.add(this._delegate)
    }
    this._addedHook && this._addedHook()
    this._state = State.ADDED
  }

  /**
   * The layer added callback function
   * Subclasses need to be overridden
   * @private
   */
  _onRemove() {
    if (!this._delegate) {
      return
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
      this._state = State.REMOVED
    }
  }

  /**
   * The layer add overlay
   * @param overlay
   * @private
   */
  _addOverlay(overlay) {
    if (
      overlay &&
      overlay.overlayEvent &&
      !this._cache.hasOwnProperty(overlay.overlayId)
    ) {
      this._cache[overlay.overlayId] = overlay
      this._delegate && overlay.overlayEvent.fire(OverlayEventType.ADD, this)
      if (this._state === State.CLEARED) {
        this._state = State.ADDED
      }
    }
  }

  /**
   * The layer remove overlay
   * @param overlay
   * @private
   */
  _removeOverlay(overlay) {
    if (
      overlay &&
      overlay.overlayEvent &&
      this._cache.hasOwnProperty(overlay.overlayId)
    ) {
      this._delegate && overlay.overlayEvent.fire(OverlayEventType.REMOVE, this)
      delete this._cache[overlay.overlayId]
    }
  }

  /**
   * Add overlay
   * @param overlay
   * @returns {Layer}
   */
  addOverlay(overlay) {
    this._addOverlay(overlay)
    return this
  }

  /**
   * Add overlays
   * @param overlays
   * @returns {Layer}
   */
  addOverlays(overlays) {
    if (Array.isArray(overlays)) {
      overlays.forEach(item => {
        this._addOverlay(item)
      })
    }
    return this
  }

  /**
   * Remove overlay
   * @param overlay
   * @returns {Layer}
   */
  removeOverlay(overlay) {
    this._removeOverlay(overlay)
    return this
  }

  /**
   * Returns the overlay by overlayId
   * @param overlayId
   * @returns {*|undefined}
   */
  getOverlay(overlayId) {
    return this._cache[overlayId] || undefined
  }

  /**
   * Returns the overlay by bid
   * @param id
   * @returns {any}
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
   * Returns the overlays by attrName and AttrVal
   * @param attrName
   * @param attrVal
   * @returns {[]}
   */
  getOverlaysByAttr(attrName, attrVal) {
    let result = []
    this.eachOverlay(item => {
      if (item.attr[attrName] === attrVal) {
        result.push(item)
      }
    }, this)
    return result
  }

  /**
   * Iterate through each overlay and pass it as an argument to the callback function
   * @param method
   * @param context
   * @returns {Layer}
   */
  eachOverlay(method, context) {
    Object.keys(this._cache).forEach(key => {
      method && method.call(context || this, this._cache[key])
    })
    return this
  }

  /**
   * Returns all overlays
   * @returns {[]}
   */
  getOverlays() {
    let result = []
    Object.keys(this._cache).forEach(key => {
      result.push(this._cache[key])
    })
    return result
  }

  /**
   * Clears all overlays
   * Subclasses need to be overridden
   */
  clear() {}

  /**
   * Removes from the viewer
   */
  remove() {
    if (this._viewer) {
      this._viewer.removeLayer(this)
    }
  }

  /**
   * Adds to the viewer
   * @param viewer
   * @returns {Layer}
   */
  addTo(viewer) {
    if (viewer && viewer.addLayer) {
      viewer.addLayer(this)
    }
    return this
  }

  /**
   * sets the style, the style will apply to every overlay of the layer
   * Subclasses need to be overridden
   * @param style
   */
  setStyle(style) {}

  /**
   * Registers Type
   * @param type
   */
  static registerType(type) {
    if (type) {
      LayerType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   * Returns type
   * @param type
   * @returns {*|undefined}
   */
  static getLayerType(type) {
    return LayerType[type.toLocaleUpperCase()] || undefined
  }
}

export default Layer
