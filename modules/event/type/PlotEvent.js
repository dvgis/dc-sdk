/**
 * @Author: Caven
 * @Date: 2020-05-11 23:28:13
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '../EventType'
import Event from '../Event'

class PlotEvent extends Event {
  constructor() {
    super()
  }

  /**
   *
   * @private
   */
  _registerEvent() {
    Object.keys(PlotEventType).forEach(key => {
      let type = PlotEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default PlotEvent
