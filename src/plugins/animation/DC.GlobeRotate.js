/*
 * @Author: Caven
 * @Date: 2020-01-30 20:47:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-28 23:33:41
 */
import Cesium from '@/namespace'
DC.GlobeRotate = class {
  constructor(viewer, time = 5, callback, context) {
    this._viewer = viewer
    this._time = time
    this._callback = callback
    this._startRotate()
    let flag = setTimeout(() => {
      this._endRotate()
      this._callback && this._callback.call(context || this)
      clearTimeout(flag)
    }, Number(this._time) * 1e3)
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
