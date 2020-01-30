/*
 * @Author: Caven
 * @Date: 2019-12-30 09:24:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-21 17:09:01
 */

import Cesium from '@/namespace'

class ViewerOption {
  constructor(viewer) {
    this._viewer = viewer
    this._init()
  }

  _init() {
    this._viewer.delegate._cesiumWidget._creditContainer.style.display = 'none'
    this._viewer.delegate.scene.backgroundColor = Cesium.Color.TRANSPARENT
    this._viewer.delegate.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )
  }

  _setViewerOption(option) {
    this._viewer.delegate.shadows = Cesium.defaultValue(option.shadows, false)
    return this
  }

  _setCanvasOption(option) {
    return this
  }

  _setSceneOption(option) {
    return this
  }

  _setGlobeOption(option) {
    return this
  }

  _setClockOption(option) {
    this._viewer.delegate.clock.shouldAnimate = Cesium.defaultValue(option.shouldAnimate, false)
    return this
  }

  setOptions(option) {
    return this
  }
}

export default ViewerOption
