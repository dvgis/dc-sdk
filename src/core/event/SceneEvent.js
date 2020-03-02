/*
 * @Author: Caven
 * @Date: 2020-03-02 21:32:43
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-02 21:50:37
 */

import Event from './Event'

class SceneEvent extends Event {
  constructor(viewer) {
    super()
    this._camera = viewer.delegate.camera
    this._scene = viewer.delegate.scene
    this._clock = viewer.delegate.clock
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  on(type, callback, context) {
    switch (type) {
      case DC.SceneEventType.CAMERA_MOVE_END:
        this._camera &&
          this._camera.moveEnd.addEventListener(callback, context || this)
        break
      case DC.SceneEventType.CAMERA_CHANGED:
        this._camera &&
          this._camera.changed.addEventListener(callback, context || this)
        break
      case DC.SceneEventType.PRE_RENDER:
        this._scene &&
          this._scene.preRender.addEventListener(callback, context || this)
        break
      case DC.SceneEventType.POST_RENDER:
        this._scene &&
          this._scene.postRender.addEventListener(callback, context || this)
        break
      case DC.SceneEventType.MORPH_COMPLETE:
        this._scene &&
          this._scene.morphComplete.addEventListener(callback, context || this)
        break
      case DC.SceneEventType.CLOCK_TICK:
        this._clock &&
          this._clock.onTick.addEventListener(callback, context || this)
        break
      default:
        break
    }
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  off(type, callback, context) {
    switch (type) {
      case DC.SceneEventType.CAMERA_MOVE_END:
        this._camera &&
          this._camera.moveEnd.removeEventListener(callback, context || this)
        break
      case DC.SceneEventType.CAMERA_CHANGED:
        this._camera &&
          this._camera.changed.removeEventListener(callback, context || this)
        break
      case DC.SceneEventType.PRE_RENDER:
        this._scene &&
          this._scene.preRender.removeEventListener(callback, context || this)
        break
      case DC.SceneEventType.POST_RENDER:
        this._scene &&
          this._scene.postRender.removeEventListener(callback, context || this)
        break
      case DC.SceneEventType.MORPH_COMPLETE:
        this._scene &&
          this._scene.morphComplete.removeEventListener(
            callback,
            context || this
          )
        break
      case DC.SceneEventType.CLOCK_TICK:
        this._clock &&
          this._clock.onTick.removeEventListener(callback, context || this)
        break
      default:
        break
    }
  }
}

export default SceneEvent
