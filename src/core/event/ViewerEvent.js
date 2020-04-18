/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-18 18:53:00
 */
import Cesium from '@/namespace'
import Event from './Event'

class ViewerEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(DC.MouseEventType).forEach(key => {
      let type = DC.MouseEventType[key]
      this._cache[type] = new Cesium.Event()
    })

    Object.keys(DC.ViewerEventType).forEach(key => {
      let type = DC.ViewerEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default ViewerEvent
