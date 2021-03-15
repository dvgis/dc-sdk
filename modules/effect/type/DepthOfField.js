/**
 * @Author: Caven
 * @Date: 2020-08-14 23:51:47
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'

class DepthOfField {
  constructor() {
    this._viewer = undefined
    this._delegate = undefined
    this._enable = false
    this._focalDistance = 87
    this._delta = 1
    this._sigma = 3.8
    this._stepSize = 2.5
    this._selected = []
    this.type = 'depth_of_field'
    this._state = State.INITIALIZED
  }

  set enable(enable) {
    this._enable = enable
    if (
      enable &&
      this._viewer &&
      Cesium.PostProcessStageLibrary.isDepthOfFieldSupported(
        this._viewer.scene
      ) &&
      !this._delegate
    ) {
      this._createPostProcessStage()
    }
    this._delegate && (this._delegate.enabled = enable)
    return this
  }

  get enable() {
    return this._enable
  }

  set focalDistance(focalDistance) {
    this._focalDistance = focalDistance
    this._delegate && (this._delegate.uniforms.focalDistance = focalDistance)
    return this
  }

  get focalDistance() {
    return this._focalDistance
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
    this._delegate = Cesium.PostProcessStageLibrary.createDepthOfFieldStage()
    if (this._delegate) {
      this._delegate.uniforms.focalDistance = this._focalDistance
      this._delegate.uniforms.delta = this._delta
      this._delegate.uniforms.sigma = this._sigma
      this._delegate.uniforms.stepSize = this._stepSize
      this._viewer.scene.postProcessStages.add(this._delegate)
    }
  }

  /**
   *
   * @param viewer
   * @returns {DepthOfField}
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

export default DepthOfField
