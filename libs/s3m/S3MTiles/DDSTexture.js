const NOCOMPRESSED_RGB565 = 0x111
const NOCOMPRESSED_RGBA = 0x1111
const NOCOMPRESSED_LA = 6410

const  { Cesium }  = DC.Namespace

function DDSTexture(context, id, options) {
  let gl = context._gl
  this.contextId = context.id
  this.textureId = id
  this.layerId = options.layerId
  this.rootName = options.rootName
  this.context = context
  this.width = options.width
  this.height = options.height
  this.compressType = options.compressType
  this.internalFormat = options.internalFormat
  this.pixelFormat = options.pixelFormat
  this.arrayBufferView = options.arrayBufferView
  this.wrapS = Cesium.defaultValue(
    options.wrapS,
    Cesium.TextureWrap.CLAMP_TO_EDGE
  )
  this.wrapT = Cesium.defaultValue(
    options.wrapT,
    Cesium.TextureWrap.CLAMP_TO_EDGE
  )
  this._target = gl.TEXTURE_2D
  this._texture = undefined
  this.refCount = 1
  if (this.arrayBufferView) {
    this.init()
  }
}

DDSTexture.prototype.init = function() {
  let gl = this.context._gl
  if (!this._texture) {
    this._texture = gl.createTexture()
  }

  gl.bindTexture(gl.TEXTURE_2D, this._texture)
  let internalFormat = this.internalFormat
  if (
    internalFormat === NOCOMPRESSED_LA ||
    internalFormat === NOCOMPRESSED_RGBA
  ) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  }

  let i = 0
  let offset = 0
  let texWidth = this.width
  let texHeight = this.height
  let bMipMap = validateMipmap(
    this.arrayBufferView,
    internalFormat,
    texWidth,
    texHeight
  )
  do {
    let levelSize = Cesium.PixelFormat.compressedTextureSizeInBytes(
      internalFormat,
      texWidth,
      texHeight
    )
    let subArrayBuffer = new Uint8Array(
      this.arrayBufferView.buffer,
      this.arrayBufferView.byteOffset + offset,
      levelSize
    )
    if (internalFormat === NOCOMPRESSED_RGBA) {
      gl.texImage2D(
        gl.TEXTURE_2D,
        i++,
        gl.RGBA,
        texWidth,
        texHeight,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        subArrayBuffer
      )
    } else {
      gl.compressedTexImage2D(
        gl.TEXTURE_2D,
        i++,
        internalFormat,
        texWidth,
        texHeight,
        0,
        subArrayBuffer
      )
    }
    texWidth = Math.max(texWidth >> 1, 1)
    texHeight = Math.max(texHeight >> 1, 1)
    offset += levelSize
  } while (offset < this.arrayBufferView.byteLength && bMipMap)

  if (i > 1) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    )
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  }

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT)
  gl.texParameteri(
    this._target,
    this.context._textureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
    1
  )

  gl.bindTexture(gl.TEXTURE_2D, null)
  this.arrayBufferView = undefined
  this.ready = true
}

function validateMipmap(buffer, pixelFormat, width, height) {
  let len = buffer.length
  let w = width,
    h = height
  let totalBytes = 0
  while (1) {
    let sizeInBytes = Cesium.PixelFormat.compressedTextureSizeInBytes(
      pixelFormat,
      w,
      h
    )
    totalBytes += sizeInBytes
    w = w >> 1
    h = h >> 1
    if (w === 0 && h === 0) {
      break
    }

    w = Math.max(w, 1)
    h = Math.max(h, 1)
  }

  return totalBytes === len
}

DDSTexture.prototype.isDestroyed = function() {
  return false
}

DDSTexture.prototype.destroy = function() {
  let gl = this.context._gl
  gl.deleteTexture(this._texture)
  this._texture = null
  this.id = 0
  Cesium.destroyObject(this)
}

export default DDSTexture
