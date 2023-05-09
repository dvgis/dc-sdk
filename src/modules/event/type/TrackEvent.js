/**
 * @Author: Caven
 * @Date: 2021-06-08 20:37:28
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
