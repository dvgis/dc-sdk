/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-18 18:52:12
 */
import Cesium from '@/namespace'
import Event from './Event'

class EffectEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(DC.EffectEventType).forEach(key => {
      let type = DC.EffectEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default EffectEvent
