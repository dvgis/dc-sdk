/*
 * @Author: Caven
 * @Date: 2020-01-09 09:16:27
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 09:01:06
 */

import { Cesium } from '../../namespace'
import Layer from './Layer'
import LayerState from './LayerState'

/**
 * TilesetLayer is used to add various tileset
 */
class TilesetLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.PrimitiveCollection()
    this.type = Layer.getLayerType('tileset')
    this._state = LayerState.INITIALIZED
  }

  clear() {
    this._delegate.removeAll()
    this._cache = {}
    this._state = LayerState.CLEARED
    return this
  }
}

Layer.registerType('tileset')

export default TilesetLayer
