/**
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 */

import { ViewerEventType } from '../EventType'
import Event from '../Event'

class ViewerEvent extends Event {
  constructor() {
    super(ViewerEventType)
    this._registerEvent()
  }
}

export default ViewerEvent
