/*
 * @Author: Caven
 * @Date: 2020-04-10 16:58:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 16:59:18
 */
import Cesium from '@/namespace'
import Event from './Event'

class RoamingEvent extends Event {
  constructor() {
    super()
    this._registerEvent()
  }

  _registerEvent() {
    for (let key in DC.RoamingEventType) {
      let type = DC.RoamingEventType[key]
      this._eventCache[type] = new Cesium.Event()
    }
  }
}

export default RoamingEvent
