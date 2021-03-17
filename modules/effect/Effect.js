/**
 * @Author: Caven
 * @Date: 2020-08-14 23:49:14
 */

import BlackAndWhite from './type/BlackAndWhite'
import Bloom from './type/Bloom'
import Brightness from './type/Brightness'
import DepthOfField from './type/DepthOfField'
import LensFlare from './type/LensFlare'
import NightVision from './type/NightVision'
import Silhouette from './type/Silhouette'

class Effect {
  constructor() {
    this._comps = {
      blackAndWhite: new BlackAndWhite(),
      bloom: new Bloom(),
      brightness: new Brightness(),
      depthOfField: new DepthOfField(),
      lensFlare: new LensFlare(),
      night: new NightVision(),
      silhouette: new Silhouette()
    }
  }

  get blackAndWhite() {
    return this._comps.blackAndWhite
  }

  get bloom() {
    return this._comps.bloom
  }

  get brightness() {
    return this._comps.brightness
  }

  get depthOfField() {
    return this._comps.depthOfField
  }

  get lensFlare() {
    return this._comps.lensFlare
  }

  get night() {
    return this._comps.night
  }

  get silhouette() {
    return this._comps.silhouette
  }

  /**
   *
   * @param viewer
   */
  install(viewer) {
    Object.keys(this._comps).forEach(key => {
      this._comps[key].addTo(viewer)
    })
    Object.defineProperty(viewer, 'effect', {
      value: this,
      writable: false
    })
  }
}

export default Effect
