/*
 * @Author: Caven
 * @Date: 2020-01-19 11:03:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:58:25
 */

const { Layer, State } = DC

const { Cesium } = DC.Namespace

class KmlLayer extends Layer {
  constructor(id, url, options = {}) {
    if (!url) {
      throw new Error('the url is empty')
    }
    super(id)
    this._delegate = Cesium.KmlDataSource.load(url, options)
    this.type = Layer.getOverlayType('kml')
    this._state = State.INITIALIZED
  }

  set show(show) {
    this._show = show
    this._delegate &&
      this._delegate.then(dataSource => {
        dataSource.show = this._show
      })
  }

  get show() {
    return this._show
  }

  eachOverlay(method, context) {
    if (this._delegate) {
      this._delegate.then(dataSource => {
        let entities = dataSource.entities.values
        entities.forEach(item => {
          method.call(context, item)
        })
      })
      return this
    }
  }
}

Layer.registerType('kml')

export default KmlLayer
