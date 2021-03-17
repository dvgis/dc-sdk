/**
 * @Author: Caven
 * @Date: 2020-02-02 16:35:41
 */

export default echarts.extendComponentModel({
  type: 'GLMap',
  getViewer: function() {
    return echarts.viewer
  },
  defaultOption: {
    roam: false
  }
})
