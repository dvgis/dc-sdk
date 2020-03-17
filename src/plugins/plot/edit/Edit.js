/*
 * @Author: Caven
 * @Date: 2020-03-17 16:19:15
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-17 20:17:37
 */
import Cesium from '@/namespace'

class Edit {
  constructor(plotInfo) {
    this._viewer = plotInfo.viewer
    this._handler = plotInfo.handler
    this._plotEvent = plotInfo.plotEvent
    this._layer = plotInfo._layer
    this._overlay = plotInfo.overlay
    this._editMarkers = []
  }

  _bindEvent() {
    this._handler.setInputAction(movement => {
      this._mouseClickHandler && this._mouseClickHandler(movement)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    this._handler.setInputAction(movement => {
      this._mouseMoveHandler && this._mouseMoveHandler(movement)
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    this._handler.setInputAction(movement => {
      this._mouseDbClickHandler && this._mouseDbClickHandler(movement)
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  _unbindEnvet() {
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this._handler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )
  }

  _prepareMarkers() {}

  start() {
    this._bindEvent()
    this._prepareMarkers()
  }
}

export default Edit
