/**
 * @Author: Caven
 * @Date: 2020-10-11 18:16:47
 */

import State from '../state/State'
import Layer from './Layer'

const { Cesium } = DC.Namespace

class PrimitiveLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.PrimitiveCollection()
    this.type = Layer.getLayerType('primitive')
    this._state = State.INITIALIZED
  }

  /**
   * Clears all primitives
   * @returns {PrimitiveLayer}
   */
  clear() {
    this._delegate && this._delegate.removeAll()
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('primitive')

export default PrimitiveLayer
