/*
 * @Author: Caven
 * @Date: 2020-01-02 16:42:03
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 10:19:02
 */

import Cesium from '@/namespace'
import Layer from './Layer'

DC.VectorLayer = class extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.CustomDataSource(id)
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.VECTOR
  }

  _addCallback(viewer) {
    this._viewer = viewer
    this._viewer.delegate.dataSources.add(this._delegate)
    this._state = DC.LayerState.ADDED
  }

  _removeCallback() {
    if (this._viewer) {
      this._cache = {}
      this._delegate.removeAll()
      this._viewer.delegate.dataSources.remove(this._delegate)
      this._state = DC.LayerState.REMOVED
    }
  }

  clear() {
    this._cache = {}
    this._delegate.removeAll()
    this._state = DC.LayerState.CLEARED
    return this
  }
}
