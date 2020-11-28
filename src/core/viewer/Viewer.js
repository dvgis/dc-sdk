/**
 * @Author: Caven
 * @Date: 2019-12-27 17:13:24
 */

import {
  LayerGroupEventType,
  LayerEventType,
  EffectEventType,
  MouseEvent,
  ViewerEvent,
  SceneEvent
} from '../event'
import { ViewerOption, CameraOption } from '../option'
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
} from '../widget'
import { DomUtil } from '../utils'
import Transform from '../transform/Transform'
import Parse from '../parse/Parse'

const { Cesium } = DC.Namespace

const DEF_OPTS = {
  animation: false, //Whether to create animated widgets, lower left corner of the meter
  baseLayerPicker: false, //Whether to display the layer selector
  imageryProvider: false, // Whether to display the default imagery
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

class Viewer {
  constructor(id, options = {}) {
    if (!id || !document.getElementById(id)) {
      throw new Error('Viewer：the id is empty')
    }

    this._delegate = new Cesium.Viewer(id, {
      ...DEF_OPTS,
      ...options
    }) // Initialize the viewer

    /**
     *  Registers events
     */
    new MouseEvent(this) // Register global mouse events
    this._viewerEvent = new ViewerEvent() // Register viewer events
    this._sceneEvent = new SceneEvent(this) // Register scene events

    this._viewerOption = new ViewerOption(this) // Initialize the viewer option
    this._cameraOption = new CameraOption(this) // Initialize the camera option

    this._dcContainer = DomUtil.create(
      'div',
      'dc-container',
      document.getElementById(id)
    ) //Register the custom container

    this._baseLayerPicker = new Cesium.BaseLayerPickerViewModel({
      globe: this._delegate.scene.globe
    })

    this._layerGroupCache = {}
    this._layerCache = {}
    this._effectCache = {}

    /**
     * Adds default components
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

  get imageryLayers() {
    return this._delegate.imageryLayers
  }

  get entities() {
    return this._delegate.entities
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
    let position = Transform.transformCartesianToWGS84(this.camera.positionWC)
    if (position) {
      position.heading = Cesium.Math.toDegrees(this.camera.heading)
      position.pitch = Cesium.Math.toDegrees(this.camera.pitch)
      position.roll = Cesium.Math.toDegrees(this.camera.roll)
    }
    return position
  }

  /***
   *
   * @param layerGroup
   * @private
   */
  _addLayerGroup(layerGroup) {
    if (
      layerGroup &&
      layerGroup.layerGroupEvent &&
      !Object(this._layerGroupCache).hasOwnProperty(layerGroup.id)
    ) {
      layerGroup.layerGroupEvent.fire(LayerGroupEventType.ADD, this)
      this._layerGroupCache[layerGroup.id] = layerGroup
    }
  }

  /**
   *
   * @param layerGroup
   * @private
   */
  _removeLayerGroup(layerGroup) {
    if (
      layerGroup &&
      layerGroup.layerGroupEvent &&
      Object(this._layerGroupCache).hasOwnProperty(layerGroup.id)
    ) {
      layerGroup.layerGroupEvent.fire(LayerGroupEventType.REMOVE, this)
      delete this._layerGroupCache[layerGroup.id]
    }
  }

  /**
   * @param layer
   * @private
   */
  _addLayer(layer) {
    if (layer && layer.layerEvent) {
      !this._layerCache[layer.type] && (this._layerCache[layer.type] = {})
      if (!Object(this._layerCache[layer.type]).hasOwnProperty(layer.id)) {
        layer.layerEvent.fire(LayerEventType.ADD, this)
        this._layerCache[layer.type][layer.id] = layer
      }
    }
  }

  /**
   * @param layer
   * @private
   */
  _removeLayer(layer) {
    if (
      layer &&
      layer.layerEvent &&
      Object(this._layerCache[layer.type]).hasOwnProperty(layer.id)
    ) {
      layer.layerEvent.fire(LayerEventType.REMOVE, this)
      delete this._layerCache[layer.type][layer.id]
    }
  }

  /**
   * @param effect
   * @private
   */
  _addEffect(effect) {
    if (
      effect &&
      effect.effectEvent &&
      !Object(this._effectCache).hasOwnProperty(effect.id)
    ) {
      effect.effectEvent.fire(EffectEventType.ADD, this)
      this._effectCache[effect.id] = effect
    }
  }

  /**
   * @param effect
   * @private
   */
  _removeEffect(effect) {
    if (
      effect &&
      effect.effectEvent &&
      Object(this._effectCache).hasOwnProperty(effect.id)
    ) {
      effect.effectEvent.fire(EffectEventType.REMOVE, this)
      delete this._effectCache[effect.id]
    }
  }

  /**
   * Sets viewer options
   * @param options
   * @returns {Viewer}
   */
  setOptions(options) {
    this._viewerOption.setOptions(options)
    return this
  }

  /**
   * Sets camera pitch range
   * @param min
   * @param max
   * @returns {Viewer}
   */
  setPitchRange(min = -90, max = -20) {
    this._cameraOption.setPitchRange(min, max)
    return this
  }

  /**
   * Restrict camera access underground
   * @returns {Viewer}
   */
  limitCameraToGround() {
    this._cameraOption.limitCameraToGround()
    return this
  }

  /**
   * @param west
   * @param south
   * @param east
   * @param north
   * @returns {Viewer}
   */
  setBounds(west, south, east, north) {
    this._cameraOption.setBounds(west, south, east, north)
    return this
  }

  /**
   * Changes Scene Mode，2：2D，2.5：2.5D，3：3D
   * @param sceneMode
   * @param duration
   * @returns {Viewer}
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
   * Changes Mouse Mode，0：Default，1: Change the tiltEventTypes to CameraEventType.RIGHT_DRAG
   * @param mouseMode
   * @returns {Viewer}
   */
  changeMouseMode(mouseMode) {
    this._cameraOption.changeMouseMode(mouseMode)
    return this
  }

  /**
   * Adds the baseLayer .
   * The baseLayer can be a single or an array,
   * and when the baseLayer is an array, the baseLayer will be loaded together
   * @param baseLayers
   * @param options
   * @returns {Viewer}
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
   * Changes the current globe display of the baseLayer
   * @param index
   * @returns {Viewer}
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
   * Adds the terrain
   * @param terrain
   * @returns {Viewer}
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
   * Changes the current globe display of the terrain
   * @param index
   * @returns {Viewer}
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
   * Removes terrain
   * @returns {Viewer}
   */
  removeTerrain() {
    this._delegate.terrainProvider = new Cesium.EllipsoidTerrainProvider()
    return this
  }

  /**
   *
   * @param layerGroup
   * @returns {Viewer}
   */
  addLayerGroup(layerGroup) {
    this._addLayerGroup(layerGroup)
    return this
  }

  /**
   *
   * @param layerGroup
   * @returns {Viewer}
   */
  removeLayerGroup(layerGroup) {
    this._removeLayerGroup(layerGroup)
    return this
  }

  /**
   * add a layer
   * @param layer
   * @returns {Viewer}
   */
  addLayer(layer) {
    this._addLayer(layer)
    return this
  }

  /**
   * Removes a layer
   * @param layer
   * @returns {Viewer}
   */
  removeLayer(layer) {
    this._removeLayer(layer)
    return this
  }

  /**
   * Checks to see if the layer is included
   * @param layer
   * @returns {boolean}
   */
  hasLayer(layer) {
    return (
      layer &&
      layer.layerEvent &&
      Object(this._layerCache[layer.type]).hasOwnProperty(layer.id)
    )
  }

  /**
   * Returns a layer by id
   * @param id
   * @returns {*|undefined}
   */
  getLayer(id) {
    let filters = this.getLayers().filter(item => item.id === id)
    return filters && filters.length ? filters[0] : undefined
  }

  /**
   * Returns all layers
   * @returns {[]}
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
   * Iterate through each layer and pass it as an argument to the callback function
   * @param method
   * @param context
   * @returns {Viewer}
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
   * adds an effect
   * @param effect
   * @returns {Viewer}
   */
  addEffect(effect) {
    this._addEffect(effect)
    return this
  }

  /**
   * removes an effect
   * @param effect
   * @returns {Viewer}
   */
  removeEffect(effect) {
    this._removeEffect(effect)
    return this
  }

  /**
   * @param target
   * @param duration
   * @returns {Viewer}
   */
  flyTo(target, duration) {
    this._delegate.flyTo(target?.delegate || target, {
      duration
    })
    return this
  }

  /**
   * @param target
   * @returns {Viewer}
   */
  zoomTo(target) {
    this._delegate.zoomTo(target?.delegate || target)
    return this
  }

  /**
   * Camera fly to a position
   * @param position
   * @param completeCallback
   * @param duration
   * @returns {Viewer}
   */
  flyToPosition(position, completeCallback, duration) {
    position = Parse.parsePosition(position)
    this.camera.flyTo({
      destination: Transform.transformWGS84ToCartesian(position),
      orientation: {
        heading: Cesium.Math.toRadians(position.heading),
        pitch: Cesium.Math.toRadians(position.pitch),
        roll: Cesium.Math.toRadians(position.roll)
      },
      complete: completeCallback,
      duration: duration
    })
    return this
  }

  /**
   * Camera zoom to a position
   * @param position
   * @param completeCallback
   * @returns {Viewer}
   */
  zoomToPosition(position, completeCallback) {
    position = Parse.parsePosition(position)
    this.camera.flyTo({
      destination: Transform.transformWGS84ToCartesian(position),
      orientation: {
        heading: Cesium.Math.toRadians(position.heading),
        pitch: Cesium.Math.toRadians(position.pitch),
        roll: Cesium.Math.toRadians(position.roll)
      },
      complete: completeCallback,
      duration: 0
    })
    return this
  }

  /**
   *
   * @param type
   * @param callback
   * @param context
   * @returns {Viewer}
   */
  on(type, callback, context) {
    this._viewerEvent.on(type, callback, context || this)
    this._sceneEvent.on(type, callback, context || this)
    return this
  }

  /**
   *
   * @param type
   * @param callback
   * @param context
   * @returns {Viewer}
   */
  once(type, callback, context) {
    this._viewerEvent.once(type, callback, context || this)
    return this
  }

  /**
   *
   * @param type
   * @param callback
   * @param context
   * @returns {Viewer}
   */
  off(type, callback, context) {
    this._viewerEvent.off(type, callback, context || this)
    this._sceneEvent.off(type, callback, context || this)
    return this
  }

  /**
   * Destroys the viewer.
   */
  destroy() {
    this._delegate.destroy()
    this._delegate = undefined
    return this
  }

  /**
   * adds a plugin
   * @param plugin
   * @returns {Viewer}
   */
  use(plugin) {
    if (plugin && plugin.install) {
      plugin.install(this)
    }
    return this
  }
}

export default Viewer
