/**
 * @Author: Caven
 * @Date: 2020-05-11 23:28:13
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
