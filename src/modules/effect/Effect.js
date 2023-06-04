/**
 * @Author : Caven Chen
 */

import BlackAndWhite from './type/BlackAndWhite'
import Bloom from './type/Bloom'
import Brightness from './type/Brightness'
import DepthOfField from './type/DepthOfField'
import LensFlare from './type/LensFlare'
import NightVision from './type/NightVision'
import Silhouette from './type/Silhouette'

class Effect {
  constructor(viewer) {
    if (!viewer) {
      throw Error('missing viewer param')
    }
    this._blackAndWhite = new BlackAndWhite(viewer)
    this._bloom = new Bloom(viewer)
    this._brightness = new Brightness(viewer)
    this._depthOfField = new DepthOfField(viewer)
    this._lensFlare = new LensFlare(viewer)
    this._night = new NightVision(viewer)
    this._silhouette = new Silhouette(viewer)
  }

  get blackAndWhite() {
    return this._blackAndWhite
  }

  get bloom() {
    return this._bloom
  }

  get brightness() {
    return this._brightness
  }

  get depthOfField() {
    return this._depthOfField
  }

  get lensFlare() {
    return this._lensFlare
  }

  get night() {
    return this._night
  }

  get silhouette() {
    return this._silhouette
  }
}

export default Effect
