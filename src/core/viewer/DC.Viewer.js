/*
 * @Author: Caven
 * @Date: 2019-12-27 17:13:24
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-09 13:23:14
 */

import Cesium from '@/namespace'
import { ViewerOption, CameraOption } from '@/core/option'
import { MouseEvent, ViewerEvent, SceneEvent } from '@/core/event'
import {
  Attribution,
  ContextMenu,
  LocationBar,
  MapSplit,
  MapSwitch,
  Popup,
  Tooltip,
  HawkeyeMap,
  Compass
} from '@/core/widget'

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
    if (!DC.Initialized) {
      throw new Error('The DC is not initialized')
    }

    if (!id || !document.getElementById(id)) {
      throw new Error('DC.Viewer：the id is empty')
    }

    this._delegate = new Cesium.Viewer(id, {
      ...options,
      ...DEF_OPTS
    }) // Initialize the viewer

    /**
     *  Register events
     */
    new MouseEvent(this) // Register global mouse events
    this._viewerEvent = new ViewerEvent() // Register viewer events
    this._sceneEvent = new SceneEvent(this) // Register viewer events

    this._viewerOption = new ViewerOption(this) // Initialize the viewer option
    this._cameraOption = new CameraOption(this) // Initialize the camera option

    this._dcContainer = DC.DomUtil.create(
      'div',
      'dc-container',
      document.getElementById(id)
    ) //Register the custom container

    this._baseLayerPicker = new Cesium.BaseLayerPickerViewModel({
      globe: this._delegate.scene.globe
    })

    this._layerCache = {}
    this._effectCache = {}

    /**
     * Add default components
     */
    this._comps = {
      popup: new Popup(),
      contextMenu: new ContextMenu(),
      tooltip: new Tooltip(),
      mapSwitch: new MapSwitch(),
      mapSplit: new MapSplit(),
      locationBar: new LocationBar(),
      hawkeyeMap: new HawkeyeMap(),
      compass: new Compass(),
      attribution: new Attribution()
    }

    Object.keys(this._comps).forEach(key => {
      this.use(this._comps[key])
    })
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

  get dataSources() {
    return this._delegate.dataSources
  }

  get clock() {
    return this._delegate.clock
  }

  get viewerEvent() {
    return this._viewerEvent
  }

  get popup() {
    return this._comps.popup
  }

  get contextMenu() {
    return this._comps.contextMenu
  }

  get tooltip() {
    return this._comps.tooltip
  }

  get mapSplit() {
    return this._comps.mapSplit
  }

  get mapSwitch() {
    return this._comps.mapSwitch
  }

  get locationBar() {
    return this._comps.locationBar
  }

  get hawkeyeMap() {
    return this._comps.hawkeyeMap
  }

  get compass() {
    return this._comps.compass
  }

  get cameraPosition() {
    let position = DC.T.transformCartesianToWGS84(this.camera.positionWC)
    if (position) {
      position.heading = Cesium.Math.toDegrees(this.camera.heading)
      position.pitch = Cesium.Math.toDegrees(this.camera.pitch)
      position.roll = Cesium.Math.toDegrees(this.camera.roll)
    }
    return position
  }

  _addLayer(layer) {
    if (layer && layer.layerEvent && layer.state !== DC.LayerState.ADDED) {
      !this._layerCache[layer.type] && (this._layerCache[layer.type] = {})
      layer.layerEvent.fire(DC.LayerEventType.ADD, this)
      this._layerCache[layer.type][layer.id] = layer
    }
  }

  _removeLayer(layer) {
    if (layer && layer.layerEvent && layer.state !== DC.LayerState.REMOVED) {
      layer.layerEvent.fire(DC.LayerEventType.REMOVE, this)
      if (
        this._layerCache[layer.type] &&
        this._layerCache[layer.type][layer.id]
      ) {
        delete this._layerCache[layer.type][layer.id]
      }
    }
  }

  _addEffect(effect) {
    if (effect && effect.effectEvent && effect.state !== DC.EffectState.ADDED) {
      !this._effectCache[effect.type] && (this._effectCache[effect.type] = {})
      effect.effectEvent.fire(DC.EffectEventType.ADD, this)
      this._effectCache[effect.type][effect.id] = effect
    }
  }

  _removeEffect(effect) {
    if (
      effect &&
      effect.effectEvent &&
      effect.state !== DC.EffectState.REMOVED
    ) {
      effect.effectEvent.fire(DC.EffectEventType.REMOVE, this)
      if (
        this._effectCache[effect.type] &&
        this._effectCache[effect.type][effect.id]
      ) {
        delete this._effectCache[effect.type][effect.id]
      }
    }
  }

  /**
   *
   * @param {*} options
   * Set viewer options
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
   * Set camera pitch range
   *
   */
  setPitchRange(min = -90, max = -20) {
    this._cameraOption.setPichRange(min, max)
    return this
  }

  /**
   *
   * Restrict camera access underground
   *
   */
  limitCameraToGround() {
    this._cameraOption.limitCameraToGround()
    return this
  }

  /**
   *
   * @param {*} west
   * @param {*} south
   * @param {*} east
   * @param {*} north
   */
  setBounds(west, south, east, north) {
    this._cameraOption.setBounds(west, south, east, north)
    return this
  }

  /**
   *
   * 修改场景的模式，2：2D，2.5：2.5D，3：3D
   * @param {*} sceneMode
   * @param {*} duration
   *
   */
  changeSceneMode(sceneMode, duration = 0) {
    if (sceneMode === 2) {
      this._delegate.scene.morphTo2D(duration)
    } else if (sceneMode === 3) {
      this._delegate.scene.morphTo3D(duration)
    } else if (sceneMode === 2.5) {
      this._delegate.scene.morphToColumbusView(duration)
    }
    return this
  }

  /**
   *
   * Add the baselayer to the viewer.
   * The baselayer can be a single or an array,
   * and when the baselayer is an array, the baselayer will be loaded together
   * @param {*} baseLayers
   *
   */
  addBaseLayer(baseLayers, options = {}) {
    if (!baseLayers) {
      return this
    }
    this._baseLayerPicker.imageryProviderViewModels.push(
      new Cesium.ProviderViewModel({
        name: options.name || '地图',
        creationFunction: () => {
          return baseLayers
        }
      })
    )
    if (!this._baseLayerPicker.selectedImagery) {
      this._baseLayerPicker.selectedImagery = this._baseLayerPicker.imageryProviderViewModels[0]
    }

    this._comps.mapSwitch.addMap(options)

    return this
  }

  /**
   *
   * Change the current globe display of the baselayer
   * @param {*} index
   *
   */
  changeBaseLayer(index) {
    if (this._baseLayerPicker && index >= 0) {
      this._baseLayerPicker.selectedImagery = this._baseLayerPicker.imageryProviderViewModels[
        index
      ]
    }
    return this
  }

  /**
   *
   * Add the terrain to the viewer.
   * @param {*} terrain
   *
   */
  addTerrain(terrain) {
    if (!terrain) {
      return this
    }
    this._baseLayerPicker.terrainProviderViewModels.push(
      new Cesium.ProviderViewModel({
        name: '地形',
        creationFunction: () => {
          return terrain
        }
      })
    )
    if (!this._baseLayerPicker.selectedTerrain) {
      this._baseLayerPicker.selectedTerrain = this._baseLayerPicker.terrainProviderViewModels[0]
    }
    return this
  }

  /**
   *
   * Change the current globe display of the terrain
   * @param {*} index
   *
   */
  changeTerrain(index) {
    if (this._baseLayerPicker && index >= 0) {
      this._baseLayerPicker.selectedTerrain = this._baseLayerPicker.terrainProviderViewModels[
        index
      ]
    }
    return this
  }

  /**
   *
   * Add a layer to the viewer
   * @param {*} layer
   *
   */
  addLayer(layer) {
    this._addLayer(layer)
    return this
  }

  /**
   *
   * Remove a layer from the viewer
   * @param {*} layer
   *
   */
  removeLayer(layer) {
    this._removeLayer(layer)
    return this
  }

  /**
   *
   * @param {*} id
   * Get the layer by id
   *
   */
  getLayer(id) {
    let filters = this.getLayers().filter(item.id === id)
    return filters && filters.length ? filters[0] : undefined
  }

  /**
   *  Get all layers
   */
  getLayers() {
    let result = []
    Object.keys(this._layerCache).forEach(type => {
      let cache = this._layerCache[type]
      Object.keys(cache).forEach(layerId => {
        result.push(cache[layerId])
      })
    })
    return result
  }

  /**
   *
   * @param {*} method
   * @param {*} context
   * loop through each layer
   *
   */
  eachLayer(method, context) {
    Object.keys(this._layerCache).forEach(type => {
      let cache = this._layerCache[type]
      Object.keys(cache).forEach(layerId => {
        method.call(context, cache[layerId])
      })
    })
    return this
  }

  /**
   *
   * @param {*} effect
   */
  addEffect(effect) {
    this._addEffect(effect)
    return this
  }

  /**
   *
   * @param {*} effect
   */
  removeEffect(effect) {
    this._removeEffect(effect)
    return this
  }

  /**
   *
   * @param {*} target
   *
   */
  flyTo(target) {
    this._delegate.flyTo(target.delegate || target)
    return this
  }

  /**
   *
   * @param {*} target
   *
   */
  zoomTo(target) {
    this._delegate.zoomTo(target.delegate || target)
    return this
  }

  /**
   *
   * @param {*} position
   * @param {*} completeCallback
   *
   */
  flyToPosition(position, completeCallback, duration) {
    if (position instanceof DC.Position) {
      this._delegate.camera.flyTo({
        destination: DC.T.transformWGS84ToCartesian(position),
        orientation: {
          heading: Cesium.Math.toRadians(position.heading),
          pitch: Cesium.Math.toRadians(position.pitch),
          roll: Cesium.Math.toRadians(position.roll)
        },
        complete: completeCallback,
        duration: duration
      })
    }
    return this
  }

  /**
   *
   * @param {*} position
   * @param {*} completeCallback
   *
   */
  zoomToPosition(position, completeCallback) {
    if (position instanceof DC.Position) {
      this._delegate.camera.flyTo({
        destination: DC.T.transformWGS84ToCartesian(position),
        orientation: {
          heading: Cesium.Math.toRadians(position.heading),
          pitch: Cesium.Math.toRadians(position.pitch),
          roll: Cesium.Math.toRadians(position.roll)
        },
        complete: completeCallback,
        duration: 0
      })
    }
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   *
   */
  on(type, callback, context) {
    this._viewerEvent.on(type, callback, context || this)
    this._sceneEvent.on(type, callback, context || this)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  once(type, callback, context) {
    this._viewerEvent.once(type, callback, context || this)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   *
   */
  off(type, callback, context) {
    this._viewerEvent.off(type, callback, context || this)
    this._sceneEvent.off(type, callback, context || this)
    return this
  }

  /**
   *
   * @param {*} plugin
   *
   */
  use(plugin) {
    if (plugin && plugin.install) {
      plugin.install(this)
    }
    return this
  }
}
