/**
 * @Author: Caven
 * @Date: 2020-11-30 20:54:58
 */

import Fog from './type/Fog'
import Rain from './type/Rain'
import Snow from './type/Snow'
import Cloud from './type/Cloud'

class Weather {
  constructor() {
    this._comps = {
      fog: new Fog(),
      rain: new Rain(),
      snow: new Snow(),
      cloud: new Cloud()
    }
  }

  get fog() {
    return this._comps.fog
  }

  get rain() {
    return this._comps.rain
  }

  get snow() {
    return this._comps.snow
  }

  get cloud() {
    return this._comps.cloud
  }

  /**
   *
   * @param viewer
   */
  install(viewer) {
    Object.keys(this._comps).forEach(key => {
      this._comps[key].addTo(viewer)
    })
    Object.defineProperty(viewer, 'weather', {
      value: this,
      writable: false
    })
  }
}

export default Weather
