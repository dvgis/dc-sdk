/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-11 11:36:16
 */
import Cesium from '@/namespace'
import Event from './Event'

class EffectEvent extends Event {
  constructor() {
    super()
    this._registerEvent()
  }

  _registerEvent() {
    Object.keys(DC.EffectEventType).forEach(key => {
      let type = DC.EffectEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default EffectEvent
