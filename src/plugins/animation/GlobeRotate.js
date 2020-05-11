/*
 * @Author: Caven
 * @Date: 2020-01-30 20:47:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 10:52:03
 */

const { Cesium } = DC.Namespace

class GlobeRotate {
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
   * The main method of rotation
   * @param {*} scene
   * @param {*} time
   *
   */
  _icrf(scene, time) {
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
      return false
    }
    let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
    if (Cesium.defined(icrfToFixed)) {
      let camera = this._viewer.camera
      let offset = Cesium.Cartesian3.clone(camera.position)
      let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
      camera.lookAtTransform(transform, offset)
    }
  }

  /**
   * Start the rotation
   */
  _startRotate() {
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.clock.multiplier = 12 * 1000
    this._viewer.scene.postUpdate.addEventListener(this._icrf, this)
  }

  /**
   * End the rotation
   */
  _endRotate() {
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.clock.multiplier = 1
    this._viewer.clock.currentTime = Cesium.JulianDate.now().clone()
    this._viewer.scene.postUpdate.removeEventListener(this._icrf, this)
  }
}

export default GlobeRotate
