/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-11 11:37:23
 */
import Cesium from '@/namespace'
import Event from './Event'

class LayerEvent extends Event {
  constructor() {
    super()
    this._registerEvent()
  }

  _registerEvent() {
    Object.keys(DC.LayerEventType).forEach(key => {
      let type = DC.LayerEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default LayerEvent
