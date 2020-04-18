/*
 * @Author: Caven
 * @Date: 2020-04-10 16:58:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-18 18:51:57
 */
import Cesium from '@/namespace'
import Event from './Event'

class RoamingEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(DC.RoamingEventType).forEach(key => {
      let type = DC.RoamingEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default RoamingEvent
