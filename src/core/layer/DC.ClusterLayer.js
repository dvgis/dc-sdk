/*
 * @Author: Caven
 * @Date: 2020-02-10 10:05:41
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-19 20:39:21
 */
import Cesium from '@/namespace'
import Layer from './Layer'

const DEF_OPT = {
  size: 48,
  pixelRange: 40,
  gradient: {
    0.0001: Cesium.Color.BLUE,
    0.001: Cesium.Color.GREEN,
    0.01: Cesium.Color.ORANGE,
    0.1: Cesium.Color.RED
  },
  fontSize: 14,
  fontColor: Cesium.Color.BLACK
}

DC.ClusterLayer = class extends Layer {
  constructor(id, options = {}) {
    super(id)
    this._delegate = new Cesium.CustomDataSource(id)
    this._options = {
      ...DEF_OPT,
      ...options
    }
    this._delegate.clustering.enabled = true
    this._delegate.clustering.clusterEvent.addEventListener(
      this._clusterEventHandler,
      this
    )
    this._circleCache = {}
    this._delegate.clustering.pixelRange = this._options.pixelRange
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.CLUSTER
  }

  _drawCircle(color) {
    let key = color.toCssColorString()
    let size = this._options.size
    if (!this._circleCache[key]) {
      let canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      let context2D = canvas.getContext('2d')
      context2D.save()
      context2D.scale(size / 24, size / 24) //Added to auto-generated code to scale up to desired size.
      context2D.fillStyle = color.withAlpha(0.2).toCssColorString() //Modified from auto-generated code.
      context2D.beginPath()
      context2D.arc(12, 12, 12, 0, 2 * Math.PI)
      context2D.closePath()
      context2D.fill()
      context2D.beginPath()
      context2D.arc(12, 12, 9, 0, 2 * Math.PI)
      context2D.fillStyle = color.toCssColorString()
      context2D.fill()
      context2D.closePath()
      context2D.restore()
      this._circleCache[key] = canvas.toDataURL()
    }
    return this._circleCache[key]
  }

  _clusterEventHandler(clusteredEntities, cluster) {
    cluster.billboard.show = true
    cluster.label.font = `bold ${this._options.fontSize}px sans-serif`
    cluster.label.fillColor = this._options.fontColor
    cluster.label.disableDepthTestDistance = Number.POSITIVE_INFINITY
    if (this._delegate.entities.values.length) {
      let allCount = this._delegate.entities.values.length || 0
      for (let key in this._options.gradient) {
        if (clusteredEntities.length >= allCount * key) {
          cluster.billboard.image = this._drawCircle(
            this._options.gradient[key]
          )
          cluster.label.show = true
          let numLenth = String(clusteredEntities.length + ',').length
          cluster.label.pixelOffset = new Cesium.Cartesian2(
            -(this._options.size / this._options.fontSize) * (numLenth - 1),
            6
          )
        } else if (clusteredEntities.length <= 1) {
          cluster.label.show = false
        }
      }
    }
  }

  addOverlays(overlays) {
    if (Array.isArray(overlays)) {
      overlays.forEach(item => {
        this.addOverlay(item)
      })
    }
    return this
  }

  clear() {
    this._cache = {}
    this._delegate.entities.removeAll()
    this._state = DC.LayerState.CLEARED
    return this
  }
}

DC.LayerType.CLUSTER = 'cluster'
