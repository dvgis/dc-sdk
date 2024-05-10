/**
 * @Author : Caven Chen
 */

import { echarts } from '../../namespace'

const { extendComponentView } = echarts

extendComponentView({
  type: 'GLMap',
  init: function (ecModel, api) {
    this.api = api
    let viewer = api.getZr().viewer
    viewer.clock.onTick.addEventListener(this.moveHandler, this)
  },
  moveHandler: function () {
    if (this.api.getZr().dom.style.visibility !== 'hidden') {
      this.api.dispatchAction({
        type: 'GLMapRoam',
      })
    }
  },

  render: function (t, e, i) {},

  dispose: function () {
    let viewer = this.api.getZr().viewer
    viewer.clock.onTick.removeEventListener(this.moveHandler, this)
  },
})
