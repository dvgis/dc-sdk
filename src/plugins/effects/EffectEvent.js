/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:28:18
 */
import EffectEventType from './EffectEventType'

const { Event } = DC

const { Cesium } = DC.Namespace

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
