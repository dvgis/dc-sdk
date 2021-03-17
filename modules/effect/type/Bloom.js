/**
 * @Author: Caven
 * @Date: 2020-08-14 23:50:27
 */

import State from '@dc-modules/state/State'

class Bloom {
  constructor() {
    this._viewer = undefined
    this._enable = false
    this._contrast = 128
    this._brightness = -0.3
    this._glowOnly = false
    this._delta = 1
    this._sigma = 3.8
    this._stepSize = 5
    this._selected = []
    this.type = 'bloom'
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

  set contrast(contrast) {
    this._contrast = contrast
    this._delegate && (this._delegate.uniforms.contrast = contrast)
    return this
  }

  get contrast() {
    return this._contrast
  }

  set brightness(brightness) {
    this._brightness = brightness
    this._delegate && (this._delegate.uniforms.brightness = brightness)
    return this
  }

  get brightness() {
    return this._brightness
  }

  set glowOnly(glowOnly) {
    this._glowOnly = glowOnly
    this._delegate && (this._delegate.uniforms.glowOnly = glowOnly)
    return this
  }

  get glowOnly() {
    return this._glowOnly
  }

  set delta(delta) {
    this._delta = delta
    this._delegate && (this._delegate.uniforms.delta = delta)
    return this
  }

  get delta() {
    return this._delta
  }

  set sigma(sigma) {
    this._sigma = sigma
    this._delegate && (this._delegate.uniforms.sigma = sigma)
    return this
  }

  get sigma() {
    return this._sigma
  }

  set stepSize(stepSize) {
    this._stepSize = stepSize
    this._delegate && (this._delegate.uniforms.stepSize = stepSize)
    return this
  }

  get stepSize() {
    return this._stepSize
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
    this._delegate = this._viewer.scene.postProcessStages.bloom
    this._delegate.uniforms.contrast = this._contrast
    this._delegate.uniforms.brightness = this._brightness
    this._delegate.uniforms.glowOnly = this._glowOnly
    this._delegate.uniforms.delta = this._delta
    this._delegate.uniforms.sigma = this._sigma
    this._delegate.uniforms.stepSize = this._stepSize
  }

  /**
   *
   * @param viewer
   * @returns {Bloom}
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

export default Bloom
