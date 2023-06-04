/**
 * @Author : Caven Chen
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
