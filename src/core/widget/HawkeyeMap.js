/*
 * @Author: Caven
 * @Date: 2020-03-15 17:47:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 17:14:40
 */

import { Cesium } from '../../namespace'
import { DomUtil, Util } from '../utils'
import State from '../state/State'
import Widget from './Widget'

const DEF_OPTS = {
  animation: false,
  baseLayerPicker: false,
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  sceneModePicker: false,
  selectionIndicator: false,
  timeline: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  creditContainer: undefined
}

class HawkeyeMap extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-hawkeye-map')
    this._wrapper.setAttribute('id', Util.uuid())
    this._baseLayer = undefined
    this._delegate = undefined
    this.type = Widget.getWidgetType('hawkeye_map')
    this._state = State.INITIALIZED
  }

  _prepareDelegate() {
    this._delegate = new Cesium.Viewer(this._wrapper, {
      ...DEF_OPTS,
      sceneMode: Cesium.SceneMode.SCENE2D
    })
    this._delegate.scene.screenSpaceCameraController.enableRotate = false
    this._delegate.scene.screenSpaceCameraController.enableTranslate = false
    this._delegate.scene.screenSpaceCameraController.enableZoom = false
    this._delegate.scene.screenSpaceCameraController.enableTilt = false
    this._delegate.scene.screenSpaceCameraController.enableLook = false
    this._delegate.cesiumWidget._creditContainer.style.display = 'none'
    this._delegate.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )
    this._delegate.scene.screenSpaceCameraController.maximumZoomDistance = 40489014.0
    this._delegate.scene.backgroundColor = Cesium.Color.TRANSPARENT
    this._delegate.scene.postProcessStages.fxaa.enabled = true
    this._delegate.imageryLayers.removeAll()
  }

  _installHook() {
    this._prepareDelegate()
    this._viewer.camera.changed.addEventListener(this._sync2DView, this)
    this._viewer.camera.percentageChanged = 0.01
  }

  _sync2DView() {
    let viewCenter = new Cesium.Cartesian2(
      Math.floor(this._viewer.canvas.clientWidth / 2),
      Math.floor(this._viewer.canvas.clientHeight / 2)
    )
    let worldPosition = this._viewer.scene.camera.pickEllipsoid(viewCenter)
    if (!worldPosition) {
      return false
    }
    let distance = Cesium.Cartesian3.distance(
      worldPosition,
      this._viewer.scene.camera.positionWC
    )
    this._delegate.scene.camera.lookAt(
      worldPosition,
      new Cesium.Cartesian3(0.0, 0.0, distance)
    )
  }

  addBaseLayer(baseLayer) {
    if (!this._delegate || !this._enable) {
      return this
    }
    if (baseLayer) {
      if (this._baseLayer) {
        this._delegate.imageryLayers.remove(this._baseLayer)
      }
      this._baseLayer = this._delegate.imageryLayers.addImageryProvider(
        baseLayer
      )
    }
    return this
  }
}

Widget.registerType('hawkeye_map')

export default HawkeyeMap
