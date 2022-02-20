import ContentState from './Enum/ContentState.js'
import S3ModelParser from '../S3MParser/S3ModelParser.js'
import S3MContentParser from './S3MContentParser.js'
import RangeMode from './Enum/RangeMode.js'

const  { Cesium }  = DC.Namespace

function S3MTile(
  layer,
  parent,
  boundingVolume,
  fileName,
  rangeData,
  rangeMode
) {
  this.layer = layer
  this.parent = parent
  let path = fileName.replace(/\\/g, '/')
  this.fileExtension = Cesium.getExtensionFromUri(fileName)
  this.relativePath = getUrl(path, layer)
  this.fileName = fileName
  this.isLeafTile = rangeData === 0
  this.isRootTile = false
  this.boundingVolume = this.createBoundingVolume(
    boundingVolume,
    layer.modelMatrix
  )
  let baseResource = Cesium.Resource.createIfNeeded(layer._baseResource)
  if (Cesium.defined(parent)) {
    this.baseUri = parent.baseUri
  } else {
    let resource = new Cesium.Resource(path)
    this.baseUri = resource.getBaseUri()
  }

  this.contentResource = baseResource.getDerivedResource({
    url: this.relativePath
  })

  this.serverKey = Cesium.RequestScheduler.getServerKey(
    this.contentResource.getUrlComponent()
  )
  this.request = undefined
  this.cacheNode = undefined
  this.distanceToCamera = 0
  this.centerZDepth = 0
  this.pixel = 0
  this.depth = parent ? parent.depth + 1 : 0
  this.visibilityPlaneMask = 0
  this.visible = false
  this.children = []
  this.renderEntities = []
  this.lodRangeData = Cesium.defaultValue(rangeData, 16)
  this.lodRangeMode = Cesium.defaultValue(rangeMode, RangeMode.Pixel)
  this.contentState = this.isLeafTile
    ? ContentState.READY
    : ContentState.UNLOADED
  this.touchedFrame = 0
  this.requestedFrame = 0
  this.processFrame = 0
  this.selectedFrame = 0
  this.updatedVisibilityFrame = 0
  this.foveatedFactor = 0
  this.priority = 0
  this.priorityHolder = this
  this.wasMinPriorityChild = false
  this.shouldSelect = false
  this.selected = false
  this.finalResolution = true
  this.refines = false
}

Object.defineProperties(S3MTile.prototype, {
  renderable: {
    get: function() {
      let renderEntities = this.renderEntities
      let len = renderEntities.length
      if (len === 0) {
        return false
      }
      for (let i = 0; i < len; i++) {
        if (!renderEntities[i].ready) {
          return false
        }
      }

      return true
    }
  }
})

let scratchScale = new Cesium.Cartesian3()

function createSphere(sphere, transform) {
  let center = Cesium.Cartesian3.clone(sphere.center)
  let radius = sphere.radius
  center = Cesium.Matrix4.multiplyByPoint(transform, center, center)
  let scale = Cesium.Matrix4.getScale(transform, scratchScale)
  let maxScale = Cesium.Cartesian3.maximumComponent(scale)
  radius *= maxScale
  return new Cesium.TileBoundingSphere(center, radius)
}

function getUrl(fileName, layer) {
  fileName = fileName.replace(/\+/g, '%2B')
  let url = layer._basePath
  let isRealspace = layer._basePath.indexOf('realspace') > -1
  if (!isRealspace) {
    return fileName
  }

  let afterRealspace = url.replace(/(.*realspace)/, '')
  let lastUrl = url
    .replace(/\/rest\/realspace/g, '')
    .replace(afterRealspace, '')
  return (
    lastUrl +
    '/rest/realspace' +
    afterRealspace +
    'data/path/' +
    fileName
      .replace(/^\.*/, '')
      .replace(/^\//, '')
      .replace(/\/$/, '')
  )
}

function createBoundingBox(box, transform) {
  let min = new Cesium.Cartesian3(box.min.x, box.min.y, box.min.z)
  Cesium.Matrix4.multiplyByPoint(transform, min, min)
  let max = new Cesium.Cartesian3(box.max.x, box.max.y, box.max.z)
  Cesium.Matrix4.multiplyByPoint(transform, max, max)
  let sphere = Cesium.BoundingSphere.fromCornerPoints(
    min,
    max,
    new Cesium.BoundingSphere()
  )
  let center = sphere.center
  let radius = sphere.radius
  let scale = Cesium.Matrix4.getScale(transform, scratchScale)
  let maxScale = Cesium.Cartesian3.maximumComponent(scale)
  radius *= maxScale
  return new Cesium.TileBoundingSphere(center, radius)
}

S3MTile.prototype.createBoundingVolume = function(parameter, transform) {
  if (Cesium.defined(parameter.sphere)) {
    return createSphere(parameter.sphere, transform)
  } else if (Cesium.defined(parameter.box)) {
    return createBoundingBox(parameter.box, transform)
  }

  return undefined
}

S3MTile.prototype.canTraverse = function() {
  if (this.children.length === 0 || this.isLeafTile) {
    return false
  }

  if (!Cesium.defined(this.lodRangeData)) {
    return true
  }

  return this.pixel > this.lodRangeData
}

function getBoundingVolume(tile, frameState) {
  return tile.boundingVolume
}

S3MTile.prototype.getPixel = function(frameState) {
  let boundingVolume = this.boundingVolume
  let radius = boundingVolume.radius
  let center = boundingVolume.center
  let distance = Cesium.Cartesian3.distance(
    frameState.camera.positionWC,
    center
  )
  let height = frameState.context.drawingBufferHeight
  let theta = frameState.camera.frustum._fovy * 0.5
  let screenYPix = height * 0.5
  let lamat = screenYPix / Math.tan(theta)
  return (lamat * radius) / distance
}

S3MTile.prototype.distanceToTile = function(frameState) {
  let boundingVolume = getBoundingVolume(this, frameState)
  return boundingVolume.distanceToCamera(frameState)
}

let scratchToTileCenter = new Cesium.Cartesian3()

S3MTile.prototype.distanceToTileCenter = function(frameState) {
  const boundingVolume = getBoundingVolume(this, frameState)
  const toCenter = Cesium.Cartesian3.subtract(
    boundingVolume.center,
    frameState.camera.positionWC,
    scratchToTileCenter
  )
  return Cesium.Cartesian3.dot(frameState.camera.directionWC, toCenter)
}

S3MTile.prototype.visibility = function(frameState, parentVisibilityPlaneMask) {
  let boundingVolume = getBoundingVolume(this, frameState)
  return frameState.cullingVolume.computeVisibilityWithPlaneMask(
    boundingVolume,
    parentVisibilityPlaneMask
  )
}

let scratchCartesian = new Cesium.Cartesian3()
function priorityDeferred(tile, frameState) {
  let camera = frameState.camera
  let boundingVolume = tile.boundingVolume
  let radius = boundingVolume.radius
  let scaledCameraDirection = Cesium.Cartesian3.multiplyByScalar(
    camera.directionWC,
    tile.centerZDepth,
    scratchCartesian
  )
  let closestPointOnLine = Cesium.Cartesian3.add(
    camera.positionWC,
    scaledCameraDirection,
    scratchCartesian
  )
  let toLine = Cesium.Cartesian3.subtract(
    closestPointOnLine,
    boundingVolume.center,
    scratchCartesian
  )
  let distanceToCenterLine = Cesium.Cartesian3.magnitude(toLine)
  let notTouchingSphere = distanceToCenterLine > radius
  if (notTouchingSphere) {
    let toLineNormalized = Cesium.Cartesian3.normalize(toLine, scratchCartesian)
    let scaledToLine = Cesium.Cartesian3.multiplyByScalar(
      toLineNormalized,
      radius,
      scratchCartesian
    )
    let closestOnSphere = Cesium.Cartesian3.add(
      boundingVolume.center,
      scaledToLine,
      scratchCartesian
    )
    let toClosestOnSphere = Cesium.Cartesian3.subtract(
      closestOnSphere,
      camera.positionWC,
      scratchCartesian
    )
    let toClosestOnSphereNormalize = Cesium.Cartesian3.normalize(
      toClosestOnSphere,
      scratchCartesian
    )
    tile.foveatedFactor =
      1.0 -
      Math.abs(
        Cesium.Cartesian3.dot(camera.directionWC, toClosestOnSphereNormalize)
      )
  } else {
    tile.foveatedFactor = 0.0
  }
}

S3MTile.prototype.updateVisibility = function(frameState, layer) {
  let parent = this.parent
  let parentVisibilityPlaneMask = Cesium.defined(parent)
    ? parent.visibilityPlaneMask
    : Cesium.CullingVolume.MASK_INDETERMINATE
  this.distanceToCamera = this.distanceToTile(frameState)
  this.centerZDepth = this.distanceToTileCenter(frameState)
  this.pixel = this.getPixel(frameState)
  this.visibilityPlaneMask = this.visibility(
    frameState,
    parentVisibilityPlaneMask
  )
  this.visible =
    this.visibilityPlaneMask !== Cesium.CullingVolume.MASK_OUTSIDE &&
    this.distanceToCamera >= layer.visibleDistanceMin &&
    this.distanceToCamera <= layer.visibleDistanceMax
  this.priorityDeferred = priorityDeferred(this, frameState)
}

function createPriorityFunction(tile) {
  return function() {
    return tile.priority
  }
}

function getContentFailedFunction(tile) {
  return function(error) {
    tile.contentState = ContentState.FAILED
    tile.contentReadyPromise.reject(error)
  }
}

function createChildren(parent, datas) {
  let layer = parent.layer
  let length = datas.length
  let minRangeData = Number.MAX_VALUE
  let maxRangeData = 0
  let mode = RangeMode.Pixel
  for (let i = 0; i < length; i++) {
    let data = datas[i]
    let boundingVolume = data.boundingVolume
    let fileName = data.rangeDataList
    fileName = parent.baseUri + fileName
    let rangeData = data.rangeList
    let rangeMode = data.rangeMode
    let renderEntitieMap = data.geoMap
    if (rangeData !== 0) {
      let tile = new S3MTile(
        layer,
        parent,
        boundingVolume,
        fileName,
        rangeData,
        rangeMode
      )
      parent.children.push(tile)
      layer._cache.add(tile)
    }

    for (let geoName in renderEntitieMap) {
      if (renderEntitieMap.hasOwnProperty(geoName)) {
        parent.renderEntities.push(renderEntitieMap[geoName])
      }
    }

    minRangeData = Math.min(minRangeData, rangeData)
    maxRangeData = Math.max(maxRangeData, rangeData)
    mode = rangeMode
  }

  if (parent.isRootTile) {
    parent.lodRangeData =
      mode === RangeMode.Pixel ? minRangeData / 2 : maxRangeData * 2
    parent.lodRangeMode = mode
  }
}

function contentReadyFunction(layer, tile, arrayBuffer) {
  layer._cache.add(tile)

  S3ModelParser.s3tc = layer.context.s3tc
  S3ModelParser.pvrtc = layer.context.pvrtc
  S3ModelParser.etc1 = layer.context.etc1
  let content = S3ModelParser.parseBuffer(arrayBuffer)

  if (!content) {
    tile.contentState = ContentState.FAILED
    tile.contentReadyPromise.reject()
    return
  }

  let data = S3MContentParser.parse(layer, content, tile)

  createChildren(tile, data)
  tile.selectedFrame = 0
  tile.contentState = ContentState.READY
  tile.contentReadyPromise.resolve(content)
}

S3MTile.prototype.requestContent = function() {
  let that = this
  let layer = this.layer

  let resource = this.contentResource.clone()

  let request = new Cesium.Request({
    throttle: true,
    throttleByServer: true,
    type: Cesium.RequestType.TILES3D,
    priorityFunction: createPriorityFunction(this),
    serverKey: this.serverKey
  })

  this.request = request
  resource.request = request

  let promise = resource.fetchArrayBuffer()

  if (!Cesium.defined(promise)) {
    return false
  }

  this.contentState = ContentState.LOADING
  this.contentReadyPromise = Cesium.when.defer()
  let contentFailedFunction = getContentFailedFunction(this)

  promise
    .then(function(arrayBuffer) {
      if (that.isDestroyed()) {
        contentFailedFunction()
        return
      }

      contentReadyFunction(layer, that, arrayBuffer)
    })
    .otherwise(function(error) {
      if (request.state === Cesium.RequestState.CANCELLED) {
        that.contentState = ContentState.UNLOADED
        return
      }

      contentFailedFunction(error)
    })

  return true
}

function priorityNormalizeAndClamp(value, minimum, maximum) {
  return Math.max(
    Cesium.Math.normalize(value, minimum, maximum) - Cesium.Math.EPSILON7,
    0.0
  )
}

function isolateDigits(normalizedValue, numberOfDigits, leftShift) {
  let scaled = normalizedValue * Math.pow(10, numberOfDigits)
  let integer = parseInt(scaled)
  return integer * Math.pow(10, leftShift)
}

S3MTile.prototype.updatePriority = function(layer, frameState) {
  let minimumPriority = layer._minimumPriority
  let maximumPriority = layer._maximumPriority
  let leftShift = 4
  let digitsCount = 4

  let normalizedFoveatedFactor = priorityNormalizeAndClamp(
    this.foveatedFactor,
    minimumPriority.foveatedFactor,
    maximumPriority.foveatedFactor
  )
  let foveatedDigits = isolateDigits(
    normalizedFoveatedFactor,
    digitsCount,
    leftShift
  )

  leftShift = 8
  let normalizedPixel = priorityNormalizeAndClamp(
    this.pixel,
    minimumPriority.pixel,
    maximumPriority.pixel
  )
  let pixelDigits = isolateDigits(1.0 - normalizedPixel, digitsCount, leftShift)

  leftShift = 0
  let distancePriority = priorityNormalizeAndClamp(
    this.distanceToCamera,
    minimumPriority.distance,
    maximumPriority.distance
  )
  let distanceDigit = isolateDigits(distancePriority, digitsCount, leftShift)
  this.priority = foveatedDigits + pixelDigits + distanceDigit
}

S3MTile.prototype.update = function(frameState, layer) {
  for (let i = 0, j = this.renderEntities.length; i < j; i++) {
    this.renderEntities[i].update(frameState, layer)
  }
}

S3MTile.prototype.free = function() {
  this.contentState = ContentState.UNLOADED
  this.request = undefined
  this.cacheNode = undefined
  this.priorityHolder = undefined
  this.contentReadyPromise = undefined
  this.priorityHolder = undefined
  for (let i = 0, j = this.renderEntities.length; i < j; i++) {
    this.renderEntities[i].destroy()
  }

  this.renderEntities.length = 0
  this.children.length = 0
}

S3MTile.prototype.isDestroyed = function() {
  return false
}

S3MTile.prototype.destroy = function() {
  this.free()
  return Cesium.destroyObject(this)
}

export default S3MTile
