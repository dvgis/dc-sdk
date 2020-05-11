/*
 * @Author: Caven
 * @Date: 2020-02-20 13:26:49
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 21:30:31
 */
import Effect from '../Effect'

const { State } = DC

class BloomEffect extends Effect {
  constructor(id) {
    super(id)
    this._contrast = 128
    this._brightness = -0.3
    this._glowOnly = false
    this._delta = 1
    this._sigma = 2
    this._stepSize = 1
    this.type = Effect.getEffectType('bloom')
    this._state = State.INITIALIZED
  }

  set contrast(contrast) {
    this._contrast = contrast
    if (this._delegate) {
      this._delegate.uniforms.contrast = this._contrast
    }
  }

  set brightness(brightness) {
    this._brightness = brightness
    if (this._delegate) {
      this._delegate.uniforms.brightness = this._brightness
    }
  }

  set glowOnly(glowOnly) {
    this._glowOnly = glowOnly
    if (this._delegate) {
      this._delegate.uniforms.glowOnly = this._glowOnly
    }
  }

  set delta(delta) {
    this._delta = delta
    if (this._delegate) {
      this._delegate.uniforms.delta = this._delta
    }
  }

  set sigma(sigma) {
    this._sigma = sigma
    if (this._delegate) {
      this._delegate.uniforms.sigma = this._sigma
    }
  }

  set stepSize(stepSize) {
    this._stepSize = stepSize
    if (this._delegate) {
      this._delegate.uniforms.stepSize = this._stepSize
    }
  }

  /**
   * 准备代理
   */
  _mountedHook() {
    this._delegate = this._viewer.delegate.scene.postProcessStages.bloom
    this._delegate.enabled = true
    this.contrast = this._contrast
    this.brightness = this._brightness
    this.glowOnly = this._glowOnly
    this.delta = this._delta
    this.sigma = this._sigma
    this.stepSize = this._stepSize
  }

  /**
   * 效果添加的回调函数
   */
  _removedHook() {
    if (this._delegate) {
      this._delegate.enabled = false
      this.delegate = undefined
    }
  }
}

Effect.registerType('bloom')

export default BloomEffect
