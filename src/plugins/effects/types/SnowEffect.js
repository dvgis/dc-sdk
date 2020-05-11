/*
 * @Author: Caven
 * @Date: 2020-01-15 20:23:46
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:26:16
 */

import Effect from '../Effect'

const { State } = DC

const { Cesium } = DC.Namespace

const SnowShader = require('../../shader/SnowShader.glsl')

class SnowEffect extends Effect {
  constructor(id) {
    super(id)
    this._addable = true
    this.type = Effect.getEffectType('snow')
    this._state = State.INITIALIZED
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
