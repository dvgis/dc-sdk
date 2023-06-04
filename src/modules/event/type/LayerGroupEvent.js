/**
 * @Author : Caven Chen
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
