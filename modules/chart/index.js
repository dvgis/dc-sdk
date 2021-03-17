/**
 * @Author: Caven
 * @Date: 2020-02-02 16:20:10
 */

import './extension/ComponentModel'
import './extension/ComponentView'
import CoordinateSystem from './extension/CoordinateSystem'
import ChartLayer from './ChartLayer'

echarts.registerCoordinateSystem('GLMap', CoordinateSystem)
echarts.registerAction(
  {
    type: 'GLMapRoam',
    event: 'GLMapRoam',
    update: 'updateLayout'
  },
  function(payload, ecModel) {}
)

export { ChartLayer }
