/*
 * @Author: Caven
 * @Date: 2020-01-31 19:45:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-17 22:16:28
 */
import Cesium from '@/namespace'

class Draw {
  constructor(plotInfo) {
    this._viewer = plotInfo.viewer
    this._plotEvent = plotInfo.plotEvent
    this._layer = plotInfo.layer
    this._delegate = new Cesium.Entity()
  }

  _mouseClickHandler() {}

  _mouseMoveHandler() {}

  _mouseDbClickHandler() {}

  _bindEvent() {
    this._viewer.on(
      Cesium.ScreenSpaceEventType.LEFT_CLICK,
      this._mouseClickHandler,
      this
    )

    this._viewer.on(
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      this._mouseMoveHandler,
      this
    )

    this._viewer.on(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
      this._mouseDbClickHandler,
      this
    )
  }

  _unbindEnvet() {
    this._viewer.off(
      Cesium.ScreenSpaceEventType.LEFT_CLICK,
      this._mouseClickHandler,
      this
    )

    this._viewer.off(
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      this._mouseMoveHandler,
      this
    )

    this._viewer.off(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
      this._mouseDbClickHandler,
      this
    )
  }

  _prepareDelegate() {}

  start() {
    this._bindEvent()
    this._prepareDelegate()
  }
}

export default Draw
