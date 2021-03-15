/**
 * @Author: Caven
 * @Date: 2020-08-14 23:51:47
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'

class Brightness {
  constructor() {
    this._viewer = undefined
    this._delegate = undefined
    this._enable = false
    this._intensity = 1
    this._selected = []
    this.type = 'brightness'
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

  set intensity(intensity) {
    this._intensity = intensity
    this._delegate && (this._delegate.uniforms.brightness = intensity)
    return this
  }

  get intensity() {
    return this._intensity
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
