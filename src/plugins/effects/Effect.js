/*
 * @Author: Caven
 * @Date: 2020-01-14 18:33:33
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-15 21:12:57
 */

import EffectEvent from '../../core/event/EffectEvent'

class Effect {
  constructor() {
    this._viewer = undefined
    this._effectEvent = new EffectEvent()
    this._delegate = undefined
  }
}
