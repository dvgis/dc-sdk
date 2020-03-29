/*
 * @Author: Caven
 * @Date: 2020-01-09 09:16:27
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-29 13:19:25
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

  clear() {
    this._delegate.removeAll()
    this._cache = {}
    this._state = DC.LayerState.CLEARED
    return this
  }
}

DC.LayerType.TILESET = 'tileset'
