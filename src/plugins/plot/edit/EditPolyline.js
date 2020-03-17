/*
 * @Author: Caven
 * @Date: 2020-03-17 21:59:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-17 23:47:46
 */
import Edit from './Edit'

class EditPolyline extends Edit {
  constructor(plotInfo) {
    super(plotInfo)
    this._positions = this._overlay.positions
  }

  _mouseClickHandler(movement) {}

  _mouseMoveHandler(movement) {}

  _prepareMarkers() {
    this._positions.forEach(item => {
      let marker = new DC.Point(item)
      this._layer.addOverlay(marker)
    })
  }
}

export default EditPolyline
