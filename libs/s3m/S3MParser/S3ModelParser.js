import pako from './pako_inflate.js'
import DXTTextureDecode from './DXTTextureDecode.js'

const  { Cesium }  = DC.Namespace

function S3ModelParser() {}

S3ModelParser.s3tc = true
S3ModelParser.pvrtc = false
S3ModelParser.etc1 = false

let S3MBVertexTag = {
  SV_Unkown: 0,
  SV_Standard: 1,
  SV_Compressed: 2
}

const S3MPixelFormat = {
  LUMINANCE_8: 1,
  LUMINANCE_16: 2,
  ALPHA: 3,
  ALPHA_4_LUMINANCE_4: 4,
  LUMINANCE_ALPHA: 5,
  RGB_565: 6,
  BGR565: 7,
  RGB: 10,
  BGR: 11,
  ARGB: 12,
  ABGR: 13,
  BGRA: 14,
  WEBP: 25,
  RGBA: 28,
  DXT1: 17,
  DXT2: 18,
  DXT3: 19,
  DXT4: 20,
  DXT5: 21,
  CRN_DXT5: 26,
  STANDARD_CRN: 27
}

const VertexCompressOption = {
  SVC_Vertex: 1,
  SVC_Normal: 2,
  SVC_VertexColor: 4,
  SVC_SecondColor: 8,
  SVC_TexutreCoord: 16,
  SVC_TexutreCoordIsW: 32
}

function unZip(buffer, bytesOffset) {
  let dataZip = new Uint8Array(buffer, bytesOffset)
  return pako.inflate(dataZip).buffer
}

function getStringFromTypedArray(uint8Array, byteOffset, byteLength) {
  var byteOffset = 0
  var byteLength = uint8Array.byteLength
  var codeType = 'utf-8'

  uint8Array = uint8Array.subarray(byteOffset, byteOffset + byteLength)

  var decoder = new TextDecoder(codeType)
  return decoder.decode(uint8Array)
}

function parseString(buffer, view, bytesOffset) {
  let length = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  let stringBufferView = new Uint8Array(buffer, bytesOffset, length)
  let string = getStringFromTypedArray(stringBufferView)
  bytesOffset += length

  return {
    string: string,
    bytesOffset: bytesOffset
  }
}

function parseGeode(buffer, view, bytesOffset, geodes) {
  let geode = {}
  let skeletonNames = []
  let geoMatrix = new Array(16)
  for (let i = 0; i < 16; i++) {
    geoMatrix[i] = view.getFloat64(bytesOffset, true)
    bytesOffset += Float64Array.BYTES_PER_ELEMENT
  }

  geode.matrix = geoMatrix
  geode.skeletonNames = skeletonNames
  let skeletonCount = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  for (let i = 0; i < skeletonCount; i++) {
    let res = parseString(buffer, view, bytesOffset)
    skeletonNames.push(res.string)
    bytesOffset = res.bytesOffset
  }

  geodes.push(geode)

  return bytesOffset
}

function parsePageLOD(buffer, view, bytesOffset, pageLods) {
  let pageLOD = {}
  pageLOD.rangeList = view.getFloat32(bytesOffset, true)
  bytesOffset += Float32Array.BYTES_PER_ELEMENT
  pageLOD.rangeMode = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let center = {}
  center.x = view.getFloat64(bytesOffset, true)
  bytesOffset += Float64Array.BYTES_PER_ELEMENT
  center.y = view.getFloat64(bytesOffset, true)
  bytesOffset += Float64Array.BYTES_PER_ELEMENT
  center.z = view.getFloat64(bytesOffset, true)
  bytesOffset += Float64Array.BYTES_PER_ELEMENT
  let radius = view.getFloat64(bytesOffset, true)
  bytesOffset += Float64Array.BYTES_PER_ELEMENT
  pageLOD.boundingSphere = {
    center: center,
    radius: radius
  }

  let res = parseString(buffer, view, bytesOffset)
  let strChildTile = res.string
  bytesOffset = res.bytesOffset
  let index = strChildTile.indexOf('Geometry')
  if (index !== -1) {
    let ignoreString = strChildTile.substring(index)
    strChildTile = strChildTile.replace(ignoreString, '')
  }

  pageLOD.childTile = strChildTile
  pageLOD.geodes = []
  let geodeCount = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  for (let i = 0; i < geodeCount; i++) {
    bytesOffset = parseGeode(buffer, view, bytesOffset, pageLOD.geodes)
  }

  pageLods.push(pageLOD)

  return bytesOffset
}

function parseGroupNode(buffer, view, bytesOffset, result) {
  let groupNode = {}
  let geodes = []
  let pageLods = []
  let size = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  let count = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  for (let i = 0; i < count; i++) {
    bytesOffset = parsePageLOD(buffer, view, bytesOffset, pageLods)
  }
  groupNode.pageLods = pageLods
  let align = bytesOffset % 4
  if (align !== 0) {
    bytesOffset += 4 - align
  }

  result.groupNode = groupNode

  return bytesOffset
}

function parseVertex(buffer, view, bytesOffset, vertexPackage) {
  let verticesCount = view.getUint32(bytesOffset, true)
  vertexPackage.verticesCount = verticesCount
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  if (bytesOffset <= 0) {
    return bytesOffset
  }

  let vertexDimension = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let vertexStride = view.getUint16(bytesOffset, true)
  vertexStride = vertexDimension * Float32Array.BYTES_PER_ELEMENT
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let byteLength =
    verticesCount * vertexDimension * Float32Array.BYTES_PER_ELEMENT
  let vertexBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
  bytesOffset += byteLength
  let attributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation
  attrLocation['aPosition'] = attributes.length
  attributes.push({
    index: attrLocation['aPosition'],
    typedArray: vertexBuffer,
    componentsPerAttribute: vertexDimension,
    componentDatatype: 5126,
    offsetInBytes: 0,
    strideInBytes: vertexStride,
    normalize: false
  })

  return bytesOffset
}

function parseNormal(buffer, view, bytesOffset, vertexPackage) {
  let normalCount = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  if (normalCount <= 0) {
    return bytesOffset
  }

  let normalDimension = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let normalStride = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let byteLength =
    normalCount * normalDimension * Float32Array.BYTES_PER_ELEMENT
  let normalBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
  bytesOffset += byteLength
  let attributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation
  attrLocation['aNormal'] = attributes.length
  attributes.push({
    index: attrLocation['aNormal'],
    typedArray: normalBuffer,
    componentsPerAttribute: normalDimension,
    componentDatatype: 5126,
    offsetInBytes: 0,
    strideInBytes: normalStride,
    normalize: false
  })

  return bytesOffset
}

function parseVertexColor(buffer, view, bytesOffset, vertexPackage) {
  let colorCount = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  let verticesCount = vertexPackage.verticesCount
  let vertexColor
  if (colorCount > 0) {
    let colorStride = view.getUint16(bytesOffset, true)
    bytesOffset += Uint16Array.BYTES_PER_ELEMENT
    bytesOffset += Uint8Array.BYTES_PER_ELEMENT * 2
    let byteLength = colorCount * Uint8Array.BYTES_PER_ELEMENT * 4
    let typedArray = new Uint8Array(buffer, bytesOffset, byteLength)
    vertexColor = typedArray.slice(0, byteLength)
    bytesOffset += byteLength
  } else {
    vertexColor = new Uint8Array(4 * verticesCount)
    for (let m = 0; m < verticesCount; m++) {
      vertexColor[m * 4] = 255
      vertexColor[m * 4 + 1] = 255
      vertexColor[m * 4 + 2] = 255
      vertexColor[m * 4 + 3] = 255
    }
  }

  let attributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation
  attrLocation['aColor'] = attributes.length
  attributes.push({
    index: attrLocation['aColor'],
    typedArray: vertexColor,
    componentsPerAttribute: 4,
    componentDatatype: 5121,
    offsetInBytes: 0,
    strideInBytes: 4,
    normalize: true
  })

  vertexPackage.vertexColor = vertexColor

  return bytesOffset
}

function parseSecondColor(buffer, view, bytesOffset, vertexPackage) {
  let secondColorCount = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  if (secondColorCount <= 0) {
    return bytesOffset
  }

  let secondColorStride = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  bytesOffset += Uint8Array.BYTES_PER_ELEMENT * 2
  let byteLength = secondColorCount * Uint8Array.BYTES_PER_ELEMENT * 4
  let secColorBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
  bytesOffset += byteLength

  let attributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation
  attrLocation['aSecondColor'] = attributes.length
  attributes.push({
    index: attrLocation['aSecondColor'],
    typedArray: secColorBuffer,
    componentsPerAttribute: 4,
    componentDatatype: 5121,
    offsetInBytes: 0,
    strideInBytes: 4,
    normalize: true
  })

  return bytesOffset
}

function parseTexCoord(buffer, view, bytesOffset, vertexPackage) {
  let count = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT

  for (let i = 0; i < count; i++) {
    let texCoordCount = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let dimension = view.getUint16(bytesOffset, true)
    bytesOffset += Uint16Array.BYTES_PER_ELEMENT
    let texCoordStride = view.getUint16(bytesOffset, true)
    bytesOffset += Uint16Array.BYTES_PER_ELEMENT
    let byteLength = texCoordCount * dimension * Float32Array.BYTES_PER_ELEMENT
    let texCoordBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
    bytesOffset += byteLength
    let str = 'aTexCoord' + i
    let attributes = vertexPackage.vertexAttributes
    let attrLocation = vertexPackage.attrLocation
    attrLocation[str] = attributes.length
    attributes.push({
      index: attrLocation[str],
      typedArray: texCoordBuffer,
      componentsPerAttribute: dimension,
      componentDatatype: 5126,
      offsetInBytes: 0,
      strideInBytes: dimension * Float32Array.BYTES_PER_ELEMENT,
      normalize: false
    })
  }

  return bytesOffset
}

function parseInstanceInfo(buffer, view, bytesOffset, vertexPackage) {
  let count = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let attributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation

  for (let i = 0; i < count; i++) {
    let texCoordCount = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let texDimensions = view.getUint16(bytesOffset, true)
    bytesOffset += Uint16Array.BYTES_PER_ELEMENT
    let texCoordStride = view.getUint16(bytesOffset, true)
    bytesOffset += Uint16Array.BYTES_PER_ELEMENT
    let byteLength =
      texCoordCount * texDimensions * Float32Array.BYTES_PER_ELEMENT
    if (texDimensions === 17) {
      let instanceBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
      vertexPackage.instanceCount = texCoordCount
      vertexPackage.instanceMode = texDimensions
      vertexPackage.instanceBuffer = instanceBuffer
      vertexPackage.instanceIndex = 1
      let len = texDimensions * texCoordCount * 4
      let vertexColorInstance = instanceBuffer.slice(0, len)
      vertexPackage.vertexColorInstance = vertexColorInstance
      let byteStride
      if (texDimensions === 17) {
        byteStride = Float32Array.BYTES_PER_ELEMENT * 17
        attrLocation['uv2'] = attributes.length
        attributes.push({
          index: attrLocation['uv2'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 0,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })

        attrLocation['uv3'] = attributes.length
        attributes.push({
          index: attrLocation['uv3'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })

        attrLocation['uv4'] = attributes.length
        attributes.push({
          index: attrLocation['uv4'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })
        attrLocation['secondary_colour'] = attributes.length
        attributes.push({
          index: attrLocation['secondary_colour'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })
        attrLocation['uv6'] = attributes.length
        attributes.push({
          index: attrLocation['uv6'],
          componentsPerAttribute: 4,
          componentDatatype: 5121,
          normalize: true,
          offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })
      } else if (texDimensions === 29) {
        byteStride = Float32Array.BYTES_PER_ELEMENT * 29
        attrLocation['uv1'] = attributes.length
        attributes.push({
          index: attrLocation['uv1'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 0,
          strideInBytes: byteStride,
          instanceDivisor: 1,
          byteLength: byteLength
        })

        attrLocation['uv2'] = attributes.length
        attributes.push({
          index: attrLocation['uv2'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })

        attrLocation['uv3'] = attributes.length
        attributes.push({
          index: attrLocation['uv3'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })

        attrLocation['uv4'] = attributes.length
        attributes.push({
          index: attrLocation['uv4'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })

        attrLocation['uv5'] = attributes.length
        attributes.push({
          index: attrLocation['uv5'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })

        attrLocation['uv6'] = attributes.length
        attributes.push({
          index: attrLocation['uv6'],
          componentsPerAttribute: 4,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 20 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })

        attrLocation['uv7'] = attributes.length
        attributes.push({
          index: attrLocation['uv7'],
          componentsPerAttribute: 3,
          componentDatatype: 5126,
          normalize: false,
          offsetInBytes: 24 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })
        attrLocation['secondary_colour'] = attributes.length
        attributes.push({
          index: attrLocation['secondary_colour'],
          componentsPerAttribute: 4,
          componentDatatype: 5121,
          normalize: true,
          offsetInBytes: 27 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })
        attrLocation['uv9'] = attributes.length
        attributes.push({
          index: attrLocation['uv9'],
          componentsPerAttribute: 4,
          componentDatatype: 5121,
          normalize: true,
          offsetInBytes: 28 * Float32Array.BYTES_PER_ELEMENT,
          strideInBytes: byteStride,
          instanceDivisor: 1
        })
      }
    } else {
      let len = texCoordCount * texDimensions
      vertexPackage.instanceBounds = new Float32Array(len)
      for (let k = 0; k < len; k++) {
        vertexPackage.instanceBounds[k] = view.getFloat32(
          bytesOffset + k * Float32Array.BYTES_PER_ELEMENT,
          true
        )
      }
    }

    bytesOffset += byteLength
  }

  return bytesOffset
}

function parseCompressVertex(buffer, view, bytesOffset, vertexPackage) {
  let verticesCount = view.getUint32(bytesOffset, true)
  vertexPackage.verticesCount = verticesCount
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  if (bytesOffset <= 0) {
    return bytesOffset
  }

  let vertexDimension = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let vertexStride = view.getUint16(bytesOffset, true)
  vertexStride = vertexDimension * Int16Array.BYTES_PER_ELEMENT
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT

  let vertCompressConstant = view.getFloat32(bytesOffset, true)
  bytesOffset += Float32Array.BYTES_PER_ELEMENT
  let minVerticesValue = {}
  minVerticesValue.x = view.getFloat32(bytesOffset, true)
  bytesOffset += Float32Array.BYTES_PER_ELEMENT
  minVerticesValue.y = view.getFloat32(bytesOffset, true)
  bytesOffset += Float32Array.BYTES_PER_ELEMENT
  minVerticesValue.z = view.getFloat32(bytesOffset, true)
  bytesOffset += Float32Array.BYTES_PER_ELEMENT
  minVerticesValue.w = view.getFloat32(bytesOffset, true)
  bytesOffset += Float32Array.BYTES_PER_ELEMENT

  vertexPackage.vertCompressConstant = vertCompressConstant
  vertexPackage.minVerticesValue = minVerticesValue

  let byteLength =
    verticesCount * vertexDimension * Int16Array.BYTES_PER_ELEMENT
  let vertexBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
  bytesOffset += byteLength

  let attributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation
  attrLocation['aPosition'] = attributes.length
  attributes.push({
    index: attrLocation['aPosition'],
    typedArray: vertexBuffer,
    componentsPerAttribute: vertexDimension,
    componentDatatype: 5122,
    offsetInBytes: 0,
    strideInBytes: vertexStride,
    normalize: false
  })

  return bytesOffset
}

function parseCompressNormal(buffer, view, bytesOffset, vertexPackage) {
  let normalCount = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  if (normalCount <= 0) {
    return bytesOffset
  }

  let normalDimension = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let normalStride = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  let byteLength = normalCount * 2 * Int16Array.BYTES_PER_ELEMENT
  let normalBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
  bytesOffset += byteLength
  let attributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation
  attrLocation['aNormal'] = attributes.length
  attributes.push({
    index: attrLocation['aNormal'],
    typedArray: normalBuffer,
    componentsPerAttribute: 2,
    componentDatatype: 5122,
    offsetInBytes: 0,
    strideInBytes: normalStride,
    normalize: false
  })

  return bytesOffset
}

function parseCompressTexCoord(buffer, view, bytesOffset, vertexPackage) {
  vertexPackage.texCoordCompressConstant = []
  vertexPackage.minTexCoordValue = []
  let count = view.getUint16(bytesOffset, true)
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  bytesOffset += Uint16Array.BYTES_PER_ELEMENT
  for (let i = 0; i < count; i++) {
    let bNeedTexCoordZ = view.getUint8(bytesOffset, true)
    bytesOffset += Uint8Array.BYTES_PER_ELEMENT
    bytesOffset += Uint8Array.BYTES_PER_ELEMENT * 3
    let texCoordCount = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let dimension = view.getUint16(bytesOffset, true)
    bytesOffset += Uint16Array.BYTES_PER_ELEMENT
    let texCoordStride = view.getUint16(bytesOffset, true)
    bytesOffset += Uint16Array.BYTES_PER_ELEMENT

    let texCoordCompressConstant = view.getFloat32(bytesOffset, true)
    bytesOffset += Float32Array.BYTES_PER_ELEMENT
    vertexPackage.texCoordCompressConstant.push(texCoordCompressConstant)

    let minTexCoordValue = {}
    minTexCoordValue.x = view.getFloat32(bytesOffset, true)
    bytesOffset += Float32Array.BYTES_PER_ELEMENT
    minTexCoordValue.y = view.getFloat32(bytesOffset, true)
    bytesOffset += Float32Array.BYTES_PER_ELEMENT
    minTexCoordValue.z = view.getFloat32(bytesOffset, true)
    bytesOffset += Float32Array.BYTES_PER_ELEMENT
    minTexCoordValue.w = view.getFloat32(bytesOffset, true)
    bytesOffset += Float32Array.BYTES_PER_ELEMENT
    vertexPackage.minTexCoordValue.push(minTexCoordValue)

    let byteLength = texCoordCount * dimension * Int16Array.BYTES_PER_ELEMENT
    let texCoordBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
    bytesOffset += byteLength
    let align = bytesOffset % 4
    if (align !== 0) {
      bytesOffset += 4 - align
    }

    let str = 'aTexCoord' + i
    let attributes = vertexPackage.vertexAttributes
    let attrLocation = vertexPackage.attrLocation
    attrLocation[str] = attributes.length
    attributes.push({
      index: attrLocation[str],
      typedArray: texCoordBuffer,
      componentsPerAttribute: dimension,
      componentDatatype: 5122,
      offsetInBytes: 0,
      strideInBytes: dimension * Int16Array.BYTES_PER_ELEMENT,
      normalize: false
    })

    if (bNeedTexCoordZ) {
      byteLength = texCoordCount * Float32Array.BYTES_PER_ELEMENT
      let texCoordZBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
      bytesOffset += byteLength
      vertexPackage.texCoordZMatrix = true
      str = 'aTexCoordZ' + i
      attrLocation[str] = attributes.length
      attributes.push({
        index: attrLocation[str],
        typedArray: texCoordZBuffer,
        componentsPerAttribute: 1,
        componentDatatype: 5126,
        offsetInBytes: 0,
        strideInBytes: Float32Array.BYTES_PER_ELEMENT,
        normalize: false
      })
    }
  }
  return bytesOffset
}

function parseStandardSkeleton(buffer, view, bytesOffset, vertexPackage) {
  bytesOffset = parseVertex(buffer, view, bytesOffset, vertexPackage)

  bytesOffset = parseNormal(buffer, view, bytesOffset, vertexPackage)

  bytesOffset = parseVertexColor(buffer, view, bytesOffset, vertexPackage)

  bytesOffset = parseSecondColor(buffer, view, bytesOffset, vertexPackage)

  bytesOffset = parseTexCoord(buffer, view, bytesOffset, vertexPackage)

  bytesOffset = parseInstanceInfo(buffer, view, bytesOffset, vertexPackage)

  return bytesOffset
}

function parseCompressSkeleton(buffer, view, bytesOffset, vertexPackage) {
  let compressOptions = view.getUint32(bytesOffset, true)
  vertexPackage.compressOptions = compressOptions
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  if (
    (compressOptions & VertexCompressOption.SVC_Vertex) ===
    VertexCompressOption.SVC_Vertex
  ) {
    bytesOffset = parseCompressVertex(buffer, view, bytesOffset, vertexPackage)
  } else {
    bytesOffset = parseVertex(buffer, view, bytesOffset, vertexPackage)
  }

  if (
    (compressOptions & VertexCompressOption.SVC_Normal) ===
    VertexCompressOption.SVC_Normal
  ) {
    bytesOffset = parseCompressNormal(buffer, view, bytesOffset, vertexPackage)
  } else {
    bytesOffset = parseNormal(buffer, view, bytesOffset, vertexPackage)
  }

  bytesOffset = parseVertexColor(buffer, view, bytesOffset, vertexPackage)

  bytesOffset = parseSecondColor(buffer, view, bytesOffset, vertexPackage)

  if (
    (compressOptions & VertexCompressOption.SVC_TexutreCoord) ===
    VertexCompressOption.SVC_TexutreCoord
  ) {
    bytesOffset = parseCompressTexCoord(
      buffer,
      view,
      bytesOffset,
      vertexPackage
    )
  } else {
    bytesOffset = parseTexCoord(buffer, view, bytesOffset, vertexPackage)
  }

  if (
    (compressOptions & VertexCompressOption.SVC_TexutreCoordIsW) ===
    VertexCompressOption.SVC_TexutreCoordIsW
  ) {
    vertexPackage.textureCoordIsW = true
  }

  bytesOffset = parseInstanceInfo(buffer, view, bytesOffset, vertexPackage)

  return bytesOffset
}

function parseIndexPackage(buffer, view, bytesOffset, arrIndexPackage) {
  let count = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  for (let i = 0; i < count; i++) {
    let indexPackage = {}
    let indexCount = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let indexType = view.getUint8(bytesOffset, true)
    bytesOffset += Uint8Array.BYTES_PER_ELEMENT
    let bUseIndex = view.getUint8(bytesOffset, true)
    bytesOffset += Uint8Array.BYTES_PER_ELEMENT
    let primitiveType = view.getUint8(bytesOffset, true)
    bytesOffset += Uint8Array.BYTES_PER_ELEMENT
    bytesOffset += Uint8Array.BYTES_PER_ELEMENT

    if (indexCount > 0) {
      let indexBuffer = null
      let byteLength
      if (indexType === 1 || indexType === 3) {
        byteLength = indexCount * Uint32Array.BYTES_PER_ELEMENT
        indexBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
      } else {
        byteLength = indexCount * Uint16Array.BYTES_PER_ELEMENT
        indexBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
        if (indexCount % 2 !== 0) {
          byteLength += 2
        }
      }

      indexPackage.indicesTypedArray = indexBuffer
      bytesOffset += byteLength
    }

    indexPackage.indicesCount = indexCount
    indexPackage.indexType = indexType
    indexPackage.primitiveType = primitiveType

    let arrPassName = []
    let passNameCount = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    for (let j = 0; j < passNameCount; j++) {
      let res = parseString(buffer, view, bytesOffset)
      let passName = res.string
      bytesOffset = res.bytesOffset
      arrPassName.push(passName)
      indexPackage.materialCode = passName
    }

    let align = bytesOffset % 4
    if (align !== 0) {
      let nReserved = 4 - (bytesOffset % 4)
      bytesOffset += nReserved
    }

    arrIndexPackage.push(indexPackage)
  }

  return bytesOffset
}

function parseSkeleton(buffer, view, bytesOffset, geoPackage) {
  let size = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  let count = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  for (let i = 0; i < count; i++) {
    let res = parseString(buffer, view, bytesOffset)
    let geometryName = res.string
    bytesOffset = res.bytesOffset
    let align = bytesOffset % 4
    if (align !== 0) {
      bytesOffset += 4 - align
    }

    let tag = view.getUint32(bytesOffset, true)
    bytesOffset += Int32Array.BYTES_PER_ELEMENT

    let vertexPackage = {
      vertexAttributes: [],
      attrLocation: {},
      instanceCount: 0,
      instanceMode: 0,
      instanceIndex: -1
    }

    if (tag === S3MBVertexTag.SV_Standard) {
      bytesOffset = parseStandardSkeleton(
        buffer,
        view,
        bytesOffset,
        vertexPackage
      )
    } else if (tag === S3MBVertexTag.SV_Compressed) {
      bytesOffset = parseCompressSkeleton(
        buffer,
        view,
        bytesOffset,
        vertexPackage
      )
    }

    let arrIndexPackage = []
    bytesOffset = parseIndexPackage(buffer, view, bytesOffset, arrIndexPackage)

    let edgeGeometry = undefined
    if (
      arrIndexPackage.length === 2 &&
      arrIndexPackage[1].primitiveType === 13 &&
      arrIndexPackage[1].indicesCount >= 3
    ) {
      edgeGeometry = S3MEdgeProcessor.createEdgeDataByIndices(
        vertexPackage,
        arrIndexPackage[1]
      )
    }

    geoPackage[geometryName] = {
      vertexPackage: vertexPackage,
      arrIndexPackage: arrIndexPackage,
      edgeGeometry: edgeGeometry
    }
  }

  let secColorSize = view.getUint32(bytesOffset, true)
  bytesOffset += secColorSize
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT

  return bytesOffset
}

function parseTexturePackage(buffer, view, bytesOffset, texturePackage) {
  let size = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  let count = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  for (let i = 0; i < count; i++) {
    let res = parseString(buffer, view, bytesOffset)
    let textureCode = res.string
    bytesOffset = res.bytesOffset
    let align = bytesOffset % 4
    if (align !== 0) {
      bytesOffset += 4 - align
    }

    let level = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let width = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let height = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let compressType = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let size = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let pixelFormat = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let textureData = new Uint8Array(buffer, bytesOffset, size)
    bytesOffset += size
    let internalFormat =
      pixelFormat === S3MPixelFormat.RGB || pixelFormat === S3MPixelFormat.BGR
        ? 33776
        : 33779
    if (compressType === 22) {
      internalFormat = 36196 //rgb_etc1
    }

    if (
      !S3ModelParser.s3tc &&
      (internalFormat === 33776 || internalFormat === 33779)
    ) {
      let out = new Uint8Array(width * height * 4)
      DXTTextureDecode.decode(out, width, height, textureData, pixelFormat)
      textureData = out
      compressType = 0
      internalFormat =
        pixelFormat === S3MPixelFormat.RGB || pixelFormat === S3MPixelFormat.RGB
          ? 273
          : 4369
    }

    texturePackage[textureCode] = {
      id: textureCode,
      width: width,
      height: height,
      compressType: compressType,
      nFormat: pixelFormat,
      internalFormat: internalFormat,
      arrayBufferView: textureData
    }
  }

  return bytesOffset
}

function parseMaterial(buffer, view, bytesOffset, result) {
  let byteLength = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  let materialBuffer = new Uint8Array(buffer, bytesOffset, byteLength)
  let strMaterials = getStringFromTypedArray(materialBuffer)
  bytesOffset += byteLength
  result.materials = JSON.parse(strMaterials)

  return bytesOffset
}

let colorScratch = {
  red: 0,
  green: 0,
  blue: 0,
  alpha: 0
}

function unpackColor(array, startingIndex, result) {
  result.red = array[startingIndex++]
  result.green = array[startingIndex++]
  result.blue = array[startingIndex++]
  result.alpha = array[startingIndex]
  return result
}

let LEFT_16 = 65536
function parsePickInfo(
  buffer,
  view,
  bytesOffset,
  nOptions,
  geoPackage,
  version
) {
  if ((nOptions & 1) === 1) {
    let size = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    let count = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
    for (let i = 0; i < count; i++) {
      let res = parseString(buffer, view, bytesOffset)
      let geometryName = res.string
      bytesOffset = res.bytesOffset
      let selectInfoCount = view.getUint32(bytesOffset, true)
      bytesOffset += Uint32Array.BYTES_PER_ELEMENT
      let pickInfo = {}
      geoPackage[geometryName].pickInfo = pickInfo
      let bInstanced = geoPackage[geometryName].vertexPackage.instanceIndex
      if (bInstanced == -1) {
        //非实例化信息
        let batchIds = new Float32Array(
          geoPackage[geometryName].vertexPackage.verticesCount
        )
        for (let j = 0; j < selectInfoCount; j++) {
          let nDictID = view.getUint32(bytesOffset, true)
          bytesOffset += Uint32Array.BYTES_PER_ELEMENT
          let nSize = view.getUint32(bytesOffset, true)
          bytesOffset += Uint32Array.BYTES_PER_ELEMENT
          let infos = []
          for (let k = 0; k < nSize; k++) {
            let vertexColorOffset = view.getUint32(bytesOffset, true)
            bytesOffset += Uint32Array.BYTES_PER_ELEMENT
            let vertexCount = view.getUint32(bytesOffset, true)
            bytesOffset += Uint32Array.BYTES_PER_ELEMENT
            batchIds.fill(j, vertexColorOffset, vertexColorOffset + vertexCount)
            infos.push({
              vertexColorOffset: vertexColorOffset,
              vertexColorCount: vertexCount,
              batchId: j
            })
          }

          pickInfo[nDictID] = infos
        }
        createBatchIdAttribute(
          geoPackage[geometryName].vertexPackage,
          batchIds,
          undefined
        )
      } else {
        let instanceCount = geoPackage[geometryName].vertexPackage.instanceCount
        let instanceArray =
          geoPackage[geometryName].vertexPackage.instanceBuffer
        let instanceMode = geoPackage[geometryName].vertexPackage.instanceMode
        let instanceIds = new Float32Array(instanceCount)
        let selectionId = []
        for (let j = 0; j < selectInfoCount; j++) {
          let nDictID = view.getUint32(bytesOffset, true)
          selectionId.push(nDictID)
          bytesOffset += Uint32Array.BYTES_PER_ELEMENT
          let nSize = view.getUint32(bytesOffset, true)
          bytesOffset += Uint32Array.BYTES_PER_ELEMENT
          for (let k = 0; k < nSize; k++) {
            let instanceId = view.getUint32(bytesOffset, true)
            bytesOffset += Uint32Array.BYTES_PER_ELEMENT
            if (version === 3) {
              let vertexCount = view.getUint32(bytesOffset, true)
              bytesOffset += Uint32Array.BYTES_PER_ELEMENT
            }
          }
        }

        let beginOffset = instanceMode === 17 ? 16 : 28
        beginOffset *= Float32Array.BYTES_PER_ELEMENT
        for (let j = 0; j < instanceCount; j++) {
          instanceIds[j] = j
          let offset =
            j * instanceMode * Float32Array.BYTES_PER_ELEMENT + beginOffset
          Cesium.Color.unpack(instanceArray, offset, colorScratch)
          let pickId =
            version === 2
              ? selectionId[j]
              : colorScratch.red +
                colorScratch.green * 256 +
                colorScratch.blue * LEFT_16
          if (pickInfo[pickId] === undefined) {
            pickInfo[pickId] = {
              vertexColorCount: 1,
              instanceIds: [],
              vertexColorOffset: j
            }
          }
          pickInfo[pickId].instanceIds.push(j)
        }
        createBatchIdAttribute(
          geoPackage[geometryName].vertexPackage,
          instanceIds,
          1
        )
      }
    }
  }

  return bytesOffset
}

function createBatchIdAttribute(vertexPackage, typedArray, instanceDivisor) {
  let vertexAttributes = vertexPackage.vertexAttributes
  let attrLocation = vertexPackage.attrLocation
  let len = vertexAttributes.length
  let attrName = instanceDivisor === 1 ? 'instanceId' : 'batchId'
  attrLocation[attrName] = len
  vertexAttributes.push({
    index: len,
    typedArray: typedArray,
    componentsPerAttribute: 1,
    componentDatatype: 5126,
    offsetInBytes: 0,
    strideInBytes: 0,
    instanceDivisor: instanceDivisor
  })
}

S3ModelParser.parseBuffer = function(buffer) {
  let bytesOffset = 0
  let result = {
    version: undefined,
    groupNode: undefined,
    geoPackage: {},
    matrials: undefined,
    texturePackage: {}
  }

  let view = new DataView(buffer)
  result.version = view.getFloat32(bytesOffset, true)
  bytesOffset += Float32Array.BYTES_PER_ELEMENT
  if (result.version >= 2.0) {
    let unzipSize = view.getUint32(bytesOffset, true)
    bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  }

  let byteSize = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT
  let unzipBuffer = unZip(buffer, bytesOffset)
  view = new DataView(unzipBuffer)
  bytesOffset = 0
  let nOptions = view.getUint32(bytesOffset, true)
  bytesOffset += Uint32Array.BYTES_PER_ELEMENT

  bytesOffset = parseGroupNode(unzipBuffer, view, bytesOffset, result)

  bytesOffset = parseSkeleton(unzipBuffer, view, bytesOffset, result.geoPackage)

  bytesOffset = parseTexturePackage(
    unzipBuffer,
    view,
    bytesOffset,
    result.texturePackage
  )

  bytesOffset = parseMaterial(unzipBuffer, view, bytesOffset, result)

  parsePickInfo(
    unzipBuffer,
    view,
    bytesOffset,
    nOptions,
    result.geoPackage,
    result.version
  )

  return result
}

export default S3ModelParser
