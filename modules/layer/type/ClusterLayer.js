/**
 * @Author: Caven
 * @Date: 2020-02-10 10:05:41
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Layer from '../Layer'

const DEF_OPT = {
  size: 18,
  pixelRange: 40,
  gradient: {
    0.0001: Cesium.Color.DEEPSKYBLUE,
    0.001: Cesium.Color.GREEN,
    0.01: Cesium.Color.ORANGE,
    0.1: Cesium.Color.RED
  },
  fontSize: 12,
  fontColor: Cesium.Color.BLACK,
  style: 'circle'
}

class ClusterLayer extends Layer {
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
    this._delegate.clustering.pixelRange = this._options.pixelRange
    this.type = Layer.getLayerType('cluster')
    this._state = State.INITIALIZED
  }

  set enableCluster(enableCluster) {
    this._delegate.clustering.enabled = enableCluster
    return this
  }

  /**
   *
   * @param color
   * @param numLength
   * @returns {*}
   * @private
   */
  _drawCircle(color, numLength) {
    let size = this._options.size * (numLength + 1)
    let key = color.toCssColorString() + '-' + size
    if (!this._cache[key]) {
      let canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      let context2D = canvas.getContext('2d')
      context2D.save()
      context2D.scale(size / 24, size / 24) //Added to auto-generated code to scale up to desired size.
      context2D.fillStyle = color.withAlpha(0.2).toCssColorString() //Modified from auto-generated code.
      context2D.beginPath()
      context2D.arc(12, 12, 9, 0, 2 * Math.PI)
      context2D.closePath()
      context2D.fill()
      context2D.beginPath()
      context2D.arc(12, 12, 6, 0, 2 * Math.PI)
      context2D.fillStyle = color.toCssColorString()
      context2D.fill()
      context2D.closePath()
      context2D.restore()
      this._cache[key] = canvas.toDataURL()
    }
    return this._cache[key]
  }

  /**
   *
   * @param color
   * @param numLength
   * @returns {*}
   * @private
   */
  _drawClustering(color, numLength) {
    let size = this._options.size * (numLength + 1)
    let key = color.toCssColorString() + '-' + size
    let startAngle = -Math.PI / 12
    let angle = Math.PI / 2
    let intervalAngle = Math.PI / 6
    if (!this._cache[key]) {
      let canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      let context2D = canvas.getContext('2d')
      context2D.save()
      context2D.scale(size / 24, size / 24) //Added to auto-generated code to scale up to desired size.
      context2D.beginPath()
      context2D.arc(12, 12, 6, 0, 2 * Math.PI)
      context2D.fillStyle = color.toCssColorString()
      context2D.fill()
      context2D.closePath()
      context2D.lineWidth = 2
      for (let i = 0; i < 3; i++) {
        context2D.beginPath()
        context2D.arc(12, 12, 8, startAngle, startAngle + angle, false)
        context2D.strokeStyle = color.withAlpha(0.4).toCssColorString()
        context2D.stroke()
        context2D.arc(12, 12, 11, startAngle, startAngle + angle, false)
        context2D.strokeStyle = color.withAlpha(0.2).toCssColorString()
        context2D.stroke()
        context2D.closePath()
        startAngle = startAngle + angle + intervalAngle
      }
      context2D.restore()
      this._cache[key] = canvas.toDataURL()
    }
    return this._cache[key]
  }

  /**
   *
   * @param {*} clusteredEntities
   * @param {*} cluster
   */
  _clusterEventHandler(clusteredEntities, cluster) {
    if (!this._delegate.clustering.enabled) {
      return
    }
    cluster.billboard.show = true
    cluster.label.font = `bold ${this._options.fontSize}px sans-serif`
    cluster.label.fillColor = this._options.fontColor
    cluster.label.disableDepthTestDistance = Number.POSITIVE_INFINITY
    if (this._delegate.entities.values.length) {
      let allCount = this._delegate.entities.values.length || 0
      for (let key in this._options.gradient) {
        if (clusteredEntities.length >= allCount * key) {
          let numLength = String(clusteredEntities.length).length
          if (this._options.style === 'circle') {
            cluster.billboard.image = this._drawCircle(
              this._options.gradient[key],
              numLength
            )
          } else {
            cluster.billboard.image = this._drawClustering(
              this._options.gradient[key],
              numLength
            )
          }
          cluster.label.show = true
          if (numLength === 1) {
            cluster.label.pixelOffset = new Cesium.Cartesian2(-2, 3)
          } else {
            cluster.label.pixelOffset = new Cesium.Cartesian2(
              -5 * (numLength - 1),
              5
            )
          }
        } else if (clusteredEntities.length <= 1) {
          cluster.label.show = false
        }
      }
    }
  }

  clear() {
    this._delegate.entities.removeAll()
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('cluster')

export default ClusterLayer
