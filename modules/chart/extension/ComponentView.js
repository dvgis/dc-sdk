/**
 * @Author: Caven
 * @Date: 2020-02-02 16:34:40
 */

export default echarts.extendComponentView({
  type: 'GLMap',
  init: function(ecModel, api) {
    this.api = api
    echarts.viewer.scene.postRender.addEventListener(this.moveHandler, this)
  },
  moveHandler: function(t, e) {
    this.api.dispatchAction({
      type: 'GLMapRoam'
    })
  },
  render: function(t, e, i) {},
  dispose: function(t) {
    echarts.viewer.scene.postRender.removeEventListener(this.moveHandler, this)
  }
})
