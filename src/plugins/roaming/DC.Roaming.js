/*
 * @Author: Caven
 * @Date: 2020-01-19 11:21:48
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 17:17:16
 */
import Cesium from '@/namespace'

const DEF_PAHT_STYLE = {
  resolution: 1,
  material: new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.1,
    color: Cesium.Color.YELLOW
  }),
  width: 10
}

DC.Roaming = class {
  constructor(viewer, options) {
    this._viewer = viewer
    this._positions = []
    this._modelPath = options.modelPath
    this._modelScale = options.modelScale || 1
    this._modelShow = options.modelShow || true
    this._time = options.time || 360
    this._startTime = undefined
    this._endTime = undefined
    this._showPath = options.showPath || false
    this._delegate = new Cesium.Entity()
    this._perspective = options.perspective || 0
    this._parsePositions(options.positions)
  }

  /**
   *
   * @param {*} positions
   */
  _parsePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';')
    }
    this._positions = positions.map(item => {
      if (Array.isArray(item)) {
        return DC.Position.fromCoordArray(item)
      } else {
        return DC.Position.fromCoordString(item)
      }
    })
  }

  _preparePositionProperty() {
    var property = new Cesium.SampledPositionProperty()
    if (this._positions.length) {
      let timeInterval = this._time - (this._time % this._positions.length)
      this._startTime = Cesium.JulianDate.now()
      let increment = timeInterval / this._positions.length
      this._endTime = Cesium.JulianDate.addSeconds(this._startTime, timeInterval, new Cesium.JulianDate())
      this._positions.forEach((item, index) => {
        let time = Cesium.JulianDate.addSeconds(this._startTime, index * increment, new Cesium.JulianDate())
        property.addSample(time, DC.T.transformWSG84ToCartesian(item))
      })
    }
    return property
  }

  _prepareDelegate() {
    let property = this._preparePositionProperty()
    this._delegate.merge({
      position: property,
      orientation: new Cesium.VelocityOrientationProperty(property),
      model: {
        uri: this._modelPath,
        scale: this._modelScale,
        show: this._modelShow
      },
      path: {
        ...DEF_PAHT_STYLE,
        show: this._showPath
      }
    })
    if (this._startTime && this._endTime) {
      this._delegate.availability = new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: this._startTime,
          stop: this._endTime
        })
      ])
    }
    this._delegate.position.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
    })
  }

  _setClock() {
    this._viewer.delegate.clock.startTime = this._startTime.clone()
    this._viewer.delegate.clock.stopTime = this._endTime.clone()
    this._viewer.delegate.clock.currentTime = this._startTime.clone()
    this._viewer.delegate.clock.clockRange = Cesium.ClockRange.UNBOUNDED
  }

  /**
   *
   * @param {*} speed
   */
  setSpeed(speed) {
    this._viewer.delegate.clock.multiplier = speed
  }

  /**
   *
   * @param {*} perspective
   */
  setPerspective(perspective) {
    this._perspective = perspective
    if (this._delegate.model) {
      if (perspective === 0) {
        this._viewer.delegate.trackedEntity = this._delegate
      } else if (perspective === 1) {
        this._viewer.delegate.trackedEntity = undefined
        this._viewer.delegate.zoomTo(this._delegate, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90)))
      }
    }
  }

  reset() {
    this._prepareDelegate()
    this._setClock()
    this._viewer.delegate.clock.multiplier = 1
  }

  start() {
    this._viewer.delegate.entities.remove(this._delegate)
    this._prepareDelegate()
    this._setClock()
    this._viewer.delegate.entities.add(this._delegate)
  }

  stop() {
    this._viewer.delegate.entities.remove(this._delegate)
    this._viewer.delegate.clock.multiplier = 1
    this._viewer.delegate.trackedEntity = undefined
  }
}
