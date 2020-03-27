/*
 * @Author: Caven
 * @Date: 2020-03-02 23:14:20
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-25 14:54:42
 */

import Cesium from '@/namespace'

DC.AroundView = class {
  constructor(viewer, options = {}) {
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
    this._viewer.clock.startTime = this._startTime.clone()
    this._viewer.clock.stopTime = this._stopTime.clone()
    this._viewer.clock.currentTime = this._startTime.clone()
    this._viewer.clock.onTick.addEventListener(this._onTickHandler, this)
  }

  _onTickHandler() {
    let diff = Cesium.JulianDate.secondsDifference(
      this._viewer.clock.currentTime,
      this._viewer.clock.startTime
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
        this._viewer.clock.stopTime
      ) >= 0
    ) {
      this._viewer.clock.onTick.removeEventListener(this._onTickHandler, this)
      this._options._callback &&
        this._options._callback.call(this._options.context || this)
    }
  }
}
