/*
 * @Author: Caven
 * @Date: 2020-03-17 16:19:15
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-17 23:48:21
 */
import Cesium from '@/namespace'

class Edit {
  constructor(plotInfo) {
    this._viewer = plotInfo.viewer
    this._plotEvent = plotInfo.plotEvent
    this._layer = plotInfo.layer
    this._overlay = plotInfo.overlay
    this._markers = []
    this._currentMarker = undefined
  }

  _mouseClickHandler() {}

  _mouseMoveHandler() {}

  _mouseDbClickHandler() {}

  _bindEvent() {}

  _unbindEnvet() {}

  _createMarker() {}

  _prepareMarkers() {}

  start() {
    this._prepareMarkers()
  }
}

export default Edit
