import S3MCacheFileRenderEntity from './S3MCacheFileRenderEntity.js'
import S3MObliqueRenderEntity from './S3MObliqueRenderEntity.js'
let S3MContentFactory = {
  OSGBFile: function(options) {
    return new S3MObliqueRenderEntity(options)
  },
  OSGBCacheFile: function(options) {
    return new S3MCacheFileRenderEntity(options)
  }
}

export default S3MContentFactory
