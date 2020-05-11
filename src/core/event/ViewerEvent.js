/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:57:30
 */

import { MouseEventType, ViewerEventType } from './EventType'
import Event from './Event'

const { Cesium } = DC.Namespace

class ViewerEvent extends Event {
  constructor() {
    super()
  }

  _registerEvent() {
    Object.keys(MouseEventType).forEach(key => {
      let type = MouseEventType[key]
      this._cache[type] = new Cesium.Event()
    })

    Object.keys(ViewerEventType).forEach(key => {
      let type = ViewerEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default ViewerEvent
