/**
 * @Author : Caven Chen
 */

import Fog from './type/Fog'
import Rain from './type/Rain'
import Snow from './type/Snow'
import Cloud from './type/Cloud'

class Weather {
  constructor(viewer) {
    if (!viewer) {
      throw Error('missing viewer param')
    }
    this._fog = new Fog(viewer)
    this._rain = new Rain(viewer)
    this._snow = new Snow(viewer)
    this._cloud = new Cloud(viewer)
  }

  get fog() {
    return this._fog
  }

  get rain() {
    return this._rain
  }

  get snow() {
    return this._snow
  }

  get cloud() {
    return this._cloud
  }
}

export default Weather
