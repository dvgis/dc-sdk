/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-18 18:52:49
 */
import Cesium from '@/namespace'
import Event from './Event'

class OverlayEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(DC.MouseEventType).forEach(key => {
      let type = DC.MouseEventType[key]
      this._cache[type] = new Cesium.Event()
    })

    Object.keys(DC.OverlayEventType).forEach(key => {
      let type = DC.OverlayEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default OverlayEvent
