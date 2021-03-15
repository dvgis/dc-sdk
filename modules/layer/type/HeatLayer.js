/**
 * @Author: Caven
 * @Date: 2020-02-27 00:35:35
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { SceneEventType } from '@dc-modules/event'
import { Transform } from '@dc-modules/transform'
import Position from '@dc-modules/position/Position'
import { DomUtil, Util } from '@dc-modules/utils'
import Layer from '../Layer'

const h337 = require('heatmap.js/build/heatmap.min')

const DEF_OPTS = {
  maxOpacity: 0.8, // the maximum opacity used if not given in the heatmap options object
  minOpacity: 0.1, // the minimum opacity used if not given in the heatmap options object
  blur: 0.85, // the blur used if not given in the heatmap options object
  maxCanvasSize: 2000,
  minCanvasSize: 700,
  radius: 25,
  gradient: {
    '0.4': 'blue',
    '0.6': 'green',
    '0.8': 'yellow',
    '0.9': 'red'
  }
}

class HeatLayer extends Layer {
  constructor(id, options) {
    super(id)
    this._options = {
      ...DEF_OPTS,
      ...options
    }
    this._heat = undefined
    this._bounds = undefined
    this._mBounds = undefined
    this._scale = 1
    this._positions = []
    this._options.spacing = this._options.radius * 1.5
    this._delegate = new Cesium.CustomDataSource(id)
    this._entity = new Cesium.Entity()
    this.type = Layer.getLayerType('heat')
    this._state = State.INITIALIZED
  }

  get options() {
    return this._options
  }

  /**
   * The hook for added
   */
  _addedHook() {
    this._redraw()
    this._viewer.on(SceneEventType.CAMERA_MOVE_END, this._reset, this)
  }

  /**
   * The hook for removed
   */
  _removedHook() {
    this._viewer.off(SceneEventType.CAMERA_MOVE_END, this._reset, this)
  }

  /**
   *
   * @param {*} position
   */
  _transformWGS84ToHeatmap(position) {
    position = Transform.transformWGS84ToMercator(position)
    let coord = {}
    coord.x = Math.round(
      (position.lng - this._mBounds.west) / this._scale + this._options.spacing
    )
    coord.y = Math.round(
      (position.lat - this._mBounds.south) / this._scale + this._options.spacing
    )
    coord.y = this._heat._renderer.canvas.height - coord.y
    return coord
  }

  /**
   *
   * @returns {{east: *, south: *, north: *, west: *}}
   * @private
   */
  _getMBounds() {
    let mWestSouth = Transform.transformWGS84ToMercator(
      new Position(this._bounds.west, this._bounds.south)
    )
    let mEastNorth = Transform.transformWGS84ToMercator(
      new Position(this._bounds.east, this._bounds.north)
    )
    return {
      west: mWestSouth.lng,
      south: mWestSouth.lat,
      east: mEastNorth.lng,
      north: mEastNorth.lat
    }
  }

  /**
   *
   * @private
   */
  _initCanvas() {
    let diffLng = Math.abs(this._mBounds.east - this._mBounds.west)
    let diffLat = Math.abs(this._mBounds.north - this._mBounds.south)
    let max = Math.max(diffLng, diffLat)
    let min = Math.min(diffLng, diffLat)
    let scale = 1
    if (max > this._options.maxCanvasSize) {
      scale = max / this._options.maxCanvasSize
      if (min / scale < this._options.minCanvasSize) {
        scale = min / this._options.minCanvasSize
      }
    } else if (min < this._options.minCanvasSize) {
      scale = min / this._options.minCanvasSize
      if (max / scale > this._options.maxCanvasSize) {
        scale = max / this._options.maxCanvasSize
      }
    }
    this._scale = scale
    if (!this._options.container) {
      this._options.container = DomUtil.create(
        'div',
        'heat-map',
        document.getElementsByClassName('dc-container')[0]
      )
    }
    this._options.container.style.cssText = `
    width:${diffLng / this._scale}px;
    height:${diffLat / this._scale}px;
    margin:0;
    display:none`
    if (!this._heat) {
      this._heat = h337.create(this._options)
    } else {
      this._heat.configure(this._options)
    }
  }

  /**
   *
   */
  _initEntity() {
    let offset = this._options.spacing * this._scale
    this._mBounds.west -= offset
    this._mBounds.south -= offset
    this._mBounds.east += offset
    this._mBounds.north += offset
    let westSouth = Transform.transformMercatorToWGS84({
      lng: this._mBounds.west,
      lat: this._mBounds.south
    })
    let eastNorth = Transform.transformMercatorToWGS84({
      lng: this._mBounds.east,
      lat: this._mBounds.north
    })
    let bounds = Cesium.Rectangle.fromDegrees(
      westSouth.lng,
      westSouth.lat,
      eastNorth.lng,
      eastNorth.lat
    )
    this._entity.show = false
    this._entity.rectangle = {
      coordinates: bounds,
      fill: false,
      distanceDisplayCondition: this._options.distanceDisplayCondition
    }
    this._delegate.entities.add(this._entity)
  }

  _reset() {
    let cameraHeight = Math.floor(
      this._viewer.camera.positionCartographic.height
    )
    let radius = (1e4 / cameraHeight) * 60
    if (radius < 10) {
      radius = 10
    }
    if (radius > 60) {
      radius = 60
    }
    this._options.radius = radius
    this._options.spacing = this._options.radius * 1.5
    this._heat && this._heat.configure(this._options)
  }

  _redraw() {
    /** set bounds */
    if (!this._bounds) {
      return false
    }
    let mBounds = this._getMBounds()
    if (
      !this._mBounds ||
      mBounds.west !== this._mBounds.west ||
      mBounds.south !== this._mBounds.south ||
      mBounds.east !== this._mBounds.east ||
      mBounds.north !== this._mBounds.north
    ) {
      this._mBounds = mBounds
      this._initCanvas()
    }
    let data = []
    this._positions.forEach(item => {
      let coord = this._transformWGS84ToHeatmap({
        lng: item.lng || item.x,
        lat: item.lat || item.y
      })
      data.push({
        x: coord.x,
        y: coord.y,
        value: item.value || 1
      })
    })
    this._heat.setData({
      min: 0,
      max: 1,
      data
    })
    this._delegate.entities.remove(this._entity)
    this._initEntity()
    let material = new Cesium.ImageMaterialProperty({
      image: this._heat._renderer.canvas,
      transparent: true
    })
    Util.merge(this._entity.rectangle, {
      fill: true,
      material: material
    })
    this._entity.show = true
  }

  /**
   *
   * @param {*} positions
   */
  setPositions(positions) {
    if (!positions || !Array.isArray(positions)) {
      return this
    }
    this._positions = positions
    this._bounds = Cesium.Math.bounds(this._positions)
    this._redraw()
    return this
  }

  /**
   *
   * @param {*} position
   */
  addPosition(position) {
    this._positions.push(position)
    this._bounds = Cesium.Math.bounds(this._positions)
    this._redraw()
    return this
  }

  /**
   *
   * @param {*} options
   */
  setOptions(options) {
    Util.merge(this._options, options)
    if (this._heat) {
      this._options.spacing = this._options.radius * 1.5
      this._heat.configure(this._options)
    }
    return this
  }
}

Layer.registerType('heat')

export default HeatLayer
