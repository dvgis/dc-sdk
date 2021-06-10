/**
 * @Author: Caven
 * @Date: 2020-05-11 23:28:13
 */

import { Cesium } from '@dc-modules/namespace'
import { PathEventType } from '../EventType'
import Event from '../Event'

class PathEvent extends Event {
  constructor() {
    super()
  }

  /**
   *
   * @private
   */
  _registerEvent() {
    Object.keys(PathEventType).forEach(key => {
      let type = PathEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default PathEvent
