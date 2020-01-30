/*
 * @Author: Caven
 * @Date: 2020-01-19 11:21:48
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 14:59:26
 */
import Cesium from '@/namespace'

DC.Roaming = class {
  constructor(options) {
    this._viewer = undefined
    this._positions = []
    this._time = Cesium.defaultValue(option.time, 360)
  }

  setPostions(postions) {}

  addToViewer(viewer) {
    this._viewer = viewer
  }
}
