/*
 * @Author: Caven
 * @Date: 2019-12-30 09:24:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-01 21:44:39
 */

import Cesium from '@/namespace'

class ViewerOption {
  constructor(viewer) {
    this._viewer = viewer
    this._init()
  }

  _init() {
    this._viewer.delegate.cesiumWidget._creditContainer.style.display = 'none'
    this._viewer.delegate.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    this._viewer.delegate.scene.screenSpaceCameraController.maximumZoomDistance = 40489014.0
    this._viewer.delegate.scene.backgroundColor = Cesium.Color.TRANSPARENT
  }

  _setViewerOption(options) {
    this._viewer.delegate.shadows = Cesium.defaultValue(options.shadows, false)
    return this
  }

  _setCanvasOption(options) {
    return this
  }

  _setSceneOption(options) {
    return this
  }

  _setGlobeOption(options) {
    return this
  }

  _setClockOption(options) {
    this._viewer.delegate.clock.shouldAnimate = Cesium.defaultValue(options.shouldAnimate, false)
    return this
  }

  setOptions(options) {
    this._setViewerOption(options)
      ._setCanvasOption(options)
      ._setClockOption(options)
    return this
  }
}

export default ViewerOption
