/**
 * @Author : Caven Chen
 */

import { OverlayEventType } from '../EventType'
import Event from '../Event'

class OverlayEvent extends Event {
  constructor() {
    super(OverlayEventType)
    this._registerEvent()
  }
}

export default OverlayEvent
