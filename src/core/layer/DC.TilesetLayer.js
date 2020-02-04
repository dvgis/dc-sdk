/*
 * @Author: Caven
 * @Date: 2020-01-09 09:16:27
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-02 14:10:48
 */

import Cesium from '@/namespace'
import Layer from './Layer'
/**
 * TilesetLayer is used to add various tileset
 */
DC.TilesetLayer = class extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.PrimitiveCollection()
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.TILESET
  }

  _addCallback(viewer) {
    this._viewer = viewer
    this._viewer.delegate.scene.primitives.add(this._delegate)
    this._state = DC.LayerState.ADDED
  }

  _removeCallback() {
    if (this._viewer) {
      this._cache = {}
      this._delegate.removeAll()
      this._viewer.delegate.scene.primitives.remove(this._delegate)
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
