/*
 * @Author: Caven
 * @Date: 2020-01-30 20:47:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 17:10:09
 */
import Cesium from '@/namespace'
DC.GlobeRotate = class {
  constructor(viewer, time = 5, callback = null) {
    this._viewer = viewer
    this._time = time
    this._callback = callback
    this._startRotate()
    let flag = setTimeout(() => {
      this._endRotate()
      if (this._callback) {
        this._callback()
      }
      clearTimeout(flag)
    }, Number(this._time) * 1000)
  }

  /**
   *
   * @param {*} scene
   * @param {*} time
   * The main method of rotation
   */
  _icrf(scene, time) {
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
      return
    }
    let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
    if (Cesium.defined(icrfToFixed)) {
      let camera = this._viewer.delegate.camera
      let offset = Cesium.Cartesian3.clone(camera.position)
      let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
      camera.lookAtTransform(transform, offset)
    }
  }

  /**
   * Start the rotation
   */
  _startRotate() {
    this._viewer.delegate.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.delegate.clock.multiplier = 12 * 1000
    this._viewer.delegate.scene.postUpdate.addEventListener(this._icrf, this)
  }

  /**
   * End the rotation
   */
  _endRotate() {
    this._viewer.delegate.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.delegate.clock.multiplier = 1
    this._viewer.delegate.clock.currentTime = Cesium.JulianDate.now().clone()
    this._viewer.delegate.scene.postUpdate.removeEventListener(this._icrf, this)
  }
}
