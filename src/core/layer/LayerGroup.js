/**
 * @Author: Caven
 * @Date: 2020-08-27 19:50:32
 */

import Util from '../../core/utils/Util'
import State from '../state/State'
import Layer from './Layer'
import { LayerGroupEventType, LayerGroupEvent } from '../event'

class LayerGroup {
  constructor(id) {
    this._id = id || Util.uuid()
    this._cache = {}
    this._show = true
    this._viewer = undefined
    this._layerEvent = new LayerGroupEvent()
    this._layerEvent.on(LayerGroupEventType.ADD, this._addHandler, this)
    this._layerEvent.on(LayerGroupEventType.REMOVE, this._removeHandler, this)
    this.type = Layer.registerType('layer-group')
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

  get layerEvent() {
    return this._layerEvent
  }

  get state() {
    return this._state
  }

  /**
   *
   * @param viewer
   * @private
   */
  _addHandler(viewer) {
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
  _removeHandler() {
    Object.keys(this._cache).forEach(key => {
      this._viewer && this._viewer.remove(this._cache[key])
    })
    this._cache = {}
    this._state = State.REMOVED
  }

  /**
   *
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
   *
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
   *
   * @param id
   * @returns {*|undefined}
   */
  getLayer(id) {
    return this._cache[id] || undefined
  }

  /**
   *
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
   *
   * @returns {LayerGroup}
   */
  remove() {
    this._viewer && this._viewer.removeLayer(this)
    return this
  }
}

Layer.registerType('layer-group')

export default LayerGroup
