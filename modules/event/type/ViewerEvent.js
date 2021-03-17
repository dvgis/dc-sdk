/**
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 */

import { Cesium } from '@dc-modules/namespace'
import { ViewerEventType } from '../EventType'
import Event from '../Event'

class ViewerEvent extends Event {
  constructor() {
    super()
  }

  /**
   * Register event for viewer
   * @private
   */
  _registerEvent() {
    Object.keys(ViewerEventType).forEach(key => {
      let type = ViewerEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default ViewerEvent
