/*
 * @Author: Caven
 * @Date: 2020-02-27 00:35:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-27 15:40:20
 */
import Cesium from '@/namespace'
import Layer from '@/core/layer/Layer'

const h337 = require('heatmap')
const WMP = new Cesium.WebMercatorProjection()
const DEF_OPTS = {
  maxOpacity: 0.8, // the maximum opacity used if not given in the heatmap options object
  minOpacity: 0.1, // the minimum opacity used if not given in the heatmap options object
  blur: 0.85, // the blur used if not given in the heatmap options object
  xField: 'lng',
  yField: 'lat',
  gradient: {
    '0.5': 'blue',
    '0.8': 'red',
    '0.95': 'white',
    '0.6': 'yellow',
    '0.5': 'green'
  }
}
DC.HeatmapLayer = class extends Layer {
  constructor(id, bounds, options) {
    if (!bounds || bounds.length !== 2) {
      throw new Error('the bounds is empty')
    }
    super(id)
    this._options = {
      ...DEF_OPTS,
      ...options
    }
    this._delegate = new Cesium.CustomDataSource(id)
    this._data = []
    this._width = 0
    this._height = 0
    this._scale = 1
    this._mBounds = this._computeMercatorBounds(bounds)
    this._oriX = this._mBounds.west
    this._oriY = this._mBounds.south
    this._computeWidthAndHeight()
    this._options.radius = Math.round(
      this._options.radius
        ? this._options.radius
        : Math.max(this._width, this._height) / 60
    )
    this._spacing = this._options.radius * 1.5
    this._heatmapInstance = undefined
    this._entity = new Cesium.Entity()
    this._prepareHeatmap()
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.HEAT
  }

  set show(show) {
    this._show = show
  }

  get show() {
    return this._show
  }

  /**
   *
   * @param {*} position
   */
  _transformWgs84ToMercator(position) {
    let mp = WMP.project(
      Cesium.Cartographic.fromDegrees(position.lng, position.lat)
    )
    return {
      lng: mp.x,
      lat: mp.y
    }
  }

  /**
   *
   * @param {*} position
   */
  _transformMercatorToWgs84(position) {
    let mp = WMP.unproject(new Cesium.Cartesian3(position.lng, position.lat))
    return {
      lng: Cesium.Math.toDegrees(mp.longitude),
      lat: Cesium.Math.toDegrees(mp.latitude)
    }
  }

  /**
   *
   * @param {*} position
   */
  _transformWgs84ToHeatmap(position) {
    position = this._transformWgs84ToMercator(position)
    let coord = {}
    coord.lng = Math.round(
      (position.lng - this._oriX) / this._scale + this._spacing
    )
    coord.lat = Math.round(
      (position.lat - this._oriY) / this._scale + this._spacing
    )
    coord.lat = this._height - coord.lat
    return coord
  }

  /**
   *
   * @param {*} bounds
   */
  _computeMercatorBounds(bounds) {
    let mWestSouth = this._transformWgs84ToMercator(bounds[0])
    let mEastNorth = this._transformWgs84ToMercator(bounds[1])
    return {
      west: mWestSouth.lng,
      south: mWestSouth.lat,
      east: mEastNorth.lng,
      north: mEastNorth.lat
    }
  }

  /**
   *
   */
  _computeWidthAndHeight() {
    this._width =
      this._mBounds.east > 0 && this._mBounds.west < 0
        ? this._mBounds.east + Math.abs(this._mBounds.west)
        : Math.abs(this._mBounds.east - this._mBounds.west)
    this._height =
      this._mBounds.north > 0 && this._mBounds.south < 0
        ? this._mBounds.north + Math.abs(this._mBounds.south)
        : Math.abs(this._mBounds.north - this._mBounds.south)
    let maxCanvasSize = 2000
    let minCanvasSize = 700
    let max = Math.max(this._width, this._height)
    let min = Math.min(this._width, this._height)
    if (max > maxCanvasSize) {
      this._scale = max / maxCanvasSize
      if (min / this._scale < minCanvasSize) {
        this._scale = min / minCanvasSize
      }
    } else if (min < minCanvasSize) {
      this._scale = min / minCanvasSize
      if (max > maxCanvasSize) {
        this._scale = max / maxCanvasSize
      }
    }
    this._width = this._width / this._scale
    this._height = this._height / this._scale
  }

  /**
   *
   */
  _prepareHeatmap() {
    let width = Math.round(this._width + this._spacing * 2)
    let height = Math.round(this._height + this._spacing * 2)
    let container = DC.DomUtil.create(
      'div',
      'heat-map',
      document.getElementsByClassName('dc-container')[0]
    )
    container.style.cssText = `
    width:${width}px;
    height:${height}px;
    margin:0;
    display:none`

    this._options.container = container
    this._heatmapInstance = h337.create(this._options)
    let offset = this._spacing * this._scale
    let westSouth = this._transformMercatorToWgs84({
      lng: this._mBounds.west - offset,
      lat: this._mBounds.south - offset
    })
    let eastNorth = this._transformMercatorToWgs84({
      lng: this._mBounds.east + offset,
      lat: this._mBounds.north + offset
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
      fill: false
    }
    this._delegate.entities.add(this._entity)
  }

  _parseData() {
    let data = []
    if (!this._data || !this._data.length) {
      return {
        min: 0,
        max: 0,
        data
      }
    }
    let min = this._data[0] && this._data[0].value ? this._data[0].value : 0
    let max = this._data[0] && this._data[0].value ? this._data[0].value : 1
    this._data.forEach(item => {
      min = Math.min(min, item.value)
      max = Math.max(max, item.value)
      let coord = this._transformWgs84ToHeatmap({
        lng: item.lng || item.x,
        lat: item.lat || item.y
      })
      data.push({
        lng: coord.lng,
        lat: coord.lat,
        value: item.value || 0
      })
    })
    return {
      min,
      max,
      data
    }
  }

  _reDraw() {
    this._heatmapInstance.setData(this._parseData())
  }

  setPositions(positions) {
    if (!positions || !Array.isArray(positions)) {
      return this
    }
    this._data = positions
    this._reDraw()
    if (this._entity && this._entity.rectangle) {
      let material = new Cesium.ImageMaterialProperty({
        image: this._heatmapInstance._renderer.canvas,
        transparent: true
      })
      this._entity.show = true
      DC.Util.merge(this._entity.rectangle, {
        fill: true,
        material: material
      })
    }
  }
}
