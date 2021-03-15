/**
 * @Author: Caven
 * @Date: 2020-03-02 21:32:43
 */

import { SceneEventType } from '../EventType'
import Event from '../Event'

class SceneEvent extends Event {
  constructor(viewer) {
    super()
    this._camera = viewer.camera
    this._scene = viewer.scene
    this._clock = viewer.clock
  }

  /**
   * Subscribe event
   * @param type
   * @param callback
   * @param context
   * @returns {any}
   */
  on(type, callback, context) {
    let removeCallback = undefined
    switch (type) {
      case SceneEventType.CAMERA_MOVE_END:
        removeCallback = this._camera.moveEnd.addEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.CAMERA_CHANGED:
        removeCallback = this._camera.changed.addEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.PRE_UPDATE:
        removeCallback = this._scene.preUpdate.addEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.POST_UPDATE:
        removeCallback = this._scene.postUpdate.addEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.PRE_RENDER:
        removeCallback = this._scene.preRender.addEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.POST_RENDER:
        removeCallback = this._scene.postRender.addEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.MORPH_COMPLETE:
        removeCallback = this._scene.morphComplete.addEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.CLOCK_TICK:
        removeCallback = this._clock.onTick.addEventListener(
          callback,
          context || this
        )
        break
      default:
        break
    }
    return removeCallback
  }

  /**
   * Unsubscribe event
   * @param type
   * @param callback
   * @param context
   * @returns {boolean}
   */
  off(type, callback, context) {
    let removed = false
    switch (type) {
      case SceneEventType.CAMERA_MOVE_END:
        removed = this._camera.moveEnd.removeEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.CAMERA_CHANGED:
        removed = this._camera.changed.removeEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.PRE_UPDATE:
        removed = this._scene.preUpdate.removeEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.POST_UPDATE:
        removed = this._scene.postUpdate.removeEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.PRE_RENDER:
        removed = this._scene.preRender.removeEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.POST_RENDER:
        removed = this._scene.postRender.removeEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.MORPH_COMPLETE:
        removed = this._scene.morphComplete.removeEventListener(
          callback,
          context || this
        )
        break
      case SceneEventType.CLOCK_TICK:
        removed = this._clock.onTick.removeEventListener(
          callback,
          context || this
        )
        break
      default:
        break
    }

    return removed
  }
}

export default SceneEvent
