/**
 * @Author: Caven
 * @Date: 2019-12-30 09:24:37
 */

import { Cesium } from '@dc-modules/namespace'
import { Util } from '@dc-modules/utils'

class ViewerOption {
  constructor(viewer) {
    this._viewer = viewer
    this._options = {}
    this._init()
  }

  /**
   * Init viewer
   * @private
   */
  _init() {
    this._viewer.delegate.cesiumWidget.creditContainer.style.display = 'none'
    this._viewer.delegate.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )
    this._viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40489014.0
    this._viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT
    this._viewer.delegate.imageryLayers.removeAll()
  }

  /**
   * Sets viewer option
   * @returns {ViewerOption}
   * @private
   */
  _setViewerOption() {
    this._viewer.delegate.shadows = this._options?.shadows ?? false
    this._viewer.delegate.resolutionScale =
      this._options?.resolutionScale || 1.0
    return this
  }

  /**
   * sets canvas option
   * @returns {ViewerOption}
   * @private
   */
  _setCanvasOption() {
    this._options.tabIndex &&
      this._viewer.scene.canvas.setAttribute('tabIndex', this._options.tabIndex)
    return this
  }

  /**
   * Sets scene option
   * @returns {ViewerOption}
   * @private
   */
  _setSceneOption() {
    let scene = this._viewer.scene

    scene.skyAtmosphere.show = this._options.showAtmosphere ?? true

    scene.sun.show = this._options.showSun ?? true

    scene.moon.show = this._options.showMoon ?? true

    scene.postProcessStages.fxaa.enabled = this._options.enableFxaa ?? false

    return this
  }

  /**
   *
   * @returns {ViewerOption}
   * @private
   */
  _setSkyBoxOption() {
    if (!this._options.skyBox) {
      return this
    }
    let skyBox = this._viewer.scene.skyBox
    let skyBoxOption = this._options.skyBox
    skyBox.show = skyBoxOption.show ?? true
    skyBox.offsetAngle = skyBoxOption.offsetAngle || 0
    if (skyBoxOption.sources) {
      skyBox.sources = skyBoxOption?.sources
    }
    return this
  }

  /**
   * Sets globe option
   * @returns {ViewerOption}
   * @private
   */
  _setGlobeOption() {
    if (!this._options.globe) {
      return this
    }

    let globe = this._viewer.scene.globe
    let globeOption = this._options.globe

    Util.merge(globe, {
      show: globeOption?.show ?? true,
      showGroundAtmosphere: globeOption?.showGroundAtmosphere ?? true,
      enableLighting: globeOption?.enableLighting ?? false,
      depthTestAgainstTerrain: globeOption?.depthTestAgainstTerrain ?? false,
      tileCacheSize: +globeOption?.tileCacheSize || 100,
      preloadSiblings: globeOption?.enableLighting ?? false,
      baseColor: globeOption?.baseColor || new Cesium.Color(0, 0, 0.5, 1)
    })

    Util.merge(globe.translucency, {
      enabled: globeOption?.translucency?.enabled ?? false,
      backFaceAlpha: +globeOption?.translucency?.backFaceAlpha || 1,
      backFaceAlphaByDistance:
        globeOption?.translucency?.backFaceAlphaByDistance,
      frontFaceAlpha: +globeOption?.translucency?.frontFaceAlpha || 1,
      frontFaceAlphaByDistance:
        globeOption?.translucency?.frontFaceAlphaByDistance
    })

    return this
  }

  /**
   *
   * @returns {ViewerOption}
   * @private
   */
  _setCameraController() {
    if (!this._options?.cameraController) {
      return this
    }

    let sscc = this._viewer.scene.screenSpaceCameraController
    let cameraController = this._options.cameraController

    Util.merge(sscc, {
      enableInputs: cameraController?.enableInputs ?? true,
      enableRotate: cameraController?.enableRotate ?? true,
      enableTilt: cameraController?.enableTilt ?? true,
      enableTranslate: cameraController?.enableTranslate ?? true,
      enableZoom: cameraController?.enableZoom ?? true,
      enableCollisionDetection:
        cameraController?.enableCollisionDetection ?? true,
      minimumZoomDistance: +cameraController?.minimumZoomDistance || 1.0,
      maximumZoomDistance: +cameraController?.maximumZoomDistance || 40489014.0
    })
    return this
  }

  /**
   * Sets options
   * @param options
   * @returns {ViewerOption}
   */
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
      ._setSkyBoxOption()
      ._setGlobeOption()
      ._setCameraController()
    return this
  }
}

export default ViewerOption
