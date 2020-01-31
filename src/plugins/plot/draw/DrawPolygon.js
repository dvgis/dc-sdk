/*
 * @Author: Caven
 * @Date: 2020-01-31 18:59:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 20:40:40
 */
import Cesium from '@/namespace'
import Draw from './Draw'

const DEF_STYLE = {
  material: Cesium.Color.BLUE.withAlpha(0.6)
}

class DrawPolygon extends Draw {
  constructor(plotInfo, style) {
    super(plotInfo)
    this._hierarchy = new Cesium.PolygonHierarchy()
    this._positions = []
    this._tempPoints = []
    this._style = {
      ...DEF_STYLE,
      ...style
    }
  }

  _mouseClickHandler(movement) {
    let position = this._viewer.delegate.scene.camera.pickEllipsoid(movement.position, Cesium.Ellipsoid.WGS84)
    if (position) {
      if (this._positions.length === 2) {
        this._delegate.polyline.show = false
      }
      this._positions.push(position)
      this._hierarchy.positions = this._positions
    }
  }

  _mouseMoveHandler(movement) {
    let position = this._viewer.delegate.scene.camera.pickEllipsoid(movement.endPosition, Cesium.Ellipsoid.WGS84)
    if (position && this._positions.length > 0) {
      this._tempPoints = [this._positions[this._positions.length - 1], position]
      this._hierarchy.positions = [...this._positions, position]
    }
  }

  _mouseDbClickHandler(movement) {
    this._unbindEnvet()
    if (this._positions.length > 2) {
      this._positions = this._positions.slice(0, -1)
    }
    this._plotEvent.raiseEvent({ type: DC.OverlayType.POLYGON, points: DC.T.transformCartesianArrayToWSG84Array(this._positions) })
  }

  _prepareDelegate() {
    this._delegate.polygon = {
      hierarchy: new Cesium.CallbackProperty(time => {
        return this._hierarchy
      }),
      ...this._style
    }
    this._delegate.polyline = {
      positions: new Cesium.CallbackProperty(time => {
        return this._tempPoints
      }),
      ...this._style
    }
    this._layer.entities.add(this._delegate)
  }
}

export default DrawPolygon
