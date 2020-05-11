/*
 * @Author: Caven
 * @Date: 2020-04-01 10:36:36
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:29:53
 */

import RoamingEventType from './RoamingEventType'

const { SceneEventType, State } = DC

const { Cesium } = DC.Namespace

class RoamingController {
  constructor(viewer) {
    this._viewer = viewer
    this._clockTickRemoveCallback = undefined
    this._startTime = undefined
    this._duration = 0
    this._cache = {}
    this._viewMode = undefined
    this._viewOption = {}
  }

  _clockTickHandler() {
    Object.keys(this._cache).forEach(key => {
      let path = this._cache(key)
      path.roamingEvent &&
        path.roamingEvent.fire(
          RoamingEventType.TICK,
          this._viewer.clock.currentTime,
          this._viewMode,
          this._viewOption
        )
    })
  }

  /**
   *
   * @param {*} startTime
   * @param {*} endTime
   *
   */
  setTimeRange(startTime, endTime) {
    if (
      !startTime ||
      !endTime ||
      !(startTime instanceof Date) ||
      !(endTime instanceof Date) ||
      startTime > endTime
    ) {
      throw new Error('RoamingController: the time range invalid ')
    }
    this._startTime = Cesium.JulianDate.fromDate(startTime)
    let endTime = Cesium.JulianDate.fromDate(endTime)
    this._duration = Cesium.JulianDate.secondsDifference(
      endTime,
      this._startTime
    )
    return this
  }

  /**
   *
   * @param {*} startTime
   * @param {*} duration
   *
   */
  setTimeDuration(startTime, duration) {
    if (!startTime || !(startTime instanceof Date)) {
      throw new Error('RoamingController: the time invalid ')
    }
    this._startTime = Cesium.JulianDate.fromDate(startTime)
    this._duration = duration
    return this
  }

  /**
   *
   */
  play() {
    if (!this._startTime && !(this._startTime instanceof Cesium.JulianDate)) {
      throw new Error('RoamingController: time not set ')
    }
    this._viewer.clock.shouldAnimate = false
    this._viewer.clock.currentTime = this._startTime
    this._clockTickRemoveCallback && this._clockTickRemoveCallback()
    this._clockTickRemoveCallback = this._viewer.on(
      SceneEventType.CLOCK_TICK,
      this._clockTickHandler,
      this
    )
    return this
  }

  /**
   *
   */
  pause() {
    this._viewer.clock.shouldAnimate = false
    return this
  }

  /**
   *
   */
  restore() {
    this._viewer.clock.shouldAnimate = true
    return this
  }

  /**
   *
   * @param {*} speed
   */
  changeSpeed(speed) {
    this._viewer.clock.multiplier = speed
    return this
  }

  /**
   *
   * @param {*} path
   */
  addPath(path) {
    if (path && path.roamingEvent && path.state !== State.ADDED) {
      path.roamingEvent.fire(RoamingEventType.ADD, this)
      this._cache[path.id] = path
    }
    return this
  }

  /**
   *
   * @param {*} path
   */
  removePath(path) {
    if (path && path.roamingEvent && path.state !== State.REMOVED) {
      path.roamingEvent.fire(RoamingEventType.REMOVE)
      delete this._cache[path.id]
    }
    return this
  }

  /**
   *
   */
  clearPath() {
    Object.keys(this._cache).forEach(key => {
      let path = this._cache(key)
      path && this.removePath(path)
    })
    return this
  }

  /**
   *
   * @param {*} path
   * @param {*} viewMode
   * @param {*} viewOption
   */
  trackedPath(path, viewMode, viewOption = {}) {
    if (!this._cache[path.id]) {
      throw new Error('RoamingController: path does not add ')
    }
    this._viewMode = viewMode
    this._viewOption = viewOption
    path.roamingEvent &&
      path.roamingEvent.fire(RoamingEventType.ACTIVE, path.id)
    return this
  }
}

export default RoamingController
