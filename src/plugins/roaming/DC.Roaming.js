/*
 * @Author: Caven
 * @Date: 2020-01-19 11:21:48
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-03 09:51:23
 */
import Cesium from '@/namespace'

const DEF_PAHT_STYLE = {
  resolution: 1,
  material: new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.1,
    color: Cesium.Color.YELLOW
  }),
  width: 10
}

DC.Roaming = class {}
