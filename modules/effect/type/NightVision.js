/**
 * @Author: Caven
 * @Date: 2020-08-14 23:10:14
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'

class NightVision {
  constructor() {
    this._enable = false
    this._selected = []
    this.type = 'night'
    this._state = State.INITIALIZED
  }

  set enable(enable) {
    this._enable = enable
    if (enable && this._viewer && !this._delegate) {
      this._createPostProcessStage()
    }
    this._delegate && (this._delegate.enabled = enable)
    return this
  }

  get enable() {
    return this._enable
  }

  set selected(selected) {
    this._selected = selected
    this._delegate && (this._delegate.selected = selected)
    return this
  }

  get selected() {
    return this._selected
  }

  /**
   *
   * @private
   */
  _createPostProcessStage() {
    this._delegate = Cesium.PostProcessStageLibrary.createNightVisionStage()
    if (this._delegate) {
      this._viewer.scene.postProcessStages.add(this._delegate)
    }
  }

  /**
   *
   * @param viewer
   * @returns {NightVision}
   */
  addTo(viewer) {
    if (!viewer) {
      return this
    }
    this._viewer = viewer
    this._state = State.ADDED
    return this
  }
}

export default NightVision
