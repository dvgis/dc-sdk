/**
 * @Author : Caven Chen
 */

import { TrackEventType } from '../EventType'
import Event from '../Event'

class TrackEvent extends Event {
  constructor() {
    super(TrackEventType)
    this._registerEvent()
  }
}

export default TrackEvent
