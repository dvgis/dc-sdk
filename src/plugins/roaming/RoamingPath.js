/*
 * @Author: Caven
 * @Date: 2020-01-19 11:21:48
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:30:00
 */

import RoamingEventType from './RoamingEventType'
import RoamingEvent from './RoamingEvent'

const { Util, State, Transform, Parse } = DC
const { Cesium } = DC.Namespace

const DEF_OPTS = {
  showPath: false,
  pathWidth: 1,
  pathMaterial: Cesium.Color.ORANGE.withAlpha(0.8),
  pathLeadTime: 1
}

class RoamingPath {
  constructor(id, tickCallback, options) {
    this._id = id || Util.uuid()
    this._startTime = undefined
    this._controller = undefined
    this._duration = 0
    this._mode = 'speed'
    this._delegate = new Cesium.Entity()
    this._positions = []
    this._isActive = false
    this._tickCallback = tickCallback
    this._options = {
      ...DEF_OPTS,
      ...options
    }
    this._positionIndex = 0
    this._timeLine = []
    this._sampledPositions = undefined
    this._roamingEvent = new RoamingEvent()
    this._roamingEvent.on(RoamingEventType.TICK, this._tickHandler, this)
    this._roamingEvent.on(RoamingEventType.ADD, this._addHandler, this)
    this._roamingEvent.on(RoamingEventType.REMOVE, this._removeHandler, this)
    this._roamingEvent.on(RoamingEventType.ACTIVE, this._activeHandler, this)
    this._state = State.INITIALIZED
  }

  set startTime(startTime) {
    this._startTime = startTime
  }

  set duration(duration) {
    this._duration = duration
  }

  get roamingEvent() {
    return this._roamingEvent
  }

  get state() {
    return this._state
  }

  _addHandler(controller) {
    this._controller = controller
    this._mountedHook && this._mountedHook()
    this._controller._viewer.delegate.entities.add(this._delegate)
    this._state = State.ADDED
  }

  _removeHandler() {
    if (this._controller) {
      this._controller._viewer.delegate.entities.remove(this._delegate)
      this.state = State.REMOVED
    }
  }

  _setView(currentTime, viewMode, viewOption) {
    let viewer = this._controller._viewer.delegate
    let camera = this._controller._viewer.camera
    let tickPosition = this._sampledPosition.getValue(currentTime)
    let nextTick = Cesium.JulianDate.addSeconds(
      currentTime,
      1 / 60,
      new Cesium.JulianDate()
    )
    let nextTickPosition = this._sampledPosition.getValue(nextTick)
    if (tickPosition && nextTickPosition) {
      if (viewMode === 0) {
        viewer.trackedEntity = this._delegate
      } else if (viewMode === 1) {
        let heading = Cesium.Math.heading(tickPosition, nextTickPosition)
        let WGS84TickPosition = Transform.transformCartesianToWGS84(
          tickPosition
        )
        WGS84TickPosition.alt = viewOption.alt || 5
        camera.lookAt(
          Transform.transformWGS84ToCartesian(WGS84TickPosition),
          new Cesium.HeadingPitchRange(
            heading,
            Cesium.Math.toRadians(viewOption.pitch || 0),
            viewOption.range || 10
          )
        )
      } else if (viewMode === 2) {
        camera.lookAt(
          tickPosition,
          new Cesium.HeadingPitchRange(
            0,
            Cesium.Math.toRadians(viewOption.pitch || -30),
            viewOption.range || 10
          )
        )
      }
    } else {
      camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      viewer.trackedEntity = undefined
    }
  }

  _tickHandler(currentTime, viewMode, viewOption) {
    let orientation = this._delegate.orientation.getValue(currentTime)
    let timePos = this._timeLine[this._positionIndex]
    if (timePos) {
      let timeDiff = Cesium.JulianDate.secondsDifference(currentTime, timePos)
      if (timeDiff >= 0 && timeDiff <= 1) {
        this._tickCallback &&
          this._tickCallback(
            this._positions[this._positionIndex],
            orientation,
            this._positionIndex + 1 === this._positions.length
          )
        this._positionIndex += 1
      }
    }
    this._isActive && this._setView(currentTime, viewMode, viewOption)
  }

  _activeHandler(id) {
    this._isActive = this._id === id
  }

  _mountedPosition() {
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
  }

  _mountedHook() {}

  setMode(mode) {
    this._mode = mode
    this._mountedPosition()
    return this
  }

  setPositions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._mountedPosition()
    return this
  }

  setModel(modelPath, style) {
    this._delegate.model = {
      ...style,
      uri: modelPath
    }
    return this
  }

  setBillboard(icon, style) {
    this._delegate.billboard = {
      ...style,
      image: icon
    }
    return this
  }

  setText(text, style) {
    this._delegate.text = {
      ...style,
      text: text
    }
    return this
  }
}

export default RoamingPath
