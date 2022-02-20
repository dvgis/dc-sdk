import S3MTile from './S3MTile.js'
import S3MLayerScheduler from './S3MLayerScheduler.js'
import S3MLayerCache from './S3MLayerCache.js'
import OperationType from './Enum/OperationType.js'
import Style3D from './Style3D.js'

const  { Cesium }  = DC.Namespace

function S3MTilesLayer(options) {
  options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT)
  Cesium.Check.defined('options.url', options.url)
  Cesium.Check.defined('options.context', options.context)
  this.id = Cesium.createGuid()
  this.name = options.name
  this.context = options.context
  this._url = undefined
  this._basePath = undefined
  this._baseResource = undefined
  this.modelMatrix = new Cesium.Matrix4()
  this.invModelMatrix = new Cesium.Matrix4()
  this._visibleDistanceMax = Cesium.defaultValue(
    options.maxVisibleDistance,
    Number.MAX_VALUE
  )
  this._visibleDistanceMin = Cesium.defaultValue(
    options.minVisibleDistance,
    0.0
  )
  this._lodRangeScale = Cesium.defaultValue(options.lodRangeScale, 1.0)
  this._selectedColor = new Cesium.Color(0.7, 0.7, 1.0, 1.0)
  this.fileType = undefined
  this._position = undefined
  this._rectangle = undefined
  this._rootTiles = []
  this._schuduler = new S3MLayerScheduler()
  this._selections = []
  this._objsOperationList = {}
  this._requestTiles = []
  this._processTiles = []
  this._selectedTiles = []
  this._cache = new S3MLayerCache()
  this._maximumMemoryUsage = -1
  this._totalMemoryUsageInBytes = 0
  this._style3D = new Style3D()
  this._maximumPriority = {
    foveatedFactor: -Number.MAX_VALUE,
    depth: -Number.MAX_VALUE,
    distance: -Number.MAX_VALUE,
    pixel: -Number.MAX_VALUE
  }
  this._minimumPriority = {
    foveatedFactor: Number.MAX_VALUE,
    depth: Number.MAX_VALUE,
    distance: Number.MAX_VALUE,
    pixel: Number.MAX_VALUE
  }
  this._readyPromise = Cesium.when.defer()

  this.loadConfig(options.url)
}

Object.defineProperties(S3MTilesLayer.prototype, {
  ready: {
    get: function() {
      return this._rootTiles.length > 0
    }
  },
  readyPromise: {
    get: function() {
      return this._readyPromise
    }
  },
  rectangle: {
    get: function() {
      return this._rectangle
    }
  },
  visibleDistanceMax: {
    get: function() {
      return this._visibleDistanceMax
    },
    set: function(value) {
      Cesium.Check.typeOf.number('max visible distance', value)
      this._visibleDistanceMax = value
    }
  },
  visibleDistanceMin: {
    get: function() {
      return this._visibleDistanceMin
    },
    set: function(value) {
      Cesium.Check.typeOf.number('min visible distance', value)
      this._visibleDistanceMin = value
    }
  },
  lodRangeScale: {
    get: function() {
      return this._lodRangeScale
    },
    set: function(value) {
      Cesium.Check.typeOf.number('set layer lod range scale', value)
      this._lodRangeScale = value
    }
  },
  totalMemoryUsageInBytes: {
    get: function() {
      return this._totalMemoryUsageInBytes
    },
    set: function(value) {
      this._totalMemoryUsageInBytes = value
    }
  },
  maximumMemoryUsage: {
    get: function() {
      return this._maximumMemoryUsage
    },
    set: function(value) {
      this._maximumMemoryUsage = value
    }
  },
  style3D: {
    get: function() {
      return this._style3D
    },
    set: function(value) {
      this._style3D = value
    }
  }
})

// Cesium.Scene.prototype.hookPickFunc = Cesium.Scene.prototype.pick;
//
// Cesium.Scene.prototype.pick = function(windowPosition, width, height) {
//     let picked = this.hookPickFunc(windowPosition, width, height);
//     if (picked) {
//         let isS3MTilesLayer = picked.primitive && picked.primitive instanceof S3MTilesLayer;
//         if(isS3MTilesLayer){
//             picked.primitive.setSelection(picked.id);
//         }
//     }
//     else{
//         for(let i = 0,j = this.primitives.length;i < j;i++){
//             let primitive = this.primitives.get(i);
//             primitive instanceof S3MTilesLayer && primitive.releaseSelection();
//         }
//     }
//
//     return picked;
// };

S3MTilesLayer.prototype.loadConfig = function(url) {
  let that = this
  Cesium.when(url)
    .then(function(url) {
      let basePath
      let resource = Cesium.Resource.createIfNeeded(url)
      basePath = resource.getBaseUri(true)
      that._url = resource.url
      that._basePath = basePath
      that._baseResource = resource
      return resource.fetchJson()
    })
    .then(function(config) {
      let extensions = config.extensions
      that.fileType = extensions['s3m:FileType']
      let lon = config.position.x
      let lat = config.position.y
      let height = config.position.z
      that._position = Cesium.Cartesian3.fromDegrees(lon, lat, height)
      that.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        that._position
      )
      that.invModelMatrix = Cesium.Matrix4.inverse(
        that.modelMatrix,
        that.invModelMatrix
      )
      that._rectangle = Cesium.Rectangle.fromDegrees(
        config.geoBounds.left,
        config.geoBounds.bottom,
        config.geoBounds.right,
        config.geoBounds.top
      )
      if (config.heightRange) {
        that._minHeight = config.heightRange.min
        that._maxHeight = config.heightRange.max
      }

      if (config.wDescript) {
        let wDescript = config.wDescript.range
        that._minWValue = wDescript.min
        that._maxWValue = wDescript.max
      }

      for (let i = 0, len = config.tiles.length; i < len; i++) {
        let fileName = config.tiles[i].url
        let boundingVolume = {
          box: config.tiles[i].boundingbox
        }

        let tile = new S3MTile(that, undefined, boundingVolume, fileName)
        tile.isRootTile = true
        that._cache.add(tile)
        that._rootTiles.push(tile)
      }

      that._readyPromise.resolve(that)
    })
    .otherwise(function(error) {
      that._readyPromise.reject(error)
    })
}

S3MTilesLayer.prototype._tranverseRenderEntity = function(options, callback) {
  let stack = []
  for (let i = 0, j = this._rootTiles.length; i < j; i++) {
    let rootTile = this._rootTiles[i]
    stack.push(rootTile)
  }

  while (stack.length) {
    let tile = stack.pop()

    for (let i = 0, j = tile.renderEntities.length; i < j; i++) {
      const renderEntity = tile.renderEntities[i]
      if (renderEntity.ready) {
        callback(renderEntity, options)
      }
    }

    for (let i = 0, j = tile.children.length; i < j; i++) {
      stack.push(tile.children[i])
    }
  }
}

function updateObjsOperationCallback(renderEntity, options) {
  renderEntity.updateObjsOperation(options.ids, options)
}

S3MTilesLayer.prototype._updateObjsOperation = function(ids) {
  this._tranverseRenderEntity(
    {
      ids: ids
    },
    updateObjsOperationCallback
  )
}

S3MTilesLayer.prototype._setObjsOperationType = function(ids, operationType) {
  Cesium.Check.defined('set Objs Operation ids', ids)
  Cesium.Check.defined('set Objs Operation operationType', operationType)
  if (!Array.isArray(ids)) {
    ids = [ids]
  }

  let tmpArr = new Cesium.AssociativeArray()

  let id
  for (let i = 0, j = ids.length; i < j; i++) {
    id = ids[i]
    if (!Cesium.defined(id)) {
      continue
    }
    let operation = Cesium.defaultValue(this._objsOperationList[id], 0)
    if (operation === operationType) {
      continue
    }

    operation = operation | operationType
    this._objsOperationList[id] = operation
    tmpArr.set(id, operation)
  }

  if (tmpArr.length > 0) {
    this._updateObjsOperation(tmpArr._hash)
  }
}

S3MTilesLayer.prototype._removeObjsOperationType = function(
  ids,
  operationType
) {
  Cesium.Check.defined('set Objs Operation ids', ids)
  if (!Array.isArray(ids)) {
    ids = [ids]
  }

  let nonOperationType = OperationType.ALL ^ operationType
  let tmpArr = new Cesium.AssociativeArray()

  let id
  for (let i = 0, j = ids.length; i < j; i++) {
    id = ids[i]
    let operation = this._objsOperationList[id]
    if (!Cesium.defined(operation)) {
      continue
    }

    operation &= nonOperationType
    if (operation === OperationType.RESET) {
      delete this._objsOperationList[id]
    } else {
      this._objsOperationList[id] = operation
    }

    tmpArr.set(id, operation)
  }

  if (tmpArr.length > 0) {
    this._updateObjsOperation(tmpArr._hash)
  }
}

S3MTilesLayer.prototype.releaseSelection = function() {
  if (this._selections.length < 1) {
    return
  }

  this._removeObjsOperationType(this._selections, OperationType.SELECTED)
  this._selections.length = 0
}

S3MTilesLayer.prototype.setSelection = function(ids) {
  Cesium.Check.defined('setSelection ids', ids)

  if (!Array.isArray(ids)) {
    ids = [ids]
  }

  this.releaseSelection()

  this._selections = this._selections.concat(ids)
  this._setObjsOperationType(ids, OperationType.SELECTED)
}

function sortRequestByPriority(a, b) {
  return a.priority - b.priority
}

function requestTiles(layer) {
  let requestTiles = layer._requestTiles
  let length = requestTiles.length
  requestTiles.sort(sortRequestByPriority)
  for (let i = 0; i < length; ++i) {
    let tile = requestTiles[i]
    tile.requestContent()
  }
}

function processTiles(layer, frameState) {
  let tiles = layer._processTiles
  let length = tiles.length
  for (let i = 0; i < length; ++i) {
    let tile = tiles[i]
    tile.update(frameState, layer)
  }
}

function updateTiles(layer, frameState) {
  let selectedTiles = layer._selectedTiles
  let length = selectedTiles.length
  for (let i = 0; i < length; i++) {
    selectedTiles[i].update(frameState, layer)
  }
}

function unloadTile(layer, tile) {
  tile.free()
}

function freeResource(layer) {
  layer._cache.unloadTiles(layer, unloadTile)
}

S3MTilesLayer.prototype.prePassesUpdate = function(frameState) {
  if (!this.ready) {
    return
  }

  if (frameState.newFrame) {
    this._cache.reset()
    this._requestTiles.length = 0
    this._processTiles.length = 0
    this._selectedTiles.length = 0
  }
}

S3MTilesLayer.prototype.postPassesUpdate = function(frameState) {
  if (!this.ready) {
    return
  }

  freeResource(this)
}

S3MTilesLayer.prototype.update = function(frameState) {
  if (!this.ready) {
    return
  }

  this._schuduler.schedule(this, frameState)
  requestTiles(this)
  processTiles(this, frameState)
  updateTiles(this, frameState)
}

S3MTilesLayer.prototype.isDestroyed = function() {
  return false
}

S3MTilesLayer.prototype.destroy = function() {
  this._cache.reset()
  freeResource(this)
  this._rootTiles.length = 0
  this._requestTiles.length = 0
  this._processTiles.length = 0
  this._selectedTiles.length = 0
  return Cesium.destroyObject(this)
}

export default S3MTilesLayer
