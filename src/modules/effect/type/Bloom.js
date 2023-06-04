/**
 * @Author : Caven Chen
 */

import State from '../../state/State'

class Bloom {
  constructor(viewer) {
    this._viewer = viewer
    this._enable = false
    this._contrast = 128
    this._brightness = -0.3
    this._glowOnly = false
    this._delta = 1
    this._sigma = 3.8
    this._stepSize = 5
    this._selected = []
    this._state = State.INITIALIZED
  }

  get type() {
    return 'bloom'
  }

  set enable(enable) {
    this._enable = enable
    if (!this._delegate) {
      this._createPostProcessStage()
    }
    this._delegate.enabled = enable
    this._state = enable ? State.ENABLED : State.DISABLED
  }

  get enable() {
    return this._enable
  }

  set contrast(contrast) {
    this._contrast = contrast
    this._delegate && (this._delegate.uniforms.contrast = contrast)
  }

  get contrast() {
    return this._contrast
  }

  set brightness(brightness) {
    this._brightness = brightness
    this._delegate && (this._delegate.uniforms.brightness = brightness)
  }

  get brightness() {
    return this._brightness
  }

  set glowOnly(glowOnly) {
    this._glowOnly = glowOnly
    this._delegate && (this._delegate.uniforms.glowOnly = glowOnly)
  }

  get glowOnly() {
    return this._glowOnly
  }

  set delta(delta) {
    this._delta = delta
    this._delegate && (this._delegate.uniforms.delta = delta)
  }

  get delta() {
    return this._delta
  }

  set sigma(sigma) {
    this._sigma = sigma
    this._delegate && (this._delegate.uniforms.sigma = sigma)
  }

  get sigma() {
    return this._sigma
  }

  set stepSize(stepSize) {
    this._stepSize = stepSize
    this._delegate && (this._delegate.uniforms.stepSize = stepSize)
  }

  get stepSize() {
    return this._stepSize
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
    this._delegate = this._viewer.scene.postProcessStages.bloom
    this._delegate.uniforms.contrast = this._contrast
    this._delegate.uniforms.brightness = this._brightness
    this._delegate.uniforms.glowOnly = this._glowOnly
    this._delegate.uniforms.delta = this._delta
    this._delegate.uniforms.sigma = this._sigma
    this._delegate.uniforms.stepSize = this._stepSize
  }
}

export default Bloom
