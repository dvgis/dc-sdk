/**
 * @Author: Caven
 * @Date: 2020-08-14 23:51:47
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'

class LensFlare {
  constructor() {
    this._viewer = undefined
    this._delegate = undefined
    this._enable = false
    this._intensity = 6
    this._distortion = 61
    this._dirtAmount = 0.4
    this._haloWidth = 0.4
    this._selected = []
    this.type = 'lens_flare'
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
    this._delegate && (this._delegate.uniforms.intensity = intensity)
    return this
  }

  get intensity() {
    return this._intensity
  }

  set distortion(distortion) {
    this._distortion = distortion
    this._delegate && (this._delegate.uniforms.distortion = distortion)
    return this
  }

  get distortion() {
    return this._distortion
  }

  set dirtAmount(dirtAmount) {
    this._dirtAmount = dirtAmount
    this._delegate && (this._delegate.uniforms.dirtAmount = dirtAmount)
    return this
  }

  get dirtAmount() {
    return this._dirtAmount
  }

  set haloWidth(haloWidth) {
    this._haloWidth = haloWidth
    this._delegate && (this._delegate.uniforms.haloWidth = haloWidth)
    return this
  }

  get haloWidth() {
    return this._haloWidth
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
    this._delegate = Cesium.PostProcessStageLibrary.createLensFlareStage()
    if (this._delegate) {
      this._delegate.uniforms.intensity = this._intensity
      this._delegate.uniforms.distortion = this._distortion
      this._delegate.uniforms.dirtAmount = this._dirtAmount
      this._delegate.uniforms.haloWidth = this._haloWidth
      this._viewer.scene.postProcessStages.add(this._delegate)
    }
  }

  /**
   *
   * @param viewer
   * @returns {LensFlare}
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

export default LensFlare
