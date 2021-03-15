/**
 * @Author: Caven
 * @Date: 2021-02-27 22:49:41
 */

const { Cesium } = DC.Namespace

const CircleBlurMaterial = require('../shader/circle/CircleBlurMaterial.glsl')
const CircleDiffuseMaterial = require('../shader/circle/CircleDiffuseMaterial.glsl')
const CircleFadeMaterial = require('../shader/circle/CircleFadeMaterial.glsl')
const CirclePulseMaterial = require('../shader/circle/CirclePulseMaterial.glsl')
const CircleScanMaterial = require('../shader/circle/CircleScanMaterial.glsl')
const CircleSpiralMaterial = require('../shader/circle/CircleSpiralMaterial.glsl')
const CircleVaryMaterial = require('../shader/circle/CircleVaryMaterial.glsl')
const CircleWaveMaterial = require('../shader/circle/CircleWaveMaterial.glsl')

/**
 * CircleBlur
 * @type {string}
 */
Cesium.Material.CircleBlurType = 'CircleBlur'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleBlurType, {
  fabric: {
    type: Cesium.Material.CircleBlurType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: CircleBlurMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CircleDiffuse
 * @type {string}
 */
Cesium.Material.CircleDiffuseType = 'CircleDiffuse'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleDiffuseType, {
  fabric: {
    type: Cesium.Material.CircleDiffuseType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: CircleDiffuseMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CircleFade
 * @type {string}
 */
Cesium.Material.CircleFadeType = 'CircleFade'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleFadeType, {
  fabric: {
    type: Cesium.Material.CircleFadeType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: CircleFadeMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CirclePulse
 * @type {string}
 */
Cesium.Material.CirclePulseType = 'CirclePulse'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CirclePulseType, {
  fabric: {
    type: Cesium.Material.CirclePulseType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 12.0
    },
    source: CirclePulseMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CircleScan
 * @type {string}
 */
Cesium.Material.CircleScanType = 'CircleScan'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleScanType, {
  fabric: {
    type: Cesium.Material.CircleScanType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 1
    },
    source: CircleScanMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CircleSpiral
 * @type {string}
 */
Cesium.Material.CircleSpiralType = 'CircleSpiral'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleSpiralType, {
  fabric: {
    type: Cesium.Material.CircleSpiralType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: CircleSpiralMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CircleVary
 * @type {string}
 */
Cesium.Material.CircleVaryType = 'CircleVary'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleVaryType, {
  fabric: {
    type: Cesium.Material.CircleVaryType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: CircleVaryMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CircleWave
 * @type {string}
 */
Cesium.Material.CircleWaveType = 'CircleWave'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleWaveType, {
  fabric: {
    type: Cesium.Material.CircleWaveType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0,
      count: 1,
      gradient: 0.1
    },
    source: CircleWaveMaterial
  },
  translucent: function(material) {
    return true
  }
})
