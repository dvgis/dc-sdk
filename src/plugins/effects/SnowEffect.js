/*
 * @Author: Caven
 * @Date: 2020-01-15 20:23:46
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 11:32:47
 */

import Effect from './Effect'
import EffectState from './EffectState'

const { Cesium } = DC.Namespace

const SnowShader = require('../shader/SnowShader.glsl')

class SnowEffect extends Effect {
  constructor(id) {
    super(id)
    this._addable = true
    this.type = Effect.getEffectType('snow')
    this._state = EffectState.INITIALIZED
  }

  _mountedHook() {
    this._delegate = new Cesium.PostProcessStage({
      name: this._id,
      fragmentShader: SnowShader
    })
  }
}
Effect.registerType('snow')

export default SnowEffect
