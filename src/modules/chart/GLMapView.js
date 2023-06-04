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
    viewer.scene.postRender.addEventListener(this.moveHandler, this)
  },
  moveHandler: function () {
    this.api.dispatchAction({
      type: 'GLMapRoam',
    })
  },
  render: function (t, e, i) {},
  dispose: function () {
    let viewer = this.api.getZr().viewer
    viewer.scene.postRender.removeEventListener(this.moveHandler, this)
  },
})
