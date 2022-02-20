import DDSTexture from './DDSTexture.js'
import MaterialPass from './MaterialPass.js'
import S3MContentFactory from './Factory/S3MContentFactory.js'
import VertexCompressOption from './Enum/VertexCompressOption.js'
const  { Cesium }  = DC.Namespace

function S3MContentParser() {}

function parseMaterial(context, content, tile) {
  let materialTable = {}
  let materials = content.materials.material
  for (let i = 0, j = materials.length; i < j; i++) {
    let material = materials[i].material
    let materialCode = material.id
    let materialPass = new MaterialPass()
    materialTable[materialCode] = materialPass
    let ambient = material.ambient
    materialPass.ambientColor = new Cesium.Color(
      ambient.r,
      ambient.g,
      ambient.b,
      ambient.a
    )
    let diffuse = material.diffuse
    materialPass.diffuseColor = new Cesium.Color(
      diffuse.r,
      diffuse.g,
      diffuse.b,
      diffuse.a
    )
    let specular = material.specular
    materialPass.specularColor = new Cesium.Color(
      specular.r,
      specular.g,
      specular.b,
      specular.a
    )
    materialPass.shininess = material.shininess
    materialPass.bTransparentSorting = material.transparentsorting
    let textureStates = material.textureunitstates
    let len = textureStates.length
    for (let k = 0; k < len; k++) {
      let textureState = textureStates[k].textureunitstate
      let textureCode = textureState.id
      let wrapS =
        textureState.addressmode.u === 0
          ? Cesium.TextureWrap.REPEAT
          : Cesium.TextureWrap.CLAMP_TO_EDGE
      let wrapT =
        textureState.addressmode.v === 0
          ? Cesium.TextureWrap.REPEAT
          : Cesium.TextureWrap.CLAMP_TO_EDGE
      materialPass.texMatrix = Cesium.Matrix4.unpack(textureState.texmodmatrix)
      let textureInfo = content.texturePackage[textureCode]
      if (
        Cesium.defined(textureInfo) &&
        textureInfo.arrayBufferView.byteLength > 0
      ) {
        textureInfo.wrapS = wrapS
        textureInfo.wrapT = wrapT
        let keyword = tile.fileName + textureCode
        let texture = context.textureCache.getTexture(keyword)
        if (!Cesium.defined(texture)) {
          if (
            Cesium.PixelFormat.isCompressedFormat(textureInfo.internalFormat)
          ) {
            texture = new DDSTexture(context, textureCode, textureInfo)
          } else {
            let isPowerOfTwo =
              Cesium.Math.isPowerOfTwo(textureInfo.width) &&
              Cesium.Math.isPowerOfTwo(textureInfo.height)
            texture = new Cesium.Texture({
              context: context,
              source: {
                width: textureInfo.width,
                height: textureInfo.height,
                arrayBufferView: textureInfo.arrayBufferView
              },
              sampler: new Cesium.Sampler({
                minificationFilter: isPowerOfTwo
                  ? context._gl.LINEAR_MIPMAP_LINEAR
                  : context._gl.LINEAR,
                wrapS: wrapS,
                wrapT: wrapT
              })
            })

            if (isPowerOfTwo) {
              texture.generateMipmap(Cesium.MipmapHint.NICEST)
            }
          }

          context.textureCache.addTexture(keyword, texture)
        }

        materialPass.textures.push(texture)
      }
    }
  }

  return materialTable
}

function calcBoundingVolumeForNormal(vertexPackage, modelMatrix) {
  let boundingSphere = new Cesium.BoundingSphere()
  let v1 = new Cesium.Cartesian3()
  let positionAttr = vertexPackage.vertexAttributes[0]
  let dim = positionAttr.componentsPerAttribute
  let isCompress =
    Cesium.defined(vertexPackage.compressOptions) &&
    (vertexPackage.compressOptions & VertexCompressOption.SVC_Vertex) ===
      VertexCompressOption.SVC_Vertex
  let normConstant = 1.0
  let minVertex
  let vertexTypedArray
  if (isCompress) {
    normConstant = vertexPackage.vertCompressConstant
    minVertex = new Cesium.Cartesian3(
      vertexPackage.minVerticesValue.x,
      vertexPackage.minVerticesValue.y,
      vertexPackage.minVerticesValue.z
    )
    vertexTypedArray = new Uint16Array(
      positionAttr.typedArray.buffer,
      positionAttr.typedArray.byteOffset,
      positionAttr.typedArray.byteLength / 2
    )
  } else {
    vertexTypedArray = new Float32Array(
      positionAttr.typedArray.buffer,
      positionAttr.typedArray.byteOffset,
      positionAttr.typedArray.byteLength / 4
    )
  }

  let vertexArray = []
  for (let t = 0; t < vertexPackage.verticesCount; t++) {
    Cesium.Cartesian3.fromArray(vertexTypedArray, dim * t, v1)
    if (isCompress) {
      v1 = Cesium.Cartesian3.multiplyByScalar(v1, normConstant, v1)
      v1 = Cesium.Cartesian3.add(v1, minVertex, v1)
    }
    vertexArray.push(Cesium.Cartesian3.clone(v1))
  }

  Cesium.BoundingSphere.fromPoints(vertexArray, boundingSphere)
  Cesium.BoundingSphere.transform(boundingSphere, modelMatrix, boundingSphere)
  vertexArray.length = 0
  return boundingSphere
}

let scratchCenter = new Cesium.Cartesian3()
function calcBoundingVolumeForInstance(vertexPackage) {
  let boundingSphere = new Cesium.BoundingSphere()
  let boundingsValues = vertexPackage.instanceBounds
  if (!Cesium.defined(boundingsValues)) {
    return boundingSphere
  }
  let pntLU = new Cesium.Cartesian3(
    boundingsValues[0],
    boundingsValues[1],
    boundingsValues[2]
  )
  let pntRD = new Cesium.Carteisan3(
    boundingsValues[3],
    boundingsValues[4],
    boundingsValues[5]
  )
  let center = new Cesium.Cartesian3.lerp(pntLU, pntRD, 0.5, scratchCenter)
  let radius = new Cesium.Cartesian3.distance(center, pntLU)
  boundingSphere.center = center
  boundingSphere.radius = radius
  return boundingSphere
}

function calcBoundingVolume(vertexPackage, modelMatrix) {
  if (vertexPackage.instanceIndex > -1) {
    return calcBoundingVolumeForInstance(vertexPackage)
  }

  return calcBoundingVolumeForNormal(vertexPackage, modelMatrix)
}

function parseGeodes(layer, content, materialTable, pagelodNode, pagelod) {
  let geoMap = {}
  let geodeList = pagelodNode.geodes
  for (let i = 0, j = geodeList.length; i < j; i++) {
    let geodeNode = geodeList[i]
    let geoMatrix = geodeNode.matrix
    let modelMatrix = Cesium.Matrix4.multiply(
      layer.modelMatrix,
      geoMatrix,
      new Cesium.Matrix4()
    )
    let boundingSphere
    if (Cesium.defined(pagelod.boundingVolume)) {
      boundingSphere = new Cesium.BoundingSphere(
        pagelod.boundingVolume.sphere.center,
        pagelod.boundingVolume.sphere.radius
      )
      Cesium.BoundingSphere.transform(
        boundingSphere,
        layer.modelMatrix,
        boundingSphere
      )
    }

    let skeletonNames = geodeNode.skeletonNames
    for (let m = 0, n = skeletonNames.length; m < n; m++) {
      let geoName = skeletonNames[m]
      let geoPackage = content.geoPackage[geoName]
      let vertexPackage = geoPackage.vertexPackage
      let arrIndexPackage = geoPackage.arrIndexPackage
      let pickInfo = geoPackage.pickInfo
      let material
      if (arrIndexPackage.length > 0) {
        material = materialTable[arrIndexPackage[0].materialCode]
      }

      let geodeBoundingVolume = Cesium.defined(boundingSphere)
        ? boundingSphere
        : calcBoundingVolume(vertexPackage, modelMatrix)

      geoMap[geoName] = S3MContentFactory[layer.fileType]({
        layer: layer,
        vertexPackage: vertexPackage,
        arrIndexPackage: arrIndexPackage,
        pickInfo: pickInfo,
        modelMatrix: modelMatrix,
        geoMatrix: geoMatrix,
        boundingVolume: geodeBoundingVolume,
        material: material,
        edgeGeometry: geoPackage.edgeGeometry,
        geoName: geoName
      })
    }
  }

  if (Object.keys(geoMap).length < 1) {
    return
  }

  if (!Cesium.defined(pagelod.boundingVolume)) {
    let arr = []
    for (let key in geoMap) {
      if (geoMap.hasOwnProperty(key)) {
        arr.push(geoMap[key].boundingVolume)
      }
    }

    pagelod.boundingVolume = {
      sphere: Cesium.BoundingSphere.fromBoundingSpheres(arr)
    }
  }

  pagelod.geoMap = geoMap
}

function parsePagelods(layer, content, materialTable) {
  let groupNode = content.groupNode
  let pagelods = []
  for (let i = 0, j = groupNode.pageLods.length; i < j; i++) {
    let pagelod = {}
    let pagelodNode = groupNode.pageLods[i]
    pagelod.rangeMode = pagelodNode.rangeMode
    pagelod.rangeDataList = pagelodNode.childTile
    pagelod.rangeList = pagelodNode.rangeList
    let center = pagelodNode.boundingSphere.center
    let radius = pagelodNode.boundingSphere.radius
    if (pagelod.rangeDataList !== '') {
      pagelod.boundingVolume = {
        sphere: {
          center: new Cesium.Cartesian3(center.x, center.y, center.z),
          radius: radius
        }
      }
    } else {
      pagelod.isLeafTile = true
    }

    parseGeodes(layer, content, materialTable, pagelodNode, pagelod)
    if (Cesium.defined(pagelod.geoMap)) {
      pagelods.push(pagelod)
    }
  }

  return pagelods
}

S3MContentParser.parse = function(layer, content, tile) {
  if (!Cesium.defined(content)) {
    return
  }

  let materialTable = parseMaterial(layer.context, content, tile)
  let pagelods = parsePagelods(layer, content, materialTable)

  return pagelods
}

export default S3MContentParser
