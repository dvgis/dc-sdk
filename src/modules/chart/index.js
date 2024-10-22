/**
 * @Author : Caven Chen
 */

import ChartLayer from './ChartLayer.js'

import { createGLMapCoordSys } from './GLMapCoordSys.js'

export function registerEcharts(echarts) {
  const {
    registerAction,
    registerCoordinateSystem,
    extendComponentModel,
    extendComponentView,
  } = echarts

  extendComponentModel({
    type: 'GLMap',
    getViewer() {
      return Object(this.getZr()).viewer
    },
    defaultOption: {
      roam: false,
    },
  })

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

  registerCoordinateSystem('GLMap', createGLMapCoordSys(echarts))

  registerAction(
    {
      type: 'GLMapRoam',
      event: 'GLMapRoam',
      update: 'updateLayout',
    },
    function (payload, ecModel) {}
  )
}

export { ChartLayer }
