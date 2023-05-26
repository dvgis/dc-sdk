/**
 @author : Caven Chen
 @date : 2023-05-23
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
