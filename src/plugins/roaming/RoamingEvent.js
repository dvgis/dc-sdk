/*
 * @Author: Caven
 * @Date: 2020-05-11 23:28:13
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:28:22
 */

import RoamingEventType from './RoamingEventType'

const { Event } = DC

const { Cesium } = DC.Namespace

class RoamingEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(RoamingEventType).forEach(key => {
      let type = RoamingEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default RoamingEvent
