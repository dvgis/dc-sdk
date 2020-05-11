/*
 * @Author: Caven
 * @Date: 2020-02-26 23:38:41
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:16:53
 */

const { Cesium } = DC.Namespace

const IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAgCAYAAABkS8DlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADSSURBVHja7NYxEoUgDEDBYM39z2qHtZViwMFxt1FJnF/98ZXWWkRE7LWWOOt5Lsm9q/vsbu9Zdtazs/J19O5bs1XPZrwze/6V31zxbOZs1n905Wt2p3f25GzE7ohv6q3nLQCA3xEAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAA8g4AAAD//wMA4WEFTJOT5UIAAAAASUVORK5CYII='

let LineEmissionMaterial = require('../shader/PolylineEmissionMaterial.glsl')
let LineFlowMaterial = require('../shader/PolylineFlowMaterial.glsl')
let LineTrailMaterial = require('../shader/PolylineTrailMaterial.glsl')
let czm_cellular = require('../shader/cellular.glsl')
let czm_snoise = require('../shader/snoise.glsl')
let AsphaltMaterial = require('../shader/AsphaltMaterial.glsl')
let BlobMaterial = require('../shader/BlobMaterial.glsl')
let BrickMaterial = require('../shader/BlobMaterial.glsl')
let CementMaterial = require('../shader/CementMaterial.glsl')
let ErosionMaterial = require('../shader/ErosionMaterial.glsl')
let FacetMaterial = require('../shader/FacetMaterial.glsl')
let FresnelMaterial = require('../shader/FresnelMaterial.glsl')
let GrassMaterial = require('../shader/GrassMaterial.glsl')
let ReflectionMaterial = require('../shader/ReflectionMaterial.glsl')
let RefractionMaterial = require('../shader/RefractionMaterial.glsl')
let TieDyeMaterial = require('../shader/TieDyeMaterial.glsl')
let WoodMaterial = require('../shader/WoodMaterial.glsl')
let CircleFadeShader = require('../shader/CircleFadeShader.glsl')
let CircleWaveShader = require('../shader/CircleWaveShader.glsl')

Cesium.ShaderSource._czmBuiltinsAndUniforms.czm_cellular = czm_cellular
Cesium.ShaderSource._czmBuiltinsAndUniforms.czm_snoise = czm_snoise

// PolylineEmission

Cesium.Material.PolylineEmissionType = 'PolylineEmission'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.PolylineEmissionType,
  {
    fabric: {
      type: Cesium.Material.PolylineEmissionType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7)
      },
      source: LineEmissionMaterial
    },
    translucent: function(material) {
      return true
    }
  }
)

// PolylineFlow
Cesium.Material.PolylineFlowType = 'PolylineFlow'
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineFlowType, {
  fabric: {
    type: Cesium.Material.PolylineFlowType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      duration: 45
    },
    source: LineFlowMaterial
  },
  translucent: function(material) {
    return true
  }
})

// PolylineTrail
Cesium.Material.PolylineTrailType = 'PolylineTrail'
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailType, {
  fabric: {
    type: Cesium.Material.PolylineTrailType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      image: IMG,
      duration: 45
    },
    source: LineTrailMaterial
  },
  translucent: function(material) {
    return true
  }
})

// Asphalt
Cesium.Material.AsphaltType = 'Asphalt'
Cesium.Material._materialCache.addMaterial(Cesium.Material.AsphaltType, {
  fabric: {
    type: Cesium.Material.AsphaltType,
    uniforms: {
      asphaltColor: new Cesium.Color(0.15, 0.15, 0.15, 1.0),
      bumpSize: 0.02,
      roughness: 0.2
    },
    source: AsphaltMaterial
  },
  translucent: function(material) {
    return material.uniforms.asphaltColor.alpha < 1.0
  }
})

// Blob
Cesium.Material.BlobType = 'Blob'
Cesium.Material._materialCache.addMaterial(Cesium.Material.BlobType, {
  fabric: {
    type: Cesium.Material.BlobType,
    uniforms: {
      lightColor: new Cesium.Color(1.0, 1.0, 1.0, 0.5),
      darkColor: new Cesium.Color(0.0, 0.0, 1.0, 0.5),
      frequency: 10.0
    },
    source: BlobMaterial
  },
  translucent: function(material) {
    var uniforms = material.uniforms
    return uniforms.lightColor.alpha < 1.0 || uniforms.darkColor.alpha < 0.0
  }
})

// Brick
Cesium.Material.BrickType = 'Brick'
Cesium.Material._materialCache.addMaterial(Cesium.Material.BrickType, {
  fabric: {
    type: Cesium.Material.BrickType,
    uniforms: {
      brickColor: new Cesium.Color(0.6, 0.3, 0.1, 1.0),
      mortarColor: new Cesium.Color(0.8, 0.8, 0.7, 1.0),
      brickSize: new Cesium.Cartesian2(0.3, 0.15),
      brickPct: new Cesium.Cartesian2(0.9, 0.85),
      brickRoughness: 0.2,
      mortarRoughness: 0.1
    },
    source: BrickMaterial
  },
  translucent: function(material) {
    var uniforms = material.uniforms
    return uniforms.brickColor.alpha < 1.0 || uniforms.mortarColor.alpha < 1.0
  }
})

// Cement
Cesium.Material.CementType = 'Cement'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CementType, {
  fabric: {
    type: Cesium.Material.CementType,
    uniforms: {
      cementColor: new Cesium.Color(0.95, 0.95, 0.85, 1.0),
      grainScale: 0.01,
      roughness: 0.3
    },
    source: CementMaterial
  },
  translucent: function(material) {
    return material.uniforms.cementColor.alpha < 1.0
  }
})

// Erosion
Cesium.Material.ErosionType = 'Erosion'
Cesium.Material._materialCache.addMaterial(Cesium.Material.ErosionType, {
  fabric: {
    type: Cesium.Material.ErosionType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      time: 1.0
    },
    source: ErosionMaterial
  },
  translucent: function(material) {
    return material.uniforms.color.alpha < 1.0
  }
})

// Facet
Cesium.Material.FacetType = 'Facet'
Cesium.Material._materialCache.addMaterial(Cesium.Material.FacetType, {
  fabric: {
    type: Cesium.Material.FacetType,
    uniforms: {
      lightColor: new Cesium.Color(0.25, 0.25, 0.25, 0.75),
      darkColor: new Cesium.Color(0.75, 0.75, 0.75, 0.75),
      frequency: 10.0
    },
    source: FacetMaterial
  },
  translucent: function(material) {
    var uniforms = material.uniforms
    return uniforms.lightColor.alpha < 1.0 || uniforms.darkColor.alpha < 0.0
  }
})

// Fresnel
Cesium.Material.FresnelType = 'Fresnel'
Cesium.Material._materialCache.addMaterial(Cesium.Material.FresnelType, {
  fabric: {
    type: Cesium.Material.FresnelType,
    materials: {
      reflection: {
        type: Cesium.Material.ReflectionType
      },
      refraction: {
        type: Cesium.Material.RefractionType
      }
    },
    source: FresnelMaterial
  },
  translucent: false
})

// Grass
Cesium.Material.GrassType = 'Grass'
Cesium.Material._materialCache.addMaterial(Cesium.Material.GrassType, {
  fabric: {
    type: Cesium.Material.GrassType,
    uniforms: {
      grassColor: new Cesium.Color(0.25, 0.4, 0.1, 1.0),
      dirtColor: new Cesium.Color(0.1, 0.1, 0.1, 1.0),
      patchiness: 1.5
    },
    source: GrassMaterial
  },
  translucent: function(material) {
    var uniforms = material.uniforms
    return uniforms.grassColor.alpha < 1.0 || uniforms.dirtColor.alpha < 1.0
  }
})

// Grass
Cesium.Material.ReflectionType = 'Reflection'
Cesium.Material._materialCache.addMaterial(Cesium.Material.ReflectionType, {
  fabric: {
    type: Cesium.Material.ReflectionType,
    uniforms: {
      cubeMap: Cesium.Material.DefaultCubeMapId,
      channels: 'rgb'
    },
    source: ReflectionMaterial
  },
  translucent: false
})

// Refraction
Cesium.Material.RefractionType = 'Refraction'
Cesium.Material._materialCache.addMaterial(Cesium.Material.RefractionType, {
  fabric: {
    type: Cesium.Material.RefractionType,
    uniforms: {
      cubeMap: Cesium.Material.DefaultCubeMapId,
      channels: 'rgb',
      indexOfRefractionRatio: 0.9
    },
    source: RefractionMaterial
  },
  translucent: false
})

// TieDye
Cesium.Material.TyeDyeType = 'TieDye'
Cesium.Material._materialCache.addMaterial(Cesium.Material.TyeDyeType, {
  fabric: {
    type: Cesium.Material.TyeDyeType,
    uniforms: {
      lightColor: new Cesium.Color(1.0, 1.0, 0.0, 0.75),
      darkColor: new Cesium.Color(1.0, 0.0, 0.0, 0.75),
      frequency: 5.0
    },
    source: TieDyeMaterial
  },
  translucent: function(material) {
    var uniforms = material.uniforms
    return uniforms.lightColor.alpha < 1.0 || uniforms.darkColor.alpha < 0.0
  }
})

// Wood
Cesium.Material.WoodType = 'Wood'
Cesium.Material._materialCache.addMaterial(Cesium.Material.WoodType, {
  fabric: {
    type: Cesium.Material.WoodType,
    uniforms: {
      lightWoodColor: new Cesium.Color(0.6, 0.3, 0.1, 1.0),
      darkWoodColor: new Cesium.Color(0.4, 0.2, 0.07, 1.0),
      ringFrequency: 3.0,
      noiseScale: new Cesium.Cartesian2(0.7, 0.5),
      grainFrequency: 27.0
    },
    source: WoodMaterial
  },
  translucent: function(material) {
    var uniforms = material.uniforms
    return (
      uniforms.lightWoodColor.alpha < 1.0 || uniforms.darkWoodColor.alpha < 1.0
    )
  }
})

// CircleFade
Cesium.Material.CircleFadeType = 'CircleFade'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleFadeType, {
  fabric: {
    type: Cesium.Material.CircleFadeType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      duration: 45
    },
    source: CircleFadeShader
  },
  translucent: function(material) {
    return true
  }
})

// CircleWave

Cesium.Material.CircleWaveType = 'CircleWave'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleWaveType, {
  fabric: {
    type: Cesium.Material.CircleWaveType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      duration: 45,
      count: 1,
      gradient: 0.1
    },
    source: CircleWaveShader
  },
  translucent: function(material) {
    return true
  }
})
