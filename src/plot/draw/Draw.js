/*
 * @Author: Caven
 * @Date: 2020-01-31 19:45:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 09:39:12
 */

const { Cesium } = DC.Namespace

class Draw {
  constructor(plotInfo) {
    this._viewer = plotInfo.viewer
    this._plotEvent = plotInfo.plotEvent
    this._layer = plotInfo.layer
    this._delegate = new Cesium.Entity()
  }

  _mouseClickHandler() {}

  _mouseMoveHandler() {}

  _mouseRightClickHandler() {}

  _prepareDelegate() {}

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
      Cesium.ScreenSpaceEventType.RIGHT_CLICK,
      this._mouseRightClickHandler,
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
      Cesium.ScreenSpaceEventType.RIGHT_CLICK,
      this._mouseRightClickHandler,
      this
    )
  }

  start() {
    this._bindEvent()
    this._prepareDelegate()
  }
}

export default Draw
