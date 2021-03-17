/**
 * @Author: Caven
 * @Date: 2020-08-14 23:51:47
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'

class Silhouette {
  constructor() {
    this._viewer = undefined
    this._delegate = undefined
    this._enable = false
    this._color = Cesium.Color.GREEN
    this._length = 0.5
    this._selected = []
    this.type = 'silhouette'
    this._state = State.INITIALIZED
  }

  set enable(enable) {
    this._enable = enable
    if (
      enable &&
      this._viewer &&
      Cesium.PostProcessStageLibrary.isSilhouetteSupported(
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

  set color(color) {
    this._color = color
    this._delegate && (this._delegate.uniforms.color = color)
    return this
  }

  get color() {
    return this._color
  }

  set length(length) {
    this._length = length
    this._delegate && (this._delegate.uniforms.length = length)
    return this
  }

  get length() {
    return this._length
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
    this._delegate = Cesium.PostProcessStageLibrary.createSilhouetteStage()
    if (this._delegate) {
      this._delegate.uniforms.color = this._color
      this._delegate.uniforms.length = this._length
      this._viewer.scene.postProcessStages.add(this._delegate)
    }
  }

  /**
   *
   * @param viewer
   * @returns {Silhouette}
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

export default Silhouette
