/**
 * @Author: Caven
 * @Date: 2023-01-07 15:19:20
 */
import {
  BoundingSphere,
  BoundingSphereState,
  Cartographic,
  CesiumWidget,
  Cesium3DTileset,
  Clock,
  computeFlyToLocationForRectangle,
  DataSourceCollection,
  DataSourceDisplay,
  defaultValue,
  defined,
  destroyObject,
  DeveloperError,
  Entity,
  EntityView,
  Event,
  EventHelper,
  getElement,
  HeadingPitchRange,
  ImageryLayer,
  Matrix4,
  Property,
  SceneMode,
  TimeDynamicPointCloud,
  Color
} from '@cesium/engine'

const boundingSphereScratch = new BoundingSphere()

function trackDataSourceClock(timeline, clock, dataSource) {
  if (defined(dataSource)) {
    const dataSourceClock = dataSource.clock
    if (defined(dataSourceClock)) {
      dataSourceClock.getValue(clock)
    }
  }
}

/**
 *
 * @param container
 * @param options
 * @constructor
 */
function Viewer(container, options) {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(container)) {
    throw new DeveloperError('container is required.')
  }
  //>>includeEnd('debug');

  container = getElement(container)
  options = defaultValue(options, defaultValue.EMPTY_OBJECT)

  //>>includeEnd('debug')
  const viewerContainer = document.createElement('div')
  viewerContainer.className = 'dc-viewer'
  container.appendChild(viewerContainer)

  // Cesium widget container
  const cesiumWidgetContainer = document.createElement('div')
  cesiumWidgetContainer.className = 'dc-viewer-widget-container'
  viewerContainer.appendChild(cesiumWidgetContainer)

  // Bottom container
  const bottomContainer = document.createElement('div')
  bottomContainer.className = 'dc-viewer-bottom'

  const scene3DOnly = defaultValue(options.scene3DOnly, false)

  let clock = new Clock()

  if (defined(options.shouldAnimate)) {
    clock.shouldAnimate = options.shouldAnimate
  }

  // Cesium widget
  const cesiumWidget = new CesiumWidget(cesiumWidgetContainer, {
    imageryProvider: false,
    clock: clock,
    skyBox: options.skyBox,
    skyAtmosphere: options.skyAtmosphere,
    sceneMode: options.sceneMode,
    mapProjection: options.mapProjection,
    globe: options.globe,
    orderIndependentTranslucency: options.orderIndependentTranslucency,
    contextOptions: options.contextOptions,
    useDefaultRenderLoop: options.useDefaultRenderLoop,
    targetFrameRate: options.targetFrameRate,
    showRenderLoopErrors: options.showRenderLoopErrors,
    useBrowserRecommendedResolution: options.useBrowserRecommendedResolution,
    creditContainer: defined(options.creditContainer)
      ? options.creditContainer
      : bottomContainer,
    creditViewport: options.creditViewport,
    scene3DOnly: scene3DOnly,
    shadows: options.shadows,
    terrainShadows: options.terrainShadows,
    mapMode2D: options.mapMode2D,
    blurActiveElementOnCanvasFocus: options.blurActiveElementOnCanvasFocus,
    requestRenderMode: options.requestRenderMode,
    maximumRenderTimeChange: options.maximumRenderTimeChange,
    depthPlaneEllipsoidOffset: options.depthPlaneEllipsoidOffset,
    msaaSamples: options.msaaSamples
  })

  cesiumWidget.container.firstChild.className = 'dc-widget'
  cesiumWidget.scene.backgroundColor = Color.TRANSPARENT

  let childrens = cesiumWidget.creditViewport.children

  for (let i = 0; i < childrens.length; i++) {
    if (!(childrens[i] instanceof HTMLCanvasElement)) {
      cesiumWidget.creditViewport.removeChild(childrens[i])
    }
  }

  let dataSourceCollection = options.dataSources
  let destroyDataSourceCollection = false
  if (!defined(dataSourceCollection)) {
    dataSourceCollection = new DataSourceCollection()
    destroyDataSourceCollection = true
  }

  const scene = cesiumWidget.scene

  const dataSourceDisplay = new DataSourceDisplay({
    scene: scene,
    dataSourceCollection: dataSourceCollection
  })

  const eventHelper = new EventHelper()

  eventHelper.add(clock.onTick, Viewer.prototype._onTick, this)
  eventHelper.add(scene.morphStart, Viewer.prototype._clearTrackedObject, this)

  // Main Toolbar
  const toolbar = document.createElement('div')
  toolbar.className = 'dc-viewer-toolbar'
  //Assign all properties to this instance.  No "this" assignments should
  //take place above this line.
  this._dataSourceChangedListeners = {}
  this._automaticallyTrackDataSourceClocks = defaultValue(
    options.automaticallyTrackDataSourceClocks,
    true
  )

  this._clock = clock
  this._container = container
  this._bottomContainer = bottomContainer
  this._element = viewerContainer
  this._cesiumWidget = cesiumWidget
  this._dataSourceCollection = dataSourceCollection
  this._destroyDataSourceCollection = destroyDataSourceCollection
  this._dataSourceDisplay = dataSourceDisplay
  this._toolbar = toolbar
  this._eventHelper = eventHelper
  this._lastWidth = 0
  this._lastHeight = 0
  this._allowDataSourcesToSuspendAnimation = true
  this._entityView = undefined
  this._enableInfoOrSelection = false
  this._clockTrackedDataSource = undefined
  this._trackedEntity = undefined
  this._needTrackedEntityUpdate = false
  this._selectedEntity = undefined
  this._zoomIsFlight = false
  this._zoomTarget = undefined
  this._zoomPromise = undefined
  this._zoomOptions = undefined
  this._selectedEntityChanged = new Event()
  this._trackedEntityChanged = new Event()

  //Listen to data source events in order to track clock changes.
  eventHelper.add(
    dataSourceCollection.dataSourceAdded,
    Viewer.prototype._onDataSourceAdded,
    this
  )
  eventHelper.add(
    dataSourceCollection.dataSourceRemoved,
    Viewer.prototype._onDataSourceRemoved,
    this
  )

  // Prior to each render, check if anything needs to be resized.
  eventHelper.add(scene.postUpdate, Viewer.prototype.resize, this)
  eventHelper.add(scene.postRender, Viewer.prototype._postRender, this)

  // We need to subscribe to the data sources and collections so that we can clear the
  // tracked object when it is removed from the scene.
  // Subscribe to current data sources
  const dataSourceLength = dataSourceCollection.length
  for (let i = 0; i < dataSourceLength; i++) {
    this._dataSourceAdded(dataSourceCollection, dataSourceCollection.get(i))
  }
  this._dataSourceAdded(undefined, dataSourceDisplay.defaultDataSource)

  // Hook up events so that we can subscribe to future sources.
  eventHelper.add(
    dataSourceCollection.dataSourceAdded,
    Viewer.prototype._dataSourceAdded,
    this
  )
  eventHelper.add(
    dataSourceCollection.dataSourceRemoved,
    Viewer.prototype._dataSourceRemoved,
    this
  )
}

/**
 *
 */
Object.defineProperties(Viewer.prototype, {
  /**
   * Gets the parent container.
   * @memberof viewer.prototype
   * @type {Element}
   * @readonly
   */
  container: {
    get: function() {
      return this._container
    }
  },

  /**
   * Gets the DOM element for the area at the bottom of the window containing the
   * {@link CreditDisplay} and potentially other things.
   * @memberof viewer.prototype
   * @type {Element}
   * @readonly
   */
  bottomContainer: {
    get: function() {
      return this._bottomContainer
    }
  },

  /**
   * Gets the CesiumWidget.
   * @memberof viewer.prototype
   * @type {CesiumWidget}
   * @readonly
   */
  cesiumWidget: {
    get: function() {
      return this._cesiumWidget
    }
  },

  /**
   * Gets the display used for {@link DataSource} visualization.
   * @memberof viewer.prototype
   * @type {DataSourceDisplay}
   * @readonly
   */
  dataSourceDisplay: {
    get: function() {
      return this._dataSourceDisplay
    }
  },

  /**
   * Gets the collection of entities not tied to a particular data source.
   * This is a shortcut to [dataSourceDisplay.defaultDataSource.entities]{@link Viewer#dataSourceDisplay}.
   * @memberof viewer.prototype
   * @type {EntityCollection}
   * @readonly
   */
  entities: {
    get: function() {
      return this._dataSourceDisplay.defaultDataSource.entities
    }
  },

  /**
   * Gets the set of {@link DataSource} instances to be visualized.
   * @memberof viewer.prototype
   * @type {DataSourceCollection}
   * @readonly
   */
  dataSources: {
    get: function() {
      return this._dataSourceCollection
    }
  },

  /**
   * Gets the canvas.
   * @memberof viewer.prototype
   * @type {HTMLCanvasElement}
   * @readonly
   */
  canvas: {
    get: function() {
      return this._cesiumWidget.canvas
    }
  },

  /**
   * Gets the scene.
   * @memberof viewer.prototype
   * @type {Scene}
   * @readonly
   */
  scene: {
    get: function() {
      return this._cesiumWidget.scene
    }
  },

  /**
   * Determines if shadows are cast by light sources.
   * @memberof viewer.prototype
   * @type {Boolean}
   */
  shadows: {
    get: function() {
      return this.scene.shadowMap.enabled
    },
    set: function(value) {
      this.scene.shadowMap.enabled = value
    }
  },

  /**
   * Determines if the terrain casts or shadows from light sources.
   * @memberof viewer.prototype
   * @type {ShadowMode}
   */
  terrainShadows: {
    get: function() {
      return this.scene.globe.shadows
    },
    set: function(value) {
      this.scene.globe.shadows = value
    }
  },

  /**
   * Get the scene's shadow map
   * @memberof viewer.prototype
   * @type {ShadowMap}
   * @readonly
   */
  shadowMap: {
    get: function() {
      return this.scene.shadowMap
    }
  },

  /**
   * Gets the collection of image layers that will be rendered on the globe.
   * @memberof viewer.prototype
   *
   * @type {ImageryLayerCollection}
   * @readonly
   */
  imageryLayers: {
    get: function() {
      return this.scene.imageryLayers
    }
  },

  /**
   * The terrain provider providing surface geometry for the globe.
   * @memberof viewer.prototype
   *
   * @type {TerrainProvider}
   */
  terrainProvider: {
    get: function() {
      return this.scene.terrainProvider
    },
    set: function(terrainProvider) {
      this.scene.terrainProvider = terrainProvider
    }
  },

  /**
   * Gets the camera.
   * @memberof viewer.prototype
   *
   * @type {Camera}
   * @readonly
   */
  camera: {
    get: function() {
      return this.scene.camera
    }
  },

  /**
   * Gets the post-process stages.
   * @memberof viewer.prototype
   *
   * @type {PostProcessStageCollection}
   * @readonly
   */
  postProcessStages: {
    get: function() {
      return this.scene.postProcessStages
    }
  },

  /**
   * Gets the clock.
   * @memberof viewer.prototype
   * @type {Clock}
   * @readonly
   */
  clock: {
    get: function() {
      return this._clock
    }
  },

  /**
   * Gets the screen space event handler.
   * @memberof viewer.prototype
   * @type {ScreenSpaceEventHandler}
   * @readonly
   */
  screenSpaceEventHandler: {
    get: function() {
      return this._cesiumWidget.screenSpaceEventHandler
    }
  },

  /**
   * Gets or sets the target frame rate of the widget when <code>useDefaultRenderLoop</code>
   * is true. If undefined, the browser's requestAnimationFrame implementation
   * determines the frame rate.  If defined, this value must be greater than 0.  A value higher
   * than the underlying requestAnimationFrame implementation will have no effect.
   * @memberof viewer.prototype
   *
   * @type {Number}
   */
  targetFrameRate: {
    get: function() {
      return this._cesiumWidget.targetFrameRate
    },
    set: function(value) {
      this._cesiumWidget.targetFrameRate = value
    }
  },

  /**
   * Gets or sets whether or not this widget should control the render loop.
   * If true the widget will use requestAnimationFrame to
   * perform rendering and resizing of the widget, as well as drive the
   * simulation clock. If set to false, you must manually call the
   * <code>resize</code>, <code>render</code> methods
   * as part of a custom render loop.  If an error occurs during rendering, {@link Scene}'s
   * <code>renderError</code> event will be raised and this property
   * will be set to false.  It must be set back to true to continue rendering
   * after the error.
   * @memberof viewer.prototype
   *
   * @type {Boolean}
   */
  useDefaultRenderLoop: {
    get: function() {
      return this._cesiumWidget.useDefaultRenderLoop
    },
    set: function(value) {
      this._cesiumWidget.useDefaultRenderLoop = value
    }
  },

  /**
   * Gets or sets a scaling factor for rendering resolution.  Values less than 1.0 can improve
   * performance on less powerful devices while values greater than 1.0 will render at a higher
   * resolution and then scale down, resulting in improved visual fidelity.
   * For example, if the widget is laid out at a size of 640x480, setting this value to 0.5
   * will cause the scene to be rendered at 320x240 and then scaled up while setting
   * it to 2.0 will cause the scene to be rendered at 1280x960 and then scaled down.
   * @memberof viewer.prototype
   *
   * @type {Number}
   * @default 1.0
   */
  resolutionScale: {
    get: function() {
      return this._cesiumWidget.resolutionScale
    },
    set: function(value) {
      this._cesiumWidget.resolutionScale = value
    }
  },

  /**
   * Boolean flag indicating if the browser's recommended resolution is used.
   * If true, the browser's device pixel ratio is ignored and 1.0 is used instead,
   * effectively rendering based on CSS pixels instead of device pixels. This can improve
   * performance on less powerful devices that have high pixel density. When false, rendering
   * will be in device pixels. {@link Viewer#resolutionScale} will still take effect whether
   * this flag is true or false.
   * @memberof viewer.prototype
   *
   * @type {Boolean}
   * @default true
   */
  useBrowserRecommendedResolution: {
    get: function() {
      return this._cesiumWidget.useBrowserRecommendedResolution
    },
    set: function(value) {
      this._cesiumWidget.useBrowserRecommendedResolution = value
    }
  },

  /**
   * Gets or sets whether or not data sources can temporarily pause
   * animation in order to avoid showing an incomplete picture to the user.
   * For example, if asynchronous primitives are being processed in the
   * background, the clock will not advance until the geometry is ready.
   *
   * @memberof viewer.prototype
   *
   * @type {Boolean}
   */
  allowDataSourcesToSuspendAnimation: {
    get: function() {
      return this._allowDataSourcesToSuspendAnimation
    },
    set: function(value) {
      this._allowDataSourcesToSuspendAnimation = value
    }
  },

  /**
   * Gets or sets the Entity instance currently being tracked by the camera.
   * @memberof viewer.prototype
   * @type {Entity | undefined}
   */
  trackedEntity: {
    get: function() {
      return this._trackedEntity
    },
    set: function(value) {
      if (this._trackedEntity !== value) {
        this._trackedEntity = value

        //Cancel any pending zoom
        cancelZoom(this)

        const scene = this.scene
        const sceneMode = scene.mode

        //Stop tracking
        if (!defined(value) || !defined(value.position)) {
          this._needTrackedEntityUpdate = false
          if (
            sceneMode === SceneMode.COLUMBUS_VIEW ||
            sceneMode === SceneMode.SCENE2D
          ) {
            scene.screenSpaceCameraController.enableTranslate = true
          }

          if (
            sceneMode === SceneMode.COLUMBUS_VIEW ||
            sceneMode === SceneMode.SCENE3D
          ) {
            scene.screenSpaceCameraController.enableTilt = true
          }

          this._entityView = undefined
          this.camera.lookAtTransform(Matrix4.IDENTITY)
        } else {
          //We can't start tracking immediately, so we set a flag and start tracking
          //when the bounding sphere is ready (most likely next frame).
          this._needTrackedEntityUpdate = true
        }

        this._trackedEntityChanged.raiseEvent(value)
        this.scene.requestRender()
      }
    }
  },
  /**
   * Gets or sets the object instance for which to display a selection indicator.
   *
   * If a user interactively picks a Cesium3DTilesFeature instance, then this property
   * will contain a transient Entity instance with a property named "feature" that is
   * the instance that was picked.
   * @memberof viewer.prototype
   * @type {Entity | undefined}
   */
  selectedEntity: {
    get: function() {
      return this._selectedEntity
    },
    set: function(value) {
      if (this._selectedEntity !== value) {
        this._selectedEntity = value
        this._selectedEntityChanged.raiseEvent(value)
      }
    }
  },
  /**
   * Gets the event that is raised when the selected entity changes.
   * @memberof viewer.prototype
   * @type {Event}
   * @readonly
   */
  selectedEntityChanged: {
    get: function() {
      return this._selectedEntityChanged
    }
  },
  /**
   * Gets the event that is raised when the tracked entity changes.
   * @memberof viewer.prototype
   * @type {Event}
   * @readonly
   */
  trackedEntityChanged: {
    get: function() {
      return this._trackedEntityChanged
    }
  },
  /**
   * Gets or sets the data source to track with the viewer's clock.
   * @memberof viewer.prototype
   * @type {DataSource}
   */
  clockTrackedDataSource: {
    get: function() {
      return this._clockTrackedDataSource
    },
    set: function(value) {
      if (this._clockTrackedDataSource !== value) {
        this._clockTrackedDataSource = value
        trackDataSourceClock(undefined, this.clock, value)
      }
    }
  }
})

/**
 *
 * @param mixin
 * @param options
 */
Viewer.prototype.extend = function(mixin, options) {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(mixin)) {
    throw new DeveloperError('mixin is required.')
  }
  //>>includeEnd('debug')

  mixin(this, options)
}

/**
 * Resizes the widget to match the container size.
 * This function is called automatically as needed unless
 * <code>useDefaultRenderLoop</code> is set to false.
 */
Viewer.prototype.resize = function() {
  const cesiumWidget = this._cesiumWidget
  const container = this._container
  const width = container.clientWidth
  const height = container.clientHeight
  cesiumWidget.resize()
  if (width === this._lastWidth && height === this._lastHeight) {
    return
  }
  let creditLeft = 0
  let creditBottom = 0
  this._bottomContainer.style.left = `${creditLeft}px`
  this._bottomContainer.style.bottom = `${creditBottom}px`
  this._lastWidth = width
  this._lastHeight = height
}

/**
 * This forces the widget to re-think its layout, including
 * widget sizes and credit placement.
 */
Viewer.prototype.forceResize = function() {
  this._lastWidth = 0
  this.resize()
}

/**
 * Renders the scene.  This function is called automatically
 * unless <code>useDefaultRenderLoop</code> is set to false;
 */
Viewer.prototype.render = function() {
  this._cesiumWidget.render()
}

/**
 * @returns {Boolean} true if the object has been destroyed, false otherwise.
 */
Viewer.prototype.isDestroyed = function() {
  return false
}

/**
 * Destroys the widget.  Should be called if permanently
 * removing the widget from layout.
 */
Viewer.prototype.destroy = function() {
  let i

  // Unsubscribe from data sources
  const dataSources = this.dataSources
  const dataSourceLength = dataSources.length
  for (i = 0; i < dataSourceLength; i++) {
    this._dataSourceRemoved(dataSources, dataSources.get(i))
  }
  this._dataSourceRemoved(undefined, this._dataSourceDisplay.defaultDataSource)

  this._container.removeChild(this._element)
  this._element.removeChild(this._toolbar)

  this._eventHelper.removeAll()

  this._dataSourceDisplay = this._dataSourceDisplay.destroy()
  this._cesiumWidget = this._cesiumWidget.destroy()

  if (this._destroyDataSourceCollection) {
    this._dataSourceCollection = this._dataSourceCollection.destroy()
  }

  return destroyObject(this)
}

/**
 * @private
 */
Viewer.prototype._dataSourceAdded = function(dataSourceCollection, dataSource) {
  const entityCollection = dataSource.entities
  entityCollection.collectionChanged.addEventListener(
    Viewer.prototype._onEntityCollectionChanged,
    this
  )
}

/**
 * @private
 */
Viewer.prototype._dataSourceRemoved = function(
  dataSourceCollection,
  dataSource
) {
  const entityCollection = dataSource.entities
  entityCollection.collectionChanged.removeEventListener(
    Viewer.prototype._onEntityCollectionChanged,
    this
  )

  if (defined(this.trackedEntity)) {
    if (
      entityCollection.getById(this.trackedEntity.id) === this.trackedEntity
    ) {
      this.trackedEntity = undefined
    }
  }

  if (defined(this.selectedEntity)) {
    if (
      entityCollection.getById(this.selectedEntity.id) === this.selectedEntity
    ) {
      this.selectedEntity = undefined
    }
  }
}

/**
 * @private
 */
Viewer.prototype._onTick = function(clock) {
  const time = clock.currentTime

  const isUpdated = this._dataSourceDisplay.update(time)
  if (this._allowDataSourcesToSuspendAnimation) {
    this._clock.canAnimate = isUpdated
  }

  const entityView = this._entityView
  if (defined(entityView)) {
    const trackedEntity = this._trackedEntity
    const trackedState = this._dataSourceDisplay.getBoundingSphere(
      trackedEntity,
      false,
      boundingSphereScratch
    )
    if (trackedState === BoundingSphereState.DONE) {
      entityView.update(time, boundingSphereScratch)
    }
  }

  let position
  let enableCamera = false
  const selectedEntity = this.selectedEntity
  const showSelection = defined(selectedEntity) && this._enableInfoOrSelection

  if (
    showSelection &&
    selectedEntity.isShowing &&
    selectedEntity.isAvailable(time)
  ) {
    const state = this._dataSourceDisplay.getBoundingSphere(
      selectedEntity,
      true,
      boundingSphereScratch
    )
    if (state !== BoundingSphereState.FAILED) {
      position = boundingSphereScratch.center
    } else if (defined(selectedEntity.position)) {
      position = selectedEntity.position.getValue(time, position)
    }
    enableCamera = defined(position)
  }
}

/**
 * @private
 */
Viewer.prototype._onEntityCollectionChanged = function(
  collection,
  added,
  removed
) {
  const length = removed.length
  for (let i = 0; i < length; i++) {
    const removedObject = removed[i]
    if (this.trackedEntity === removedObject) {
      this.trackedEntity = undefined
    }
    if (this.selectedEntity === removedObject) {
      this.selectedEntity = undefined
    }
  }
}

/**
 * @private
 */
Viewer.prototype._onInfoBoxCameraClicked = function(infoBoxViewModel) {
  if (
    infoBoxViewModel.isCameraTracking &&
    this.trackedEntity === this.selectedEntity
  ) {
    this.trackedEntity = undefined
  } else {
    const selectedEntity = this.selectedEntity
    const position = selectedEntity.position
    if (defined(position)) {
      this.trackedEntity = this.selectedEntity
    } else {
      this.zoomTo(this.selectedEntity)
    }
  }
}

/**
 * @private
 */
Viewer.prototype._clearTrackedObject = function() {
  this.trackedEntity = undefined
}

/**
 * @private
 */
Viewer.prototype._clearObjects = function() {
  this.trackedEntity = undefined
  this.selectedEntity = undefined
}

/**
 * @private
 */
Viewer.prototype._onDataSourceChanged = function(dataSource) {
  if (this.clockTrackedDataSource === dataSource) {
    trackDataSourceClock(undefined, this.clock, dataSource)
  }
}

/**
 * @private
 */
Viewer.prototype._onDataSourceAdded = function(
  dataSourceCollection,
  dataSource
) {
  if (this._automaticallyTrackDataSourceClocks) {
    this.clockTrackedDataSource = dataSource
  }
  const id = dataSource.entities.id
  const removalFunc = this._eventHelper.add(
    dataSource.changedEvent,
    Viewer.prototype._onDataSourceChanged,
    this
  )
  this._dataSourceChangedListeners[id] = removalFunc
}

/**
 * @private
 */
Viewer.prototype._onDataSourceRemoved = function(
  dataSourceCollection,
  dataSource
) {
  const resetClock = this.clockTrackedDataSource === dataSource
  const id = dataSource.entities.id
  this._dataSourceChangedListeners[id]()
  this._dataSourceChangedListeners[id] = undefined
  if (resetClock) {
    const numDataSources = dataSourceCollection.length
    if (this._automaticallyTrackDataSourceClocks && numDataSources > 0) {
      this.clockTrackedDataSource = dataSourceCollection.get(numDataSources - 1)
    } else {
      this.clockTrackedDataSource = undefined
    }
  }
}

/**
 * Asynchronously sets the camera to view the provided entity, entities, or data source.
 * If the data source is still in the process of loading or the visualization is otherwise still loading,
 * this method waits for the data to be ready before performing the zoom.
 *
 * <p>The offset is heading/pitch/range in the local east-north-up reference frame centered at the center of the bounding sphere.
 * The heading and the pitch angles are defined in the local east-north-up reference frame.
 * The heading is the angle from y axis and increasing towards the x axis. Pitch is the rotation from the xy-plane. Positive pitch
 * angles are above the plane. Negative pitch angles are below the plane. The range is the distance from the center. If the range is
 * zero, a range will be computed such that the whole bounding sphere is visible.</p>
 *
 * <p>In 2D, there must be a top down view. The camera will be placed above the target looking down. The height above the
 * target will be the range. The heading will be determined from the offset. If the heading cannot be
 * determined from the offset, the heading will be north.</p>
 *
 * @param {Entity|Entity[]|EntityCollection|DataSource|ImageryLayer|Cesium3DTileset|TimeDynamicPointCloud|Promise.<Entity|Entity[]|EntityCollection|DataSource|ImageryLayer|Cesium3DTileset|TimeDynamicPointCloud>} target The entity, array of entities, entity collection, data source, Cesium3DTileset, point cloud, or imagery layer to view. You can also pass a promise that resolves to one of the previously mentioned types.
 * @param {HeadingPitchRange} [offset] The offset from the center of the entity in the local east-north-up reference frame.
 * @returns {Promise.<Boolean>} A Promise that resolves to true if the zoom was successful or false if the target is not currently visualized in the scene or the zoom was cancelled.
 */
Viewer.prototype.zoomTo = function(target, offset) {
  const options = {
    offset: offset
  }
  return zoomToOrFly(this, target, options, false)
}

/**
 * Flies the camera to the provided entity, entities, or data source.
 * If the data source is still in the process of loading or the visualization is otherwise still loading,
 * this method waits for the data to be ready before performing the flight.
 *
 * <p>The offset is heading/pitch/range in the local east-north-up reference frame centered at the center of the bounding sphere.
 * The heading and the pitch angles are defined in the local east-north-up reference frame.
 * The heading is the angle from y axis and increasing towards the x axis. Pitch is the rotation from the xy-plane. Positive pitch
 * angles are above the plane. Negative pitch angles are below the plane. The range is the distance from the center. If the range is
 * zero, a range will be computed such that the whole bounding sphere is visible.</p>
 *
 * <p>In 2D, there must be a top down view. The camera will be placed above the target looking down. The height above the
 * target will be the range. The heading will be determined from the offset. If the heading cannot be
 * determined from the offset, the heading will be north.</p>
 *
 * @param {Entity|Entity[]|EntityCollection|DataSource|ImageryLayer|Cesium3DTileset|TimeDynamicPointCloud|Promise.<Entity|Entity[]|EntityCollection|DataSource|ImageryLayer|Cesium3DTileset|TimeDynamicPointCloud>} target The entity, array of entities, entity collection, data source, Cesium3DTileset, point cloud, or imagery layer to view. You can also pass a promise that resolves to one of the previously mentioned types.
 * @param {Object} [options] Object with the following properties:
 * @param {Number} [options.duration=3.0] The duration of the flight in seconds.
 * @param {Number} [options.maximumHeight] The maximum height at the peak of the flight.
 * @param {HeadingPitchRange} [options.offset] The offset from the target in the local east-north-up reference frame centered at the target.
 * @returns {Promise.<Boolean>} A Promise that resolves to true if the flight was successful or false if the target is not currently visualized in the scene or the flight was cancelled. //TODO: Cleanup entity mentions
 */
Viewer.prototype.flyTo = function(target, options) {
  return zoomToOrFly(this, target, options, true)
}

function zoomToOrFly(that, zoomTarget, options, isFlight) {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(zoomTarget)) {
    throw new DeveloperError('zoomTarget is required.')
  }
  //>>includeEnd('debug');

  cancelZoom(that)

  //We can't actually perform the zoom until all visualization is ready and
  //bounding spheres have been computed.  Therefore we create and return
  //a deferred which will be resolved as part of the post-render step in the
  //frame that actually performs the zoom.
  const zoomPromise = new Promise(resolve => {
    that._completeZoom = function(value) {
      resolve(value)
    }
  })
  that._zoomPromise = zoomPromise
  that._zoomIsFlight = isFlight
  that._zoomOptions = options

  Promise.resolve(zoomTarget).then(function(zoomTarget) {
    //Only perform the zoom if it wasn't cancelled before the promise resolved.
    if (that._zoomPromise !== zoomPromise) {
      return
    }

    //If the zoom target is a rectangular imagery in an ImageLayer
    if (zoomTarget instanceof ImageryLayer) {
      zoomTarget
        .getViewableRectangle()
        .then(function(rectangle) {
          return computeFlyToLocationForRectangle(rectangle, that.scene)
        })
        .then(function(position) {
          //Only perform the zoom if it wasn't cancelled before the promise was resolved
          if (that._zoomPromise === zoomPromise) {
            that._zoomTarget = position
          }
        })
      return
    }

    //If the zoom target is a Cesium3DTileset
    if (zoomTarget instanceof Cesium3DTileset) {
      that._zoomTarget = zoomTarget
      return
    }

    //If the zoom target is a TimeDynamicPointCloud
    if (zoomTarget instanceof TimeDynamicPointCloud) {
      that._zoomTarget = zoomTarget
      return
    }

    //If the zoom target is a data source, and it's in the middle of loading, wait for it to finish loading.
    if (zoomTarget.isLoading && defined(zoomTarget.loadingEvent)) {
      const removeEvent = zoomTarget.loadingEvent.addEventListener(function() {
        removeEvent()

        //Only perform the zoom if it wasn't cancelled before the data source finished.
        if (that._zoomPromise === zoomPromise) {
          that._zoomTarget = zoomTarget.entities.values.slice(0)
        }
      })
      return
    }

    //Zoom target is already an array, just copy it and return.
    if (Array.isArray(zoomTarget)) {
      that._zoomTarget = zoomTarget.slice(0)
      return
    }

    //If zoomTarget is an EntityCollection, this will retrieve the array
    zoomTarget = defaultValue(zoomTarget.values, zoomTarget)

    //If zoomTarget is a DataSource, this will retrieve the array.
    if (defined(zoomTarget.entities)) {
      zoomTarget = zoomTarget.entities.values
    }

    //Zoom target is already an array, just copy it and return.
    if (Array.isArray(zoomTarget)) {
      that._zoomTarget = zoomTarget.slice(0)
    } else {
      //Single entity
      that._zoomTarget = [zoomTarget]
    }
  })

  that.scene.requestRender()
  return zoomPromise
}

function clearZoom(viewer) {
  viewer._zoomPromise = undefined
  viewer._zoomTarget = undefined
  viewer._zoomOptions = undefined
}

function cancelZoom(viewer) {
  const zoomPromise = viewer._zoomPromise
  if (defined(zoomPromise)) {
    clearZoom(viewer)
    viewer._completeZoom(false)
  }
}

/**
 * @private
 */
Viewer.prototype._postRender = function() {
  updateZoomTarget(this)
  updateTrackedEntity(this)
}

function updateZoomTarget(viewer) {
  const target = viewer._zoomTarget
  if (!defined(target) || viewer.scene.mode === SceneMode.MORPHING) {
    return
  }

  const scene = viewer.scene
  const camera = scene.camera
  const zoomOptions = defaultValue(viewer._zoomOptions, {})
  let options

  // If zoomTarget was Cesium3DTileset
  if (target instanceof Cesium3DTileset) {
    return target.readyPromise
      .then(function() {
        const boundingSphere = target.boundingSphere
        // If offset was originally undefined then give it base value instead of empty object
        if (!defined(zoomOptions.offset)) {
          zoomOptions.offset = new HeadingPitchRange(
            0.0,
            -0.5,
            boundingSphere.radius
          )
        }

        options = {
          offset: zoomOptions.offset,
          duration: zoomOptions.duration,
          maximumHeight: zoomOptions.maximumHeight,
          complete: function() {
            viewer._completeZoom(true)
          },
          cancel: function() {
            viewer._completeZoom(false)
          }
        }

        if (viewer._zoomIsFlight) {
          camera.flyToBoundingSphere(target.boundingSphere, options)
        } else {
          camera.viewBoundingSphere(boundingSphere, zoomOptions.offset)
          camera.lookAtTransform(Matrix4.IDENTITY)

          // Finish the promise
          viewer._completeZoom(true)
        }

        clearZoom(viewer)
      })
      .catch(() => {
        cancelZoom(viewer)
      })
  }

  // If zoomTarget was TimeDynamicPointCloud
  if (target instanceof TimeDynamicPointCloud) {
    return target.readyPromise.then(function() {
      const boundingSphere = target.boundingSphere
      // If offset was originally undefined then give it base value instead of empty object
      if (!defined(zoomOptions.offset)) {
        zoomOptions.offset = new HeadingPitchRange(
          0.0,
          -0.5,
          boundingSphere.radius
        )
      }

      options = {
        offset: zoomOptions.offset,
        duration: zoomOptions.duration,
        maximumHeight: zoomOptions.maximumHeight,
        complete: function() {
          viewer._completeZoom(true)
        },
        cancel: function() {
          viewer._completeZoom(false)
        }
      }

      if (viewer._zoomIsFlight) {
        camera.flyToBoundingSphere(boundingSphere, options)
      } else {
        camera.viewBoundingSphere(boundingSphere, zoomOptions.offset)
        camera.lookAtTransform(Matrix4.IDENTITY)

        // Finish the promise
        viewer._completeZoom(true)
      }

      clearZoom(viewer)
    })
  }

  // If zoomTarget was an ImageryLayer
  if (target instanceof Cartographic) {
    options = {
      destination: scene.mapProjection.ellipsoid.cartographicToCartesian(
        target
      ),
      duration: zoomOptions.duration,
      maximumHeight: zoomOptions.maximumHeight,
      complete: function() {
        viewer._completeZoom(true)
      },
      cancel: function() {
        viewer._completeZoom(false)
      }
    }

    if (viewer._zoomIsFlight) {
      camera.flyTo(options)
    } else {
      camera.setView(options)
      viewer._completeZoom(true)
    }
    clearZoom(viewer)
    return
  }

  const entities = target

  const boundingSpheres = []
  for (let i = 0, len = entities.length; i < len; i++) {
    const state = viewer._dataSourceDisplay.getBoundingSphere(
      entities[i],
      false,
      boundingSphereScratch
    )

    if (state === BoundingSphereState.PENDING) {
      return
    } else if (state !== BoundingSphereState.FAILED) {
      boundingSpheres.push(BoundingSphere.clone(boundingSphereScratch))
    }
  }

  if (boundingSpheres.length === 0) {
    cancelZoom(viewer)
    return
  }

  //Stop tracking the current entity.
  viewer.trackedEntity = undefined

  const boundingSphere = BoundingSphere.fromBoundingSpheres(boundingSpheres)

  if (!viewer._zoomIsFlight) {
    camera.viewBoundingSphere(boundingSphere, zoomOptions.offset)
    camera.lookAtTransform(Matrix4.IDENTITY)
    clearZoom(viewer)
    viewer._completeZoom(true)
  } else {
    clearZoom(viewer)
    camera.flyToBoundingSphere(boundingSphere, {
      duration: zoomOptions.duration,
      maximumHeight: zoomOptions.maximumHeight,
      complete: function() {
        viewer._completeZoom(true)
      },
      cancel: function() {
        viewer._completeZoom(false)
      },
      offset: zoomOptions.offset
    })
  }
}

function updateTrackedEntity(viewer) {
  if (!viewer._needTrackedEntityUpdate) {
    return
  }

  const trackedEntity = viewer._trackedEntity
  const currentTime = viewer.clock.currentTime

  //Verify we have a current position at this time. This is only triggered if a position
  //has become undefined after trackedEntity is set but before the boundingSphere has been
  //computed. In this case, we will track the entity once it comes back into existence.
  const currentPosition = Property.getValueOrUndefined(
    trackedEntity.position,
    currentTime
  )

  if (!defined(currentPosition)) {
    return
  }

  const scene = viewer.scene

  const state = viewer._dataSourceDisplay.getBoundingSphere(
    trackedEntity,
    false,
    boundingSphereScratch
  )
  if (state === BoundingSphereState.PENDING) {
    return
  }

  const sceneMode = scene.mode
  if (
    sceneMode === SceneMode.COLUMBUS_VIEW ||
    sceneMode === SceneMode.SCENE2D
  ) {
    scene.screenSpaceCameraController.enableTranslate = false
  }

  if (
    sceneMode === SceneMode.COLUMBUS_VIEW ||
    sceneMode === SceneMode.SCENE3D
  ) {
    scene.screenSpaceCameraController.enableTilt = false
  }

  const bs =
    state !== BoundingSphereState.FAILED ? boundingSphereScratch : undefined
  viewer._entityView = new EntityView(
    trackedEntity,
    scene,
    scene.mapProjection.ellipsoid
  )
  viewer._entityView.update(currentTime, bs)
  viewer._needTrackedEntityUpdate = false
}

export default Viewer
