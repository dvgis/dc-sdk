/*
 * @Author: Caven
 * @Date: 2020-03-02 22:38:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 13:32:45
 */

import Cesium from '@/namespace'

DC.AroundPoint = class {
  constructor(viewer, position, options = {}) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    this._viewer = viewer
    this._position = position
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
      destination: DC.T.transformWGS84ToCartesian(this._position),
      orientation: {
        heading: heading,
        pitch: Cesium.Math.toRadians(this._options.pitch || 0)
      }
    })
    this._options.distance &&
      this._viewer.scene.camera.moveBackward(this._options.distance)
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
