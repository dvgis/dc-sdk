/*
 * @Author: Caven
 * @Date: 2020-01-15 20:23:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 11:25:59
 */

import Effect from './Effect'
import EffectState from './EffectState'

const { Cesium } = DC.Namespace

const RainShader = require('../shader/RainShader.glsl')

class RainEffect extends Effect {
  constructor(id) {
    super(id)
    this._addable = true
    this.type = Effect.getEffectType('rain')
    this._state = EffectState.INITIALIZED
  }

  _mountedHook() {
    this._delegate = new Cesium.PostProcessStage({
      name: this._id,
      fragmentShader: RainShader
    })
  }
}

Effect.registerType('rain')

export default RainEffect
