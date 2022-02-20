import S3MTilesNoLightVS from '../Shaders/S3MTilesNoLightVS.js'
import S3MTilesNoLightFS from '../Shaders/S3MTilesNoLightFS.js'
import RenderEntity from './RenderEntity.js'

const  { Cesium }  = DC.Namespace

function S3MObliqueRenderEntity(options) {
  RenderEntity.call(this, options)
  this.vs = S3MTilesNoLightVS
  this.fs = S3MTilesNoLightFS
}

S3MObliqueRenderEntity.prototype = Object.create(RenderEntity.prototype)

S3MObliqueRenderEntity.prototype.constructor = RenderEntity

function getOpaqueRenderState() {
  return Cesium.RenderState.fromCache({
    cull: {
      enabled: true
    },
    depthTest: {
      enabled: true,
      func: Cesium.DepthFunction.LESS_OR_EQUAL
    },
    blending: Cesium.BlendingState.ALPHA_BLEND
  })
}

function getUniformMap(material, layer, ro) {
  return {
    uGeoMatrix: function() {
      return ro.geoMatrix
    },
    uInverseGeoMatrix: function() {
      return ro.invGeoMatrix
    },
    uTexture: function() {
      return material.textures[0]
    },
    uTexture0Width: function() {
      return material.textures[0].width
    }
  }
}

S3MObliqueRenderEntity.prototype.createCommand = function() {
  if (
    Cesium.defined(this.colorCommand) ||
    this.vertexBufferToCreate.length !== 0 ||
    this.indexBufferToCreate.length !== 0 ||
    this.shaderProgramToCreate.length !== 0
  ) {
    return
  }

  let layer = this.layer
  let context = layer.context
  let vertexPackage = this.vertexPackage
  let arrIndexPackage = this.arrIndexPackage
  let attributes = vertexPackage.vertexAttributes
  if (arrIndexPackage.length < 1) {
    return
  }

  let indexPackage = arrIndexPackage[0]
  let material = this.material

  this.vertexArray = new Cesium.VertexArray({
    context: context,
    attributes: attributes,
    indexBuffer: indexPackage.indexBuffer
  })

  this.colorCommand = new Cesium.DrawCommand({
    primitiveType: indexPackage.primitiveType,
    modelMatrix: this.modelMatrix,
    boundingVolume: Cesium.BoundingSphere.clone(this.boundingVolume),
    vertexArray: this.vertexArray,
    shaderProgram: this.shaderProgram,
    pass: material.bTransparentSorting
      ? Cesium.Pass.TRANSLUCENT
      : Cesium.Pass.OPAQUE,
    renderState: getOpaqueRenderState(),
    instanceCount: vertexPackage.instanceCount
  })

  this.colorCommand.uniformMap = getUniformMap(material, layer, this)
  this.vertexPackage = undefined
  this.arrIndexPackage = undefined
  this.vs = undefined
  this.fs = undefined
  this.ready = true
}

S3MObliqueRenderEntity.prototype.update = function(frameState, layer) {
  if (!this.ready) {
    this.createBuffers(frameState)
    this.createShaderProgram(frameState)
    this.createCommand(frameState)
    this.initLayerSetting(layer)
    return
  }

  frameState.commandList.push(this.colorCommand)
}

S3MObliqueRenderEntity.prototype.isDestroyed = function() {
  return false
}

S3MObliqueRenderEntity.prototype.destroy = function() {
  this.shaderProgram =
    this.shaderProgram &&
    !this.shaderProgram.isDestroyed() &&
    this.shaderProgram.destroy()
  this.vertexArray =
    this.vertexArray &&
    !this.vertexArray.isDestroyed() &&
    this.vertexArray.destroy()
  this.material =
    this.material && !this.material.isDestroyed() && this.material.destroy()
  this.colorCommand = undefined
  this.vertexPackage = null
  this.arrIndexPackage = null
  this.modelMatrix = undefined
  this.pickInfo = undefined
  this.selectionInfoMap = undefined
  this.vs = undefined
  this.fs = undefined
  return Cesium.destroyObject(this)
}

export default S3MObliqueRenderEntity
