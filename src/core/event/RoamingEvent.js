/*
 * @Author: Caven
 * @Date: 2020-04-10 16:58:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-11 11:42:42
 */
import Cesium from '@/namespace'
import Event from './Event'

class RoamingEvent extends Event {
  constructor() {
    super()
    this._registerEvent()
  }

  _registerEvent() {
    Object.keys(DC.RoamingEventType).forEach(key => {
      let type = DC.RoamingEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default RoamingEvent
