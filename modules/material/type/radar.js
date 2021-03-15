/**
 * @Author: Caven
 * @Date: 2021-02-27 23:22:38
 */

const { Cesium } = DC.Namespace

const RadarLineMaterial = require('../shader/radar/RadarLineMaterial.glsl')
const RadarSweepMaterial = require('../shader/radar/RadarSweepMaterial.glsl')
const RadarWaveMaterial = require('../shader/radar/RadarWaveMaterial.glsl')

/**
 * RadarLine
 * @type {string}
 */
Cesium.Material.RadarLineType = 'RadarLine'
Cesium.Material._materialCache.addMaterial(Cesium.Material.RadarLineType, {
  fabric: {
    type: Cesium.Material.RadarLineType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: RadarLineMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * RadarSweep
 * @type {string}
 */
Cesium.Material.RadarSweepType = 'RadarSweep'
Cesium.Material._materialCache.addMaterial(Cesium.Material.RadarSweepType, {
  fabric: {
    type: Cesium.Material.RadarSweepType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: RadarSweepMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * RadarWave
 * @type {string}
 */
Cesium.Material.RadarWaveType = 'RadarWave'
Cesium.Material._materialCache.addMaterial(Cesium.Material.RadarWaveType, {
  fabric: {
    type: Cesium.Material.RadarWaveType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 3.0
    },
    source: RadarWaveMaterial
  },
  translucent: function(material) {
    return true
  }
})
