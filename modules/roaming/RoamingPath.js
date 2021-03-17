/**
 * @Author: Caven
 * @Date: 2020-01-19 11:21:48
 */

import { Cesium } from '@dc-modules/namespace'
import { RoamingEvent, RoamingEventType } from '@dc-modules/event'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import RoamingViewMode from './RoamingViewMode'

const DEF_OPTS = {
  showPath: false,
  pathWidth: 1,
  pathMaterial: Cesium.Color.ORANGE.withAlpha(0.8),
  pathLeadTime: 1
}

class RoamingPath {
  constructor(id, duration, tickCallback, options) {
    this._id = id || Util.uuid()
    this._startTime = undefined
    this._controller = undefined
    this._duration = duration || 0
    this._mode = 'speed'
    this._delegate = new Cesium.Entity()
    this._positions = []
    this._sampledPosition = undefined
    this._isActive = false
    this._tickCallback = tickCallback
    this._options = {
      ...DEF_OPTS,
      ...options
    }
    this._positionIndex = 0
    this._timeLine = []
    this._roamingEvent = new RoamingEvent()
    this._roamingEvent.on(
      RoamingEventType.POST_UPDATE,
      this._onPostUpdate,
      this
    )
    this._roamingEvent.on(RoamingEventType.ADD, this._onAdd, this)
    this._roamingEvent.on(RoamingEventType.REMOVE, this._onRemove, this)
    this._roamingEvent.on(RoamingEventType.ACTIVE, this._onActive, this)
    this._roamingEvent.on(RoamingEventType.RELEASE, this._onRelease, this)
    this._state = State.INITIALIZED
  }

  get id() {
    return this._id
  }

  get roamingEvent() {
    return this._roamingEvent
  }

  get state() {
    return this._state
  }

  get isActive() {
    return this._isActive
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._mountPosition()
    return this
  }

  get positions() {
    return this._positions
  }

  set startTime(startTime) {
    if (!startTime || !(startTime instanceof Date)) {
      throw new Error('Path: the start time invalid ')
    }
    this._startTime = Cesium.JulianDate.fromDate(startTime)
    this._mountPosition()
    return this
  }

  get startTime() {
    return this._startTime
  }

  /**
   * add to entities
   * @param controller
   * @private
   */
  _onAdd(controller) {
    this._controller = controller
    !this._startTime &&
      (this._startTime = controller.startTime || Cesium.JulianDate.now())
    this._mountPath()
    !this._delegate.position && this._mountPosition()
    this._mountedHook && this._mountedHook()
    this._state = State.ADDED
  }

  /**
   * remove from entities
   * @private
   */
  _onRemove() {
    if (this._controller) {
      this._controller.roamingLayer.remove(this._delegate)
      this._isActive && this._controller.releaseCamera()
      this._isActive = false
      this._state = State.REMOVED
    }
  }

  /**
   * @param params
   * @returns {boolean}
   * @private
   */
  _onPostUpdate(params) {
    let currentTime = params.currentTime
    let orientation = this._delegate.orientation.getValue(currentTime)
    let timePos = this._timeLine[this._positionIndex]
    if (timePos) {
      let timeDiff = Cesium.JulianDate.secondsDifference(currentTime, timePos)
      if (timeDiff >= 0 && timeDiff <= 1) {
        let position = this._positions[this._positionIndex]
        if (position && orientation) {
          let mat = Cesium.Matrix3.fromQuaternion(orientation)
          let mat4 = Cesium.Matrix4.fromRotationTranslation(
            mat,
            this._delegate.position.getValue(currentTime)
          )
          let hpr = Cesium.Transforms.fixedFrameToHeadingPitchRoll(mat4)
          position.heading = Cesium.Math.toDegrees(hpr.heading)
          position.pitch = Cesium.Math.toDegrees(hpr.pitch)
          position.roll = Cesium.Math.toDegrees(hpr.roll)
        }
        this._tickCallback &&
          this._tickCallback(
            position,
            this._positionIndex + 1 === this._positions.length
          )
        this._positionIndex += 1
      }
    }
    this._isActive &&
      this._setCameraView(currentTime, params.viewMode, params.viewOption)
  }

  /**
   * @private
   */
  _onActive() {
    this._isActive = true
  }

  /**
   *
   * @private
   */
  _onRelease() {
    this._isActive = false
  }

  /**
   * Sets camera position
   * @param currentTime
   * @param viewMode
   * @param viewOption
   * @private
   */
  _setCameraView(currentTime, viewMode, viewOption) {
    let viewer = this._controller._viewer.delegate
    let camera = this._controller._viewer.camera
    let tickPosition = this._sampledPosition.getValue(currentTime)
    let nextTickPosition = this._sampledPosition.getValue(
      Cesium.JulianDate.addSeconds(currentTime, 1 / 60, new Cesium.JulianDate())
    )
    if (tickPosition && nextTickPosition && viewMode) {
      if (viewMode === RoamingViewMode.TRACKED) {
        viewer.trackedEntity = this._delegate
      } else if (viewMode === RoamingViewMode.FP) {
        let heading = Cesium.Math.heading(tickPosition, nextTickPosition)
        let WGS84TickPosition = Transform.transformCartesianToWGS84(
          tickPosition
        )
        if (!isNaN(viewOption.alt)) {
          WGS84TickPosition.alt = viewOption.alt
        }
        camera.lookAt(
          Transform.transformWGS84ToCartesian(WGS84TickPosition),
          new Cesium.HeadingPitchRange(
            heading,
            Cesium.Math.toRadians(viewOption.pitch || 0),
            viewOption.range || 10
          )
        )
      } else if (viewMode === RoamingViewMode.TP) {
        camera.lookAt(
          tickPosition,
          new Cesium.HeadingPitchRange(0, -90, viewOption.range || 1000)
        )
      }
    } else {
      camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      viewer.trackedEntity = undefined
    }
  }

  /**
   * Mounts path
   * @private
   */
  _mountPath() {
    if (this._options.showPath) {
      this._delegate.availability = new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: this._startTime,
          stop: Cesium.JulianDate.addSeconds(
            this._startTime,
            this._duration,
            new Cesium.JulianDate()
          )
        })
      ])
      this._delegate.path = {
        material: this._options.pathMaterial,
        width: this._options.pathWidth,
        leadTime: this._options.pathLeadTime
      }
    }
  }

  /**
   * Mounts Position
   * @private
   */
  _mountPosition() {
    if (
      !this._startTime ||
      !this._duration ||
      !this._positions ||
      !this._positions.length
    ) {
      return false
    }

    let interval = 0
    if (this._mode === 'speed') {
      let v = Cesium.Math.distance(this._positions) / this._duration
      this._timeLine = this._positions.map((item, index, arr) => {
        if (index !== 0) {
          interval += Cesium.Math.distance([arr[index - 1], item]) / v
        }
        return Cesium.JulianDate.addSeconds(
          this._startTime,
          interval,
          new Cesium.JulianDate()
        )
      })
    } else {
      let len = this._positions.length
      let interval = (this._duration - (this._duration % len)) / len
      this._timeLine = this._positions.map((item, index) => {
        return Cesium.JulianDate.addSeconds(
          this._startTime,
          index * interval,
          new Cesium.JulianDate()
        )
      })
    }
    this._sampledPosition = new Cesium.SampledPositionProperty()
    this._sampledPosition.addSamples(
      this._timeLine,
      Transform.transformWGS84ArrayToCartesianArray(this._positions)
    )
    this._delegate.position = this._sampledPosition
    this._delegate.position.setInterpolationOptions({
      interpolationDegree: 1,
      interpolationAlgorithm: Cesium.LinearApproximation
    })
    this._delegate.orientation = new Cesium.VelocityOrientationProperty(
      this._sampledPosition
    )
  }

  /**
   * Mounted Hook
   * @private
   */
  _mountedHook() {
    this._controller.roamingLayer.add(this._delegate)
  }

  /**
   * Sets positions
   * @param positions
   * @returns {RoamingPath}
   */
  setPositions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._mountPosition()
    return this
  }

  /**
   * Adds Position
   * @param position
   * @param duration
   * @returns {RoamingPath}
   */
  addPosition(position, duration) {
    this._positions.push(Parse.parsePosition(position))
    this._duration += duration
    this._mountPosition()
    return this
  }

  /**
   * Sets mode
   * @param mode
   * @returns {RoamingPath}
   */
  setMode(mode) {
    this._mode = mode
    this._mountPosition()
    return this
  }

  /**
   * Sets model
   * @param modelPath
   * @param style
   * @returns {RoamingPath}
   */
  setModel(modelPath, style) {
    this._delegate.model = {
      ...style,
      uri: modelPath
    }
    return this
  }

  /**
   * Sets billboard
   * @param icon
   * @param style
   * @returns {RoamingPath}
   */
  setBillboard(icon, style) {
    this._delegate.billboard = {
      ...style,
      image: icon
    }
    return this
  }

  /**
   * Sets label
   * @param text
   * @param style
   * @returns {RoamingPath}
   */
  setLabel(text, style) {
    this._delegate.label = {
      ...style,
      text: text
    }
    return this
  }
}

export default RoamingPath
