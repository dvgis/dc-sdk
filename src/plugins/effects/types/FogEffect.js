/*
 * @Author: Caven
 * @Date: 2020-02-26 23:05:44
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:26:00
 */

import Effect from '../Effect'

const { State } = DC

const { Cesium } = DC.Namespace

const FogShader = require('../../shader/FogShader.glsl')

class FogEffect extends Effect {
  constructor(id, color, trength = 1) {
    super(id)
    this._trength = trength || 1
    this._color = color || new Cesium.Color(0.8, 0.8, 0.8, 0.5)
    this._addable = true
    this.type = Effect.getEffectType('fog')
    this._state = State.INITIALIZED
  }

  _mountedHook() {
    let _this = this
    this._delegate = new Cesium.PostProcessStage({
      name: this._id,
      fragmentShader: FogShader,
      uniforms: {
        trength: () => {
          return _this._trength
        },
        fogcolor: () => {
          return _this._color
        }
      }
    })
  }
}

Effect.registerType('fog')

export default FogEffect
