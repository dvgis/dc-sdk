/*
 * @Author: Caven
 * @Date: 2020-01-31 15:51:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-20 13:45:36
 */
import Cesium from '@/namespace'
import DrawPoint from './draw/DrawPoint'
import DrawPolyline from './draw/DrawPolyline'
import DrawPolygon from './draw/DrawPolygon'
import DrawCircle from './draw/DrawCircle'
import DrawRect from './draw/DrawRect'

DC.Plot = class {
  constructor(viewer) {
    this._viewer = viewer
    this._plotEvent = new Cesium.Event()
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    this._callback = undefined
    this._drawWorker = undefined
    this._editWorker = undefined
    this._layer = new Cesium.CustomDataSource('dc-plot')
    this._viewer.delegate && this._viewer.delegate.dataSources.add(this._layer)
  }

  _completeCallback(e) {
    this._drawWorker = undefined
    this._viewer.tooltip.enable = false
    this._layer.entities.removeAll()
    if (this._callback) {
      this._callback.call(this, e)
    }
  }

  _bindEvent(callback) {
    this._plotEvent.removeEventListener(this._completeCallback, this)
    this._callback = callback
    this._plotEvent.addEventListener(this._completeCallback, this)
  }

  _createDrawWorker(type, style) {
    let info = {
      viewer: this._viewer,
      handler: this._handler,
      plotEvent: this._plotEvent,
      layer: this._layer
    }
    if (type === DC.OverlayType.POINT) {
      this._drawWorker = new DrawPoint(info, style)
    } else if (type === DC.OverlayType.POLYLINE) {
      this._drawWorker = new DrawPolyline(info, style)
    } else if (type === DC.OverlayType.POLYGON) {
      this._drawWorker = new DrawPolygon(info, style)
    } else if (type === DC.OverlayType.CIRCLE) {
      this._drawWorker = new DrawCircle(info, style)
    } else if (type === DC.OverlayType.RECT) {
      this._drawWorker = new DrawRect(info, style)
    }
  }

  _createEditWorker(overlay) {
    let info = {
      viewer: this._viewer,
      handler: this._handler,
      plotEvent: this._plotEvent,
      layer: this._layer
    }
  }

  draw(type, callback, style) {
    this._viewer.tooltip.enable = true
    this._bindEvent(callback)
    this._createDrawWorker(type, style)
    this._drawWorker.start()
  }

  edit(overlay, clallback) {
    this._bindEvent(callback)
  }
}
