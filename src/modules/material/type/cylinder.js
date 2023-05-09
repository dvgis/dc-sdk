/**
 * @Author: Caven
 * @Date: 2022-05-28 21:36:23
 */

import { Cesium } from '@dc-modules/namespace'

const CylinderFadeMaterial = require('../shader/cylinder/CylinderFadeMaterial.glsl')
const CylinderParticlesMaterial = require('../shader/cylinder/CylinderParticlesMaterial.glsl')

/**
 * CylinderFade
 * @type {string}
 */
Cesium.Material.CylinderFadeType = 'CylinderFade'
Cesium.Material._materialCache.addMaterial(Cesium.Material.CylinderFadeType, {
  fabric: {
    type: Cesium.Material.CylinderFadeType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7)
    },
    source: CylinderFadeMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * CylinderParticles
 * @type {string}
 */
Cesium.Material.CylinderParticlesType = 'CylinderParticles'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.CylinderParticlesType,
  {
    fabric: {
      type: Cesium.Material.CylinderParticlesType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
        image: Cesium.Material.DefaultImageId
      },
      source: CylinderParticlesMaterial
    },
    translucent: function(material) {
      return true
    }
  }
)
