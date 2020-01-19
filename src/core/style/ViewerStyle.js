/*
 * @Author: Caven
 * @Date: 2019-12-30 09:24:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 10:19:53
 */

import Cesium from '@/namespace'

class ViewerStyle {
  constructor(viewer) {
    this._viewer = viewer
    this._init()
  }

  _init() {
    this._viewer.delegate._cesiumWidget._creditContainer.style.display = 'none'
    this._viewer.delegate.scene.backgroundColor = Cesium.Color.TRANSPARENT
    this._viewer.delegate.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  _setViewerStyle(option) {
    this._viewer.delegate.shadows = Cesium.defaultValue(option.shadows, false)
  }

  _setCanvasStyle(option) {}

  _setSceneStyle(option) {}

  _setGlobeStyle(option) {}

  _setClockStyle(option) {
    this._viewer.delegate.clock.shouldAnimate = Cesium.defaultValue(option.shouldAnimate, false)
  }

  setOption(option) {
    this._setViewerStyle(option) //设置viewer样式
      ._setCanvasStyle(option) //设置画布样式
      ._setSceneStyle(option) //设置场景样式
      ._setGlobeStyle(option) //设置地球样式
      ._setClockStyle(option) //设置事件样式
    return this
  }
}

export default ViewerStyle
