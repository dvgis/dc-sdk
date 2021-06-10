/**
 * @Author: Caven
 * @Date: 2021-06-08 20:37:28
 */

import { Cesium } from '@dc-modules/namespace'
import { TrackEventType } from '../EventType'
import Event from '../Event'

class TrackEvent extends Event {
  constructor() {
    super()
  }

  /**
   *
   * @private
   */
  _registerEvent() {
    Object.keys(TrackEventType).forEach(key => {
      let type = TrackEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default TrackEvent
