/**
 * @Author: Caven
 * @Date: 2020-08-27 19:50:32
 */

import { Util } from '@dc-modules/utils'
import State from '@dc-modules/state/State'
import { LayerGroupEventType, LayerGroupEvent } from '@dc-modules/event'
import Layer from './Layer'

class LayerGroup {
  constructor(id) {
    this._id = id || Util.uuid()
    this._cache = {}
    this._show = true
    this._viewer = undefined
    this._layerGroupEvent = new LayerGroupEvent()
    this._layerGroupEvent.on(LayerGroupEventType.ADD, this._onAdd, this)
    this._layerGroupEvent.on(LayerGroupEventType.REMOVE, this._onRemove, this)
    this.type = Layer.getLayerType('layer_group')
    this._state = State.INITIALIZED
  }

  get id() {
    return this._id
  }

  set show(show) {
    this._show = show
    Object.keys(this._cache).forEach(key => {
      this._cache[key].show = this._show
    })
  }

  get show() {
    return this._show
  }

  get layerGroupEvent() {
    return this._layerGroupEvent
  }

  get state() {
    return this._state
  }

  /**
   *
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
    Object.keys(this._cache).forEach(key => {
      this._viewer.addLayer(this._cache[key])
    })
    this._state = State.ADDED
  }

  /**
   *
   * @private
   */
  _onRemove() {
    Object.keys(this._cache).forEach(key => {
      this._viewer && this._viewer.removeLayer(this._cache[key])
    })
    this._cache = {}
    this._state = State.REMOVED
  }

  /**
   * Adds a layer
   * @param layer
   * @returns {LayerGroup}
   */
  addLayer(layer) {
    if (!Object(this._cache).hasOwnProperty(layer.id)) {
      this._cache[layer.id] = layer
      this._viewer && this._viewer.addLayer(layer)
    }
    return this
  }

  /**
   * Removes a layer
   * @param layer
   * @returns {LayerGroup}
   */
  removeLayer(layer) {
    if (Object(this._cache).hasOwnProperty(layer.id)) {
      this._viewer && this._viewer.removeLayer(layer)
      delete this._cache[layer.id]
    }
    return this
  }

  /**
   * Returns a layer by id
   * @param id
   * @returns {*|undefined}
   */
  getLayer(id) {
    return this._cache[id] || undefined
  }

  /**
   * Returns all layers
   * @returns {[]}
   */
  getLayers() {
    let result = []
    Object.keys(this._cache).forEach(key => {
      result.push(this._cache[key])
    })
    return result
  }

  /**
   * Adds to the viewer
   * @param viewer
   * @returns {LayerGroup}
   */
  addTo(viewer) {
    if (viewer && viewer.addLayerGroup) {
      viewer.addLayerGroup(this)
    }
    return this
  }

  /**
   *
   * @returns {LayerGroup}
   */
  remove() {
    this._viewer && this._viewer.removeLayerGroup(this)
    return this
  }
}

Layer.registerType('layer_group')

export default LayerGroup
