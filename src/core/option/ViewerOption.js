/*
 * @Author: Caven
 * @Date: 2019-12-30 09:24:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-16 20:27:54
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
    let scene = this._viewer.scene
    scene.skyAtmosphere.show = Cesium.defaultValue(
      this._options.showAtmosphere,
      true
    )
    scene.sun.show = Cesium.defaultValue(this._options.showSun, true)

    scene.moon.show = Cesium.defaultValue(this._options.showMoon, true)

    scene.skyBox.show = Cesium.defaultValue(this._options.showSkyBox, true)

    scene.postProcessStages.fxaa.enabled = Cesium.defaultValue(
      this._options.enableFxaa,
      false
    )

    scene.screenSpaceCameraController.enableRotate = Cesium.defaultValue(
      this._options.enableRotate,
      true
    )

    scene.screenSpaceCameraController.enableTilt = Cesium.defaultValue(
      this._options.enableTilt,
      true
    )

    scene.screenSpaceCameraController.enableTranslate = Cesium.defaultValue(
      this._options.enableTranslate,
      true
    )

    scene.screenSpaceCameraController.enableZoom = Cesium.defaultValue(
      this._options.enableZoom,
      true
    )

    scene.screenSpaceCameraController.maximumZoomDistance = Cesium.defaultValue(
      this._options.maxZoomDistance,
      40489014.0
    )

    scene.screenSpaceCameraController.minimumZoomDistance = Cesium.defaultValue(
      this._options.minZoomDistance,
      1.0
    )

    return this
  }

  _setGlobeOption() {
    let globe = this._viewer.scene.globe

    globe.show = Cesium.defaultValue(this._options.showGlobe, true)

    globe.enableLighting = Cesium.defaultValue(
      this._options.enableLighting,
      false
    )

    globe.depthTestAgainstTerrain = Cesium.defaultValue(
      this._options.undergroundMode,
      false
    )

    globe.tileCacheSize = Cesium.defaultValue(this._options.tileCacheSize, 100)

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
