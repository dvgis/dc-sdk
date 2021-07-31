/**
 * @Author: Caven
 * @Date: 2021-05-05 09:12:41
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Layer from '../Layer'

class DynamicLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.CustomDataSource(id)
    this._state = State.INITIALIZED
  }

  get type() {
    return Layer.getLayerType('dynamic')
  }

  /**
   * Clears all entities
   * @returns {DynamicLayer}
   */
  clear() {
    this._delegate.entities && this._delegate.entities.removeAll()
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('dynamic')

export default DynamicLayer
