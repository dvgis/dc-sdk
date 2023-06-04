/**
 * @Author : Caven Chen
 */

import { echarts } from '../../namespace'

const { extendComponentModel } = echarts

extendComponentModel({
  type: 'GLMap',
  getViewer() {
    return Object(this.getZr()).viewer
  },
  defaultOption: {
    roam: false,
  },
})
