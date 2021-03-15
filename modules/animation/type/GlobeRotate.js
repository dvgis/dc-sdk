/**
 * @Author: Caven
 * @Date: 2020-01-30 20:47:25
 */

import Animation from '../Animation'

const { Cesium } = DC.Namespace

class GlobeRotate extends Animation {
  constructor(viewer, options = {}) {
    super(viewer)
    this._options = options
    this.type = 'globe_rotate'
  }

  /**
   * @param scene
   * @param time
   * @returns {boolean}
   * @private
   */
  _icrf(scene, time) {
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
      return true
    }
    let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
    if (icrfToFixed) {
      let camera = this._viewer.camera
      let offset = Cesium.Cartesian3.clone(camera.position)
      let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
      camera.lookAtTransform(transform, offset)
    }
  }

  /**
   * Bind the Event
   * @private
   */
  _bindEvent() {
    this._viewer.clock.multiplier = this._options.speed || 12 * 1000
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.scene.postUpdate.addEventListener(this._icrf, this)
  }

  /**
   * Unbind the Event
   * @private
   */
  _unbindEvent() {
    this._viewer.clock.multiplier = 1
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.scene.postUpdate.removeEventListener(this._icrf, this)
  }
}

export default GlobeRotate
