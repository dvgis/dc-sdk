/**
 * @Author : Caven Chen
 */

import { echarts } from '../../namespace'

import './GLMapModel'
import './GLMapView'
import GLMapCoordSys from './GLMapCoordSys'
import ChartLayer from './ChartLayer.js'

const { registerAction, registerCoordinateSystem } = echarts

registerCoordinateSystem('GLMap', GLMapCoordSys)
registerAction(
  {
    type: 'GLMapRoam',
    event: 'GLMapRoam',
    update: 'updateLayout',
  },
  function (payload, ecModel) {}
)

export { ChartLayer }
