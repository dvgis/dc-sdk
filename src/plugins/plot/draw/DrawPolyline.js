/*
 * @Author: Caven
 * @Date: 2020-01-31 18:18:44
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-01 13:43:09
 */
import Cesium from '@/namespace'
import Draw from './Draw'

const DEF_STYLE = {
  width: 3,
  material: Cesium.Color.BLUE.withAlpha(0.6)
}

class DrawPolyline extends Draw {
  constructor(plotInfo, style) {
    super(plotInfo)
    this._tempLine = new Cesium.Entity()
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
      this._positions.push(position)
    }
  }

  _mouseMoveHandler(movement) {
    this._viewer.tooltip.setContent('单击选择点位,双击结束')
    let position = this._viewer.delegate.scene.camera.pickEllipsoid(movement.endPosition, Cesium.Ellipsoid.WGS84)
    this._viewer.tooltip.setPosition(position)
    if (position && this._positions.length > 0) {
      this._viewer.tooltip.setPosition(position)
      this._tempPoints = [this._positions[this._positions.length - 1], position]
    }
  }

  _mouseDbClickHandler(movement) {
    this._unbindEnvet()
    if (this._positions.length > 2) {
      this._positions = this._positions.slice(0, -1)
    }
    this._plotEvent.raiseEvent({ type: DC.OverlayType.POLYLINE, points: DC.T.transformCartesianArrayToWSG84Array(this._positions) })
  }

  _prepareDelegate() {
    this._delegate.polyline = {
      positions: new Cesium.CallbackProperty(time => {
        return this._positions
      }),
      ...this._style
    }
    this._tempLine.polyline = {
      positions: new Cesium.CallbackProperty(time => {
        return this._tempPoints
      }),
      ...this._style
    }
    this._layer.entities.add(this._delegate)
    this._layer.entities.add(this._tempLine)
  }
}

export default DrawPolyline
