/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-15 10:05:01
 */

import { OverlayEventType } from './EventType'
import Event from './Event'

const { Cesium } = DC.Namespace

class OverlayEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(OverlayEventType).forEach(key => {
      let type = OverlayEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default OverlayEvent
