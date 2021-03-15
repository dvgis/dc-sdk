/**
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 */

import { Cesium } from '@dc-modules/namespace'
import { LayerEventType } from '../EventType'
import Event from '../Event'

class LayerEvent extends Event {
  constructor() {
    super()
  }

  /**
   * Register event for layer
   * @private
   */
  _registerEvent() {
    Object.keys(LayerEventType).forEach(key => {
      let type = LayerEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default LayerEvent
