/**
 * @Author: Caven
 * @Date: 2021-12-03 20:12:59
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Layer from '../Layer'

class GroundPrimitiveLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.PrimitiveCollection()
    this._isGround = true
    this._state = State.INITIALIZED
  }

  get type() {
    return Layer.getLayerType('ground_primitive')
  }

  /**
   *
   * @return {GroundPrimitiveLayer}
   */
  clear() {
    this._delegate && this._delegate.removeAll()
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('ground_primitive')

export default GroundPrimitiveLayer
