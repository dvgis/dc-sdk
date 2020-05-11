/*
 * @Author: Caven
 * @Date: 2020-01-09 09:16:27
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:37:12
 */

import State from '../state/State'
import Layer from './Layer'
const { Cesium } = DC.Namespace

/**
 * TilesetLayer is used to add various tileset
 */
class TilesetLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.PrimitiveCollection()
    this.type = Layer.getLayerType('tileset')
    this._state = State.INITIALIZED
  }

  clear() {
    this._delegate.removeAll()
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('tileset')

export default TilesetLayer
