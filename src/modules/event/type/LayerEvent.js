/**
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 */

import { LayerEventType } from '../EventType'
import Event from '../Event'

class LayerEvent extends Event {
  constructor() {
    super(LayerEventType)
    this._registerEvent()
  }
}

export default LayerEvent
