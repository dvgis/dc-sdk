/*
 * @Author: Caven
 * @Date: 2020-03-02 23:14:20
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 23:18:36
 */

import Cesium from '@/namespace'

DC.AroundView = class {
  constructor(viewer, options = {}) {
    if (!viewer || !(viewer instanceof DC.Viewer)) {
      throw new Error('the viewer invalid')
    }
    this._viewer = viewer
    this._options = options
    this._heading = viewer.camera.heading
    this._startTime = Cesium.JulianDate.fromDate(new Date())
    this._stopTime = Cesium.JulianDate.addSeconds(
      this._startTime,
      this._options.duration || 10,
      new Cesium.JulianDate()
    )
  }

  _start() {
    this._viewer.clock.currentTime = this._startTime.clone()
    this._viewer.on(DC.SceneEventType.CLOCK_TICK, this._onTickHandler, this)
  }

  _onTickHandler() {
    let diff = Cesium.JulianDate.secondsDifference(
      this._viewer.clock.currentTime,
      this._startTime
    )
    let duration = this._options.duration || 10
    let heading = Cesium.Math.toRadians(diff * (360 / duration)) + this._heading
    this._viewer.scene.camera.setView({
      orientation: {
        heading: heading
      }
    })
    if (
      Cesium.JulianDate.compare(
        this._viewer.clock.currentTime,
        this._stopTime
      ) >= 0
    ) {
      this._viewer.off(DC.SceneEventType.CLOCK_TICK, this._onTickHandler, this)
      this._options.callback &&
        this._options.callback.call(this._options.context || this)
    }
  }
}
