/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 08:13:06
 */
import { Cesium } from '../../namespace'
import { LayerEventType } from './EventType'
import Event from './Event'

class LayerEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(LayerEventType).forEach(key => {
      let type = LayerEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default LayerEvent
