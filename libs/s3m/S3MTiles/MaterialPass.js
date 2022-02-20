const  { Cesium }  = DC.Namespace

function MaterialPass() {
  this.ambientColor = new Cesium.Color()
  this.diffuseColor = new Cesium.Color()
  this.specularColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0)
  this.shininess = 50.0
  this.bTransparentSorting = false
  this.texMatrix = Cesium.Matrix4.clone(
    Cesium.Matrix4.IDENTITY,
    new Cesium.Matrix4()
  )
  this.textures = []
}

MaterialPass.prototype.isDestroyed = function() {
  return false
}

MaterialPass.prototype.destroy = function() {
  let length = this.textures.length
  for (let i = 0; i < length; i++) {
    let texture = this.textures[i]
    texture.destroy()
  }

  this.textures.length = 0
  this.ambientColor = undefined
  this.diffuseColor = undefined
  this.specularColor = undefined
  return Cesium.destroyObject(this)
}

export default MaterialPass
