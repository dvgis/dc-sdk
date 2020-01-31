/*
 * @Author: Caven
 * @Date: 2019-12-27 17:13:24
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 21:14:45
 */

import Cesium from '@/namespace'
import ViewerOption from '../option/ViewerOption'
import CameraOption from '../option/CameraOption'
import MouseEvent from '../event/MouseEvent'
import ViewerEvent from '../event/ViewerEvent'
import Popup from '../widget/Popup'
import ContextMenu from '../widget/ContextMenu'

const DEF_OPTS = {
  animation: false, //Whether to create animated widgets, lower left corner of the meter
  baseLayerPicker: false, //Whether to display the layer selector
  fullscreenButton: false, //Whether to display the full-screen button
  geocoder: false, //To display the geocoder widget, query the button in the upper right corner
  homeButton: false, //Whether to display the Home button
  infoBox: false, //Whether to display the information box
  sceneModePicker: false, //Whether to display 3D/2D selector
  selectionIndicator: false, //Whether to display the selection indicator component
  timeline: false, //Whether to display the timeline
  navigationHelpButton: false, //Whether to display the help button in the upper right corner
  navigationInstructionsInitiallyVisible: false,
  creditContainer: undefined,
  shouldAnimate: true
}

DC.Viewer = class {
  constructor(id, options = {}) {
    if (!id || !document.getElementById(id)) {
      throw Error('the id empty')
    }
    this._delegate = new Cesium.Viewer(id, {
      ...options,
      ...DEF_OPTS
    }) // Initialize the viewer
    new MouseEvent(this) // Register global mouse events
    this._viewerOption = new ViewerOption(this) // Initialize the viewer option
    this._cameraOption = new CameraOption(this) // Initialize the camera option
    this._viewerEvent = new ViewerEvent() // Register viewer events
    this._dcContainer = DC.DomUtil.create('div', 'dc-container', document.getElementById(id)) //Register the custom container
    this._baseLayerPicker = new Cesium.BaseLayerPickerViewModel({ globe: this._delegate.scene.globe })
    this._layerCache = {}
    this.on(DC.ViewerEventType.ADD_LAYER, this._addLayerCallback, this) //Initialize layer add event
    this.on(DC.ViewerEventType.REMOVE_LAYER, this._removeLayerCallback, this) //Initialize layer remove event
    this.on(DC.ViewerEventType.ADD_EFFECT, this._addEffectCallback, this) //Initialize effect add event
    this.on(DC.ViewerEventType.REMOVE_EFFECT, this._removeEffectCallback, this) //Initialize effect remove event
    /**
     * Add default components
     */
    this._popup = new Popup()
    this._contextMenu = new ContextMenu()
    this.use(this._popup).use(this._contextMenu)
  }

  get delegate() {
    return this._delegate
  }

  get dcContainer() {
    return this._dcContainer
  }

  get scene() {
    return this._delegate.scene
  }

  get camera() {
    return this._delegate.camera
  }

  get canvas() {
    return this._delegate.scene.canvas
  }

  get viewerEvent() {
    return this._viewerEvent
  }

  get popup() {
    return this._popup
  }

  get contextMenu() {
    return this._contextMenu
  }

  _addLayerCallback(layer) {
    if (layer && layer.layerEvent && layer.state !== DC.LayerState.ADDED) {
      !this._layerCache[layer.type] && (this._layerCache[layer.type] = {})
      layer.layerEvent.fire(DC.LayerEventType.ADD, this)
      this._layerCache[layer.type][layer.id] = layer
    }
  }

  _removeLayerCallback(layer) {
    if (layer && layer.layerEvent && layer.state !== DC.LayerState.REMOVED) {
      layer.layerEvent.fire(DC.LayerEventType.REMOVE, this)
      if (this._layerCache[layer.type] && this._layerCache[layer.type][layer.id]) {
        delete this._layerCache[layer.type][layer.id]
      }
    }
  }

  _addEffectCallback(effect) {}

  _removeEffectCallback(effect) {}

  /**
   *
   * @param {*} options
   * set viewer options
   *
   */
  setOptions(options) {
    this._viewerOption.setOptions(options)
    return this
  }

  /**
   *
   * @param {*} min
   * @param {*} max
   * set camera options
   */
  setPitchRange(min = -90, max = -20) {
    this._cameraOption.setPichRange(min, max)
    return this
  }

  /**
   * Restrict camera access underground
   */
  limitCameraToGround() {
    this._cameraOption.limitCameraToGround()
    return this
  }

  /**
   *
   * @param {*} baseLayers
   * Add the baselayer to the viewer.
   * The baselayer can be a single or an array,
   * and when the baselayer is an array, the baselayer will be loaded together
   */
  addBaseLayer(baseLayers) {
    if (!baseLayers) {
      return this
    }
    if (!Array.isArray(baseLayers)) {
      baseLayers = [baseLayers]
    }
    baseLayers.forEach(item => {
      if (
        item instanceof Cesium.UrlTemplateImageryProvider ||
        item instanceof Cesium.ArcGisMapServerImageryProvider ||
        item instanceof Cesium.SingleTileImageryProvider ||
        item instanceof Cesium.WebMapTileServiceImageryProvider
      ) {
        this._baseLayerPicker.imageryProviderViewModels.push(
          new Cesium.ProviderViewModel({
            name: '地图',
            creationFunction: () => {
              return item
            }
          })
        )
      }
    })
    if (!this._baseLayerPicker.selectedImagery) {
      this._baseLayerPicker.selectedImagery = this._baseLayerPicker.imageryProviderViewModels[0]
    }
    return this
  }

  /**
   *
   * @param {*} index
   * Change the current globe display of the baselayer
   */
  changeBaseLayer(index) {
    if (this._baseLayerPicker && index >= 0) {
      this._baseLayerPicker.selectedImagery = this._baseLayerPicker.imageryProviderViewModels[index]
    }
    return this
  }

  /**
   *
   * @param {*} layer
   * Add a layer to the viewer
   */
  addLayer(layer) {
    this._viewerEvent.fire(DC.ViewerEventType.ADD_LAYER, layer)
    return this
  }

  /**
   *
   * @param {*} layer
   * remove a layer from the viewer
   */
  removeLayer(layer) {
    this._viewerEvent.fire(DC.ViewerEventType.REMOVE_LAYER, layer)
    return this
  }

  /**
   *
   * @param {*} id
   * get the layer by id
   */
  getLayer(id) {
    let layer = undefined
    for (let type in this._layerCache) {
      let cache = this._layerCache[type]
      for (let layerId in cache) {
        if (layerId === id) {
          layer = cache[layerId]
          break
        }
      }
      if (layer) {
        break
      }
    }
    return layer
  }

  /**
   *  get all layers
   */
  getLayers() {
    let result = []
    for (let type in this._layerCache) {
      let cache = this._layerCache[type]
      for (let layerId in cache) {
        result.push(cache[layerId])
      }
    }
    return result
  }

  /**
   *
   * @param {*} method
   * @param {*} context
   *
   */
  eachLayer(method, context) {
    for (let type in this._layerCache) {
      let cache = this._layerCache[type]
      for (let layerId in cache) {
        method.call(context, cache[layerId])
      }
    }
    return this
  }

  addEffect(effect) {}

  removeEffect(effect) {}

  flyTo(target) {
    this._delegate.flyTo(target.delegate || target)
    return this
  }

  zoomTo(target) {
    this._delegate.zoomTo(target.delegate || target)
    return this
  }

  flyToPosition(position, completeCallback) {
    if (position instanceof DC.Position) {
      this._delegate.camera.flyTo({
        destination: DC.T.transformWSG84ToCartesian(position),
        orientation: {
          heading: Cesium.Math.toRadians(position.heading),
          pitch: Cesium.Math.toRadians(position.pitch),
          roll: Cesium.Math.toRadians(position.roll)
        },
        complete: completeCallback
      })
    }
    return this
  }

  on(type, callback, context) {
    this._viewerEvent.on(type, callback, context || this)
    return this
  }

  off(type, callback, context) {
    this._viewerEvent.off(type, callback, context || this)
    return this
  }

  use(plugin) {
    if (plugin && plugin.install) {
      plugin.install(this)
    }
    return this
  }
}
