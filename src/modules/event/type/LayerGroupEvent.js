/**
 * @Author: Caven
 * @Date: 2020-08-28 20:18:04
 */

import { LayerGroupEventType } from '../EventType'
import Event from '../Event'

class LayerGroupEvent extends Event {
  constructor() {
    super(LayerGroupEventType)
    this._registerEvent()
  }
}

export default LayerGroupEvent
