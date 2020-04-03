/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-03 11:48:20
 */
import Cesium from '@/namespace'
import Event from './Event'

class EffectEvent extends Event {
  constructor() {
    super()
    this._registerEvent()
  }

  _registerEvent() {
    for (let key in DC.EffectEventType) {
      let type = DC.EffectEventType[key]
      this._eventCache[type] = new Cesium.Event()
    }
  }
}

export default EffectEvent
