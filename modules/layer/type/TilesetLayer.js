/**
 * @Author: Caven
 * @Date: 2020-01-09 09:16:27
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Layer from '../Layer'

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

  /**
   * Clear all tileset
   * @returns {TilesetLayer}
   */
  clear() {
    this._delegate.removeAll()
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('tileset')

export default TilesetLayer
