/*
 * @Author: Caven
 * @Date: 2020-01-15 20:23:46
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-29 18:17:25
 */
import Cesium from '@/namespace'
import Effect from './Effect'

let SnowShader = require('../shader/SnowShader.glsl')

DC.SnowEffect = class extends Effect {
  constructor(id) {
    super(id)
    this._state = DC.EffectState.INITIALIZED
    this.type = DC.EffectType.SNOW
  }

  /**
   * 准备代理
   */
  _prepareDelegate() {
    this._delegate = new Cesium.PostProcessStage({
      name: this._id,
      fragmentShader: SnowShader
    })
  }
}

DC.EffectType.SNOW = 'snow'
