/*
 * @Author: Caven
 * @Date: 2020-03-17 21:59:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:14:46
 */

import Edit from './Edit'

const { Transform, MouseEventType, Point } = DC

class EditPolyline extends Edit {
  constructor(plotInfo) {
    super(plotInfo)
    this._positions = this._overlay.positions
  }

  _mouseMoveHandler(e) {
    if (this._currentMarker) {
      this._currentMarker.position = Transform.transformCartesianToWGS84(
        e.position
      )
      this._overlay.positions = this._markers.map(item => item.position)
    }
  }

  _markerClickHandler(e) {
    this._currentMarker = !this._currentMarker ? e.overlay : undefined
  }

  _prepareMarkers() {
    this._positions.forEach(item => {
      let marker = new Point(item)
      marker.on(MouseEventType.CLICK, this._markerClickHandler, this)
      this._layer.addOverlay(marker)
      this._markers.push(marker)
    })
  }
}

export default EditPolyline
