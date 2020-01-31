/*
 * @Author: Caven
 * @Date: 2020-01-31 19:45:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 19:55:19
 */
import Cesium from '@/namespace'

class Draw {
  constructor(plotInfo) {
    this._viewer = plotInfo.viewer
    this._handler = plotInfo.handler
    this._plotEvent = plotInfo.plotEvent
    this._layer = plotInfo.layer
    this._delegate = new Cesium.Entity()
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
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  _prepareDelegate() {}

  start() {
    this._bindEvent()
    this._prepareDelegate()
  }
}

export default Draw
