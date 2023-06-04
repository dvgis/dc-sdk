/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../../namespace'
import { PathEventType } from '../EventType'
import Event from '../Event'

class PathEvent extends Event {
  constructor() {
    super(PathEventType)
    this._registerEvent()
  }
}

export default PathEvent
