/**
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 */

import { Cesium } from '../../../namespace'
import { OverlayEventType } from '../EventType'
import Event from '../Event'

class OverlayEvent extends Event {
  constructor() {
    super(OverlayEventType)
    this._registerEvent()
  }
}

export default OverlayEvent
