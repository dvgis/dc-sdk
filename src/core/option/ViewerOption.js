/*
 * @Author: Caven
 * @Date: 2019-12-30 09:24:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 09:42:29
 */

import Cesium from '@/namespace'

class ViewerOption {
  constructor(viewer) {
    this._viewer = viewer
    this._options = {}
    this._init()
  }

  _init() {
    this._viewer.delegate.cesiumWidget._creditContainer.style.display = 'none'
    this._viewer.delegate.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )
    this._viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40489014.0
    this._viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT
    this._viewer.delegate.imageryLayers.removeAll()
  }

  _setViewerOption() {
    this._viewer.delegate.shadows = Cesium.defaultValue(
      this._options.shadows,
      false
    )
    return this
  }

  _setCanvasOption() {
    options.tabIndex &&
      this._viewer.scene.canvas.setAttribute('tabIndex', this._options.tabIndex)
    return this
  }

  _setSceneOption() {
    this._viewer.scene.skyAtmosphere.show = Cesium.defaultValue(
      this._options.showAtmosphere,
      true
    )
    this._viewer.scene.sun.show = Cesium.defaultValue(
      this._options.showSun,
      true
    )
    this._viewer.scene.moon.show = Cesium.defaultValue(
      this._options.showMoon,
      true
    )

    this._viewer.scene.skyBox.show = Cesium.defaultValue(
      this._options.showSkyBox,
      true
    )

    this._viewer.scene.postProcessStages.fxaa.enabled = Cesium.defaultValue(
      this._options.enableFxaa,
      false
    )

    this._viewer.scene.screenSpaceCameraController.enableRotate = Cesium.defaultValue(
      this._options.enableRotate,
      true
    )
    this._viewer.scene.screenSpaceCameraController.enableTilt = Cesium.defaultValue(
      this._options.enableTilt,
      true
    )
    this._viewer.scene.screenSpaceCameraController.enableTranslate = Cesium.defaultValue(
      this._options.enableTranslate,
      true
    )
    this._viewer.scene.screenSpaceCameraController.enableZoom = Cesium.defaultValue(
      this._options.enableZoom,
      true
    )
    this._viewer.scene.screenSpaceCameraController.maximumZoomDistance = Cesium.defaultValue(
      this._options.maxZoomDistance,
      40489014.0
    )
    this._viewer.scene.screenSpaceCameraController.minimumZoomDistance = Cesium.defaultValue(
      this._options.minZoomDistance,
      1.0
    )

    return this
  }

  _setGlobeOption() {
    this._viewer.scene.globe.show = Cesium.defaultValue(
      this._options.showGlobe,
      true
    )
    this._viewer.scene.globe.enableLighting = Cesium.defaultValue(
      this._options.enableLighting,
      false
    )

    this._viewer.scene.globe.depthTestAgainstTerrain = Cesium.defaultValue(
      this._options.undergroundMode,
      false
    )
    return this
  }

  _setClockOption() {
    this._viewer.clock.shouldAnimate = Cesium.defaultValue(
      this._options.shouldAnimate,
      true
    )
    return this
  }

  setOptions(options) {
    if (Object.keys(options).length === 0) {
      return this
    }
    this._options = {
      ...this._options,
      ...options
    }
    this._setViewerOption()
      ._setCanvasOption()
      ._setSceneOption()
      ._setGlobeOption()
      ._setClockOption()
    return this
  }
}

export default ViewerOption
