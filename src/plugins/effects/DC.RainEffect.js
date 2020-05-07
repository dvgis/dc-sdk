/*
 * @Author: Caven
 * @Date: 2020-01-15 20:23:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-06 14:56:47
 */
import Cesium from '@/namespace'
import Effect from './Effect'

let RainShader = require('../shader/RainShader.glsl')

DC.RainEffect = class extends Effect {
  constructor(id) {
    super(id)
    this._state = DC.EffectState.INITIALIZED
    this._addable = true
    this.type = DC.EffectType.RAIN
  }

  _mountedHook() {
    this._delegate = new Cesium.PostProcessStage({
      name: this._id,
      fragmentShader: RainShader
    })
  }
}

DC.EffectType.RAIN = 'rain'
