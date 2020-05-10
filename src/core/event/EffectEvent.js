/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 08:38:18
 */

import { Cesium } from '../../namespace'
import { EffectEventType } from './EventType'
import Event from './Event'

class EffectEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(EffectEventType).forEach(key => {
      let type = EffectEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default EffectEvent
