/**
 * @Author: Caven
 * @Date: 2020-05-11 23:28:13
 */

import { PlotEventType } from '../EventType'
import Event from '../Event'

class PlotEvent extends Event {
  constructor() {
    super(PlotEventType)
    this._registerEvent()
  }
}

export default PlotEvent
