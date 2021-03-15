/**
 * @Author: Caven
 * @Date: 2020-03-02 23:14:20
 */

import Animation from '../Animation'

const { Cesium } = DC.Namespace

class AroundView extends Animation {
  constructor(viewer, options = {}) {
    super(viewer)
    this._options = options
    this._heading = viewer.camera.heading
    this._aroundAmount = 0.2
    this.type = 'around_view'
  }

  set aroundAmount(aroundAmount) {
    this._aroundAmount = aroundAmount
    return this
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.clock.onTick.addEventListener(this._onAround, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.clock.onTick.removeEventListener(this._onAround, this)
  }

  /**
   *
   * @param scene
   * @param time
   * @private
   */
  _onAround(scene, time) {
    this._heading += Cesium.Math.toRadians(this._aroundAmount)
    if (this._heading >= Math.PI * 2 || this._heading <= -Math.PI * 2) {
      this._heading = 0
    }
    this._viewer.scene.camera.setView({
      orientation: {
        heading: this._heading
      }
    })
  }
}

export default AroundView
