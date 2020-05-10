/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 08:13:32
 */

import { Cesium } from '../../namespace'
import { MouseEventType, OverlayEventType } from './EventType'
import Event from './Event'

class OverlayEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(MouseEventType).forEach(key => {
      let type = MouseEventType[key]
      this._cache[type] = new Cesium.Event()
    })

    Object.keys(OverlayEventType).forEach(key => {
      let type = OverlayEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default OverlayEvent
