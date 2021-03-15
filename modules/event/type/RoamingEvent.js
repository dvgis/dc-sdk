/**
 * @Author: Caven
 * @Date: 2020-05-11 23:28:13
 */

import { Cesium } from '@dc-modules/namespace'
import { RoamingEventType } from '../EventType'
import Event from '../Event'

class RoamingEvent extends Event {
  constructor() {
    super()
  }

  /**
   *
   * @private
   */
  _registerEvent() {
    Object.keys(RoamingEventType).forEach(key => {
      let type = RoamingEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default RoamingEvent
