/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-25 12:07:18
 */
import Cesium from '@/namespace'

import Event from './Event'

class ViewerEvent extends Event {
  constructor(viewer) {
    super()
    this._viewer = viewer
    this._registerEvent()
  }

  _registerEvent() {
    // mouse event
    for (let key in DC.MouseEventType) {
      let type = DC.MouseEventType[key]
      this._eventCache[type] = new Cesium.Event()
    }

    //scene event
    for (let key in DC.SceneEventType) {
      let type = DC.SceneEventType[key]
      let event = undefined
      if (this._viewer) {
        switch (key) {
          case 'CAMERA_MOVE_END':
            event = this._viewer.delegate.camera.moveEnd
          case 'CAMERA_CHANGED':
            event = this._viewer.delegate.camera.changed
          case 'PRE_RENDER':
            event = this._viewer.delegate.scene.preRender
          case 'POST_RENDER':
            event = this._viewer.delegate.scene.postRender
          case 'MORPH_COMPLETE':
            event = this._viewer.delegate.scene.morphComplete
            break
          case 'CLOCK_TICK':
            event = this._viewer.delegate.clock.onTick
            break
          default:
            break
        }
      }
      event && (this._eventCache[type] = event)
    }

    //viewer event
    for (let key in DC.ViewerEventType) {
      let type = DC.ViewerEventType[key]
      this._eventCache[type] = new Cesium.Event()
    }
  }
}

export default ViewerEvent
