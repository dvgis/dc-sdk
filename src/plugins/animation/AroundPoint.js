/*
 * @Author: Caven
 * @Date: 2020-03-02 22:38:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 09:57:49
 */

const { Util, SceneEventType, Transfrom } = DC

const { Cesium } = DC.Namespace

class AroundPoint {
  constructor(viewer, position, options = {}) {
    if (!Util.checkViewer(viewer)) {
      throw new Error('AroundPoint：the viewer invalid')
    }
    if (!Util.checkPosition(position)) {
      throw new Error('AroundPoint：the position invalid')
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
    this._viewer.on(SceneEventType.CLOCK_TICK, this._onTickHandler, this)
  }

  _onTickHandler() {
    let diff = Cesium.JulianDate.secondsDifference(
      this._viewer.clock.currentTime,
      this._startTime
    )
    let duration = this._options.duration || 10
    let heading = Cesium.Math.toRadians(diff * (360 / duration)) + this._heading
    this._viewer.scene.camera.setView({
      destination: Transfrom.transformWGS84ToCartesian(this._position),
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
      this._viewer.off(SceneEventType.CLOCK_TICK, this._onTickHandler, this)
      this._options.callback &&
        this._options.callback.call(this._options.context || this)
    }
  }
}

export default AroundPoint
