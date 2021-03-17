/**
 * @Author: Caven
 * @Date: 2020-04-01 10:36:36
 */

import { Cesium } from '@dc-modules/namespace'
import { RoamingEventType } from '@dc-modules/event'

class RoamingController {
  constructor(viewer) {
    this._viewer = viewer
    this._roamingLayer = new Cesium.CustomDataSource('roaming-layer')
    viewer.dataSources.add(this._roamingLayer)
    this._postUpdateRemoveCallback = undefined
    this._startTime = undefined
    this._cache = {}
    this._activePath = undefined
    this._viewMode = undefined
    this._viewOption = {}
  }

  get startTime() {
    return this._startTime
  }

  get roamingLayer() {
    return this._roamingLayer.entities
  }

  /**
   * @private
   */
  _onPostUpdate(scene, time) {
    Object.keys(this._cache).forEach(key => {
      let path = this._cache[key]
      path.roamingEvent &&
        path.roamingEvent.fire(RoamingEventType.POST_UPDATE, {
          currentTime: time,
          viewMode: this._viewMode,
          viewOption: this._viewOption
        })
    })
  }

  /**
   *
   * @private
   */
  _addPostUpdateListener() {
    this._postUpdateRemoveCallback && this._postUpdateRemoveCallback()
    this._postUpdateRemoveCallback = this._viewer.scene.postUpdate.addEventListener(
      this._onPostUpdate,
      this
    )
  }

  /**
   * Sets time range
   * @param startTime
   * @returns {RoamingController}
   */
  setStartTime(startTime) {
    if (!startTime || !(startTime instanceof Date)) {
      throw new Error('RoamingController: the start time invalid ')
    }
    this._startTime = Cesium.JulianDate.fromDate(startTime)
    return this
  }

  /**
   * Starts play all path
   * @returns {RoamingController}
   */
  play() {
    this._viewer.clock.shouldAnimate = true
    this._viewer.clock.currentTime = this._startTime || Cesium.JulianDate.now()
    this._addPostUpdateListener()
    return this
  }

  /**
   *
   */
  pause() {
    this._viewer.clock.shouldAnimate = false
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.delegate.trackedEntity = undefined
    this._postUpdateRemoveCallback && this._postUpdateRemoveCallback()
    this._postUpdateRemoveCallback = undefined
    return this
  }

  /**
   *
   */
  restore() {
    this._viewer.clock.shouldAnimate = true
    this._postUpdateRemoveCallback && this._postUpdateRemoveCallback()
    this._postUpdateRemoveCallback = this._viewer.scene.postUpdate.addEventListener(
      this._onPostUpdate,
      this
    )
    this._addPostUpdateListener()
    return this
  }

  /**
   *
   * @param speed
   * @returns {RoamingController}
   */
  changeSpeed(speed) {
    this._viewer.clock.multiplier = speed
    return this
  }

  /**
   * Adds a path
   * @param path
   * @returns {RoamingController}
   */
  addPath(path) {
    if (
      path &&
      path.roamingEvent &&
      !Object(this._cache).hasOwnProperty(path.id)
    ) {
      path.roamingEvent.fire(RoamingEventType.ADD, this)
      this._cache[path.id] = path
    }
    return this
  }

  /**
   * Returns a path
   * @param id
   * @returns {*|undefined}
   */
  getPath(id) {
    return this._cache[id] || undefined
  }

  /**
   * removes a path
   * @param path
   * @returns {RoamingController}
   */
  removePath(path) {
    if (
      path &&
      Object(this._cache).hasOwnProperty(path.id) &&
      path.roamingEvent
    ) {
      path.roamingEvent.fire(RoamingEventType.REMOVE, this)
      delete this._cache[path.id]
    }
    return this
  }

  /**
   *
   * @returns {RoamingController}
   */
  clearPath() {
    Object.keys(this._cache).forEach(key => {
      let path = this._cache[key]
      path && this.removePath(path)
    })
    return this
  }

  /**
   *
   * @param path
   * @param viewMode
   * @param viewOption
   * @returns {RoamingController}
   */
  trackedPath(path, viewMode, viewOption = {}) {
    if (!this._cache[path.id]) {
      throw new Error('RoamingController: path does not added ')
    }
    this._viewMode = viewMode
    this._viewOption = viewOption
    if (this._activePath && this._activePath.id === path.id) {
      return this
    }
    if (this._activePath && this._activePath.roamingEvent) {
      this._activePath.roamingEvent.fire(RoamingEventType.RELEASE, path.id)
    }
    this._activePath = path
    if (this._activePath && this._activePath.roamingEvent) {
      this._activePath.roamingEvent.fire(
        RoamingEventType.ACTIVE,
        this._activePath.id
      )
    }
    return this
  }

  /**
   *
   * @param path
   * @returns {RoamingController}
   */
  releasePath(path) {
    if (!this._cache[path.id]) {
      throw new Error('RoamingController: path does not added ')
    }
    if (path && path.isActive && path.roamingEvent) {
      path.roamingEvent.fire(RoamingEventType.RELEASE, path.id)
    }
    this._activePath = undefined
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.delegate.trackedEntity = undefined
    return this
  }

  /**
   *
   * @returns {RoamingController}
   */
  releaseCamera() {
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.delegate.trackedEntity = undefined
    if (this._activePath && this._activePath.roamingEvent) {
      this._activePath.roamingEvent.fire(
        RoamingEventType.RELEASE,
        this._activePath.id
      )
    }
    this._activePath = undefined
    return this
  }
}

export default RoamingController
