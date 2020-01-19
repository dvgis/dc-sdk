/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 10:22:10
 */
import Cesium from '@/namespace'

import Event from './Event'

class OverlayEvent extends Event {
  constructor() {
    super()
    this._registerEvent()
  }

  _registerEvent() {
    // mouse event
    for (let key in DC.MouseEventType) {
      let type = DC.MouseEventType[key]
      this._eventCache[type] = new Cesium.Event()
    }
    //
    for (let key in DC.OverlayEventType) {
      let type = DC.OverlayEventType[key]
      this._eventCache[type] = new Cesium.Event()
    }
  }
}

export default OverlayEvent
