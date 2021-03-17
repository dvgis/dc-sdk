/**
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 */

import { Cesium } from '@dc-modules/namespace'
import { OverlayEventType } from '../EventType'
import Event from '../Event'

class OverlayEvent extends Event {
  constructor() {
    super()
  }

  /**
   * Register event for overlay
   * @private
   */
  _registerEvent() {
    Object.keys(OverlayEventType).forEach(key => {
      let type = OverlayEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default OverlayEvent
