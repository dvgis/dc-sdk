/**
 * @Author: Caven
 * @Date: 2020-08-14 23:51:47
 */

import { Cesium } from '../../../namespace'
import State from '../../state/State'

class Brightness {
  constructor() {
    this._viewer = undefined
    this._delegate = undefined
    this._enable = false
    this._intensity = 1
    this._selected = []
    this._state = State.INITIALIZED
  }

  get type() {
    return 'brightness'
  }

  set enable(enable) {
    this._enable = enable
    if (enable && this._viewer && !this._delegate) {
      this._createPostProcessStage()
    }
    this._delegate && (this._delegate.enabled = enable)
  }

  get enable() {
    return this._enable
  }

  set intensity(intensity) {
    this._intensity = intensity
    this._delegate && (this._delegate.uniforms.brightness = intensity)
  }

  get intensity() {
    return this._intensity
  }

  set selected(selected) {
    this._selected = selected
    this._delegate && (this._delegate.selected = selected)
  }

  get selected() {
    return this._selected
  }

  /**
   *
   * @private
   */
  _createPostProcessStage() {
    this._delegate = Cesium.PostProcessStageLibrary.createBrightnessStage()
    if (this._delegate) {
      this._delegate.uniforms.brightness = this._intensity
      this._viewer.scene.postProcessStages.add(this._delegate)
    }
  }

  /**
   *
   * @param viewer
   * @returns {Brightness}
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

export default Brightness
