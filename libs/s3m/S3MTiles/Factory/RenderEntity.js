import S3MCreateVertexJob from '../S3MCreateVertexJob.js'
import S3MCreateIndexJob from '../S3MCreateIndexJob.js'
import S3MCreateShaderProgramJob from '../S3MCreateShaderProgramJob.js'
import MaterialPass from '../MaterialPass.js'

const  { Cesium }  = DC.Namespace

function RenderEntity(options) {
  this.layer = options.layer
  this.vertexPackage = options.vertexPackage
  this.arrIndexPackage = options.arrIndexPackage
  this.vertexBufferToCreate = new Cesium.Queue()
  this.indexBufferToCreate = new Cesium.Queue()
  this.shaderProgramToCreate = new Cesium.Queue()
  let i, j
  for (i = 0, j = this.vertexPackage.vertexAttributes.length; i < j; i++) {
    this.vertexBufferToCreate.enqueue(i)
  }

  for (i = 0, j = this.arrIndexPackage.length; i < j; i++) {
    this.indexBufferToCreate.enqueue(i)
  }

  this.shaderProgramToCreate.enqueue(0)

  this.boundingVolume = options.boundingVolume
  this.material = Cesium.defaultValue(options.material, new MaterialPass())
  this.geoName = options.geoName
  this.modelMatrix = options.modelMatrix
  this.geoMatrix = options.geoMatrix
  this.invGeoMatrix = Cesium.Matrix4.inverse(
    this.geoMatrix,
    new Cesium.Matrix4()
  )
  this.instanceCount = options.vertexPackage.instanceCount
  this.attributeLocations = options.vertexPackage.attrLocation
  this.shaderProgram = undefined
  this.vertexArray = undefined
  this.colorCommand = undefined
  this.pickInfo = Cesium.defaultValue(options.pickInfo, {})
  this.selectionInfoMap = new Cesium.AssociativeArray()
  this.batchTable = undefined
  this.batchTableDirty = false
  this.idsOperationMap = new Cesium.AssociativeArray()
  this.pickColorIdentifier = 'vSecondColor'
  this.createBoundingBoxForInstance()
  this.ready = false
}

const _vertexBufferJob = new S3MCreateVertexJob()
const _indexBufferJob = new S3MCreateIndexJob()
const _shaderProgramJob = new S3MCreateShaderProgramJob()

function createVertexBuffers(renderEntity, frameState) {
  let context = renderEntity.layer.context
  let queue = renderEntity.vertexBufferToCreate
  while (queue.length) {
    let index = queue.peek()
    _vertexBufferJob.set(context, renderEntity, index)
    if (
      !frameState.jobScheduler.execute(_vertexBufferJob, Cesium.JobType.BUFFER)
    ) {
      break
    }

    queue.dequeue()
  }
}

function createIndexBuffers(renderEntity, frameState) {
  let context = renderEntity.layer.context
  let queue = renderEntity.indexBufferToCreate
  while (queue.length) {
    let index = queue.peek()
    _indexBufferJob.set(context, renderEntity, index)
    if (
      !frameState.jobScheduler.execute(_indexBufferJob, Cesium.JobType.BUFFER)
    ) {
      break
    }

    queue.dequeue()
  }
}

function createShaderProgram(renderEntity, frameState) {
  let context = renderEntity.layer.context
  let queue = renderEntity.shaderProgramToCreate
  while (queue.length) {
    let index = queue.peek()
    _shaderProgramJob.set(context, renderEntity)
    if (
      !frameState.jobScheduler.execute(
        _shaderProgramJob,
        Cesium.JobType.PROGRAM
      )
    ) {
      break
    }

    queue.dequeue()
  }
}

function createBatchTable(renderEntity, frameState) {
  if (Cesium.defined(renderEntity.batchTable) || !renderEntity.pickInfo) {
    return
  }

  const context = renderEntity.layer.context
  let attributes = []
  attributes.push(
    {
      functionName: 'batchTable_operation',
      componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
      componentsPerAttribute: 4
    },
    {
      functionName: 'batchTable_pickColor',
      componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
      componentsPerAttribute: 4,
      normalize: true
    }
  )

  let pickInfo = renderEntity.pickInfo
  let pickIds = Object.keys(pickInfo)
  let numberOfInstances =
    renderEntity.instanceCount > 0 ? renderEntity.instanceCount : pickIds.length
  renderEntity.batchTable = new Cesium.BatchTable(
    context,
    attributes,
    numberOfInstances
  )
}

RenderEntity.prototype.createBuffers = function(frameState) {
  createVertexBuffers(this, frameState)
  createIndexBuffers(this, frameState)
}

RenderEntity.prototype.createShaderProgram = function(frameState) {
  createShaderProgram(this, frameState)
}

RenderEntity.prototype.createBatchTable = function(frameState) {
  createBatchTable(this, frameState)
}

let scratchPntCenter = new Cesium.Cartesian3()
RenderEntity.prototype.createBoundingBoxForInstance = function() {
  const vertexPackage = this.vertexPackage
  if (
    !Cesium.defined(vertexPackage) ||
    vertexPackage.instanceIndex === -1 ||
    !Cesium.defined(vertexPackage.instanceBounds)
  ) {
    return
  }

  let instanceBounds = vertexPackage.instanceBounds
  let pntLU = new Cesium.Cartesian3(
    instanceBounds[0],
    instanceBounds[1],
    instanceBounds[2]
  )
  let pntRD = new Cesium.Cartesian3(
    instanceBounds[3],
    instanceBounds[4],
    instanceBounds[5]
  )
  let pntCenter = Cesium.Cartesian3.lerp(pntLU, pntRD, 0.5, scratchPntCenter)
  let dRadius = Cesium.Cartesian3.distance(pntCenter, pntLU)
  let vecCenter = new Cesium.Cartesian3()
  Cesium.Matrix4.multiplyByPoint(this.modelMatrix, pntCenter, vecCenter)
  this.boundingVolume.center = vecCenter
  this.boundingVolume.radius = dRadius
  vertexPackage.instanceBounds = undefined
}

RenderEntity.prototype.initLayerSetting = function(layer) {
  if (Object.keys(layer._objsOperationList).length > 0) {
    this.updateObjsOperation(layer._objsOperationList)
  }
}

let cartesian4Scratch = new Cesium.Cartesian4()
RenderEntity.prototype.createPickIds = function() {
  const layer = this.layer
  const context = layer.context
  const pickInfo = this.pickInfo
  if (!Cesium.defined(pickInfo)) {
    return
  }

  for (let id in pickInfo) {
    if (!pickInfo.hasOwnProperty(id)) {
      continue
    }

    this.selectionInfoMap.set(id, pickInfo[id])
  }

  let batchTable = this.batchTable
  let selectionInfoMap = this.selectionInfoMap
  let hash = selectionInfoMap._hash
  for (let id in hash) {
    if (hash.hasOwnProperty(id)) {
      let selInfo = selectionInfoMap.get(id)
      let pickId
      if (!Cesium.defined(pickId)) {
        pickId = context.createPickId({
          primitive: layer,
          id: id
        })
      }
      let pickColor = pickId.color
      cartesian4Scratch.x = Cesium.Color.floatToByte(pickColor.red)
      cartesian4Scratch.y = Cesium.Color.floatToByte(pickColor.green)
      cartesian4Scratch.z = Cesium.Color.floatToByte(pickColor.blue)
      cartesian4Scratch.w = Cesium.Color.floatToByte(pickColor.alpha)
      let instanceIds = selInfo.instanceIds
      if (this.instanceCount > 0) {
        instanceIds.map(function(instanceId) {
          batchTable.setBatchedAttribute(instanceId, 1, cartesian4Scratch)
        })
      } else {
        let batchId = selInfo[0].batchId
        batchTable.setBatchedAttribute(batchId, 1, cartesian4Scratch)
      }
    }
  }

  this.pickInfo = undefined
}

RenderEntity.prototype.updateBatchTableAttributes = function() {
  let ro = this

  let idsOperationMap = this.idsOperationMap
  for (let i = 0, j = idsOperationMap.length; i < j; i++) {
    let obj = idsOperationMap.values[i]
    if (!obj.dirty) {
      continue
    }

    obj.dirty = false
    if (this.instanceCount > 0) {
      if (Array.isArray(obj.instanceIds)) {
        obj.instanceIds.map(function(instanceId) {
          ro.batchTable.setBatchedAttribute(instanceId, 0, obj.operationValue)
        })
      }
    } else {
      if (Cesium.defined(obj.batchId)) {
        this.batchTable.setBatchedAttribute(obj.batchId, 0, obj.operationValue)
      }
    }
  }
}

RenderEntity.prototype.updateObjsOperation = function(ids) {
  if (!this.ready || this.selectionInfoMap.length < 1) {
    return
  }

  let selectValues = this.selectionInfoMap._hash
  for (let id in selectValues) {
    if (!selectValues.hasOwnProperty(id)) {
      continue
    }

    let operationType = ids[id]
    if (!Cesium.defined(operationType)) {
      continue
    }

    let selectInfo = selectValues[id][0]
    let batchId = selectInfo.batchId
    let instanceIds = selectInfo.instanceIds
    let obj = this.idsOperationMap.get(id)
    if (!Cesium.defined(obj)) {
      obj = {
        batchId: batchId,
        instanceIds: instanceIds,
        operationValue: new Cesium.Cartesian4(),
        dirty: true
      }
    }

    obj.dirty = true
    obj.operationValue.x = (obj.operationValue.x & 0x01) | operationType
    this.idsOperationMap.set(id, obj)

    this.batchTableDirty = true
  }
}

RenderEntity.prototype.createCommand =
  Cesium.DeveloperError.throwInstantiationError

RenderEntity.prototype.update = Cesium.DeveloperError.throwInstantiationError

RenderEntity.prototype.isDestroyed =
  Cesium.DeveloperError.throwInstantiationError

RenderEntity.prototype.destroy = Cesium.DeveloperError.throwInstantiationError

export default RenderEntity
