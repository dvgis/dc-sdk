/*
 * @Author: Caven
 * @Date: 2020-03-17 17:52:29
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-03 13:47:36
 */
import Edit from './Edit'

class EditPoint extends Edit {
  constructor(plotInfo) {
    super(plotInfo)
    this._position = this._overlay.position
  }

  _mouseClickHandler(movement) {
    this._position = this._viewer.scene.camera.pickEllipsoid(
      movement.position,
      Cesium.Ellipsoid.WGS84
    )
    this._unbindEnvet()
    this._plotEvent.raiseEvent({
      type: DC.OverlayType.POINT,
      points: [DC.T.transformCartesianToWSG84(this._position)]
    })
  }

  _mouseMoveHandler(movement) {
    this._viewer.tooltip.setContent('左击选择点位,右击结束编辑')
    this._position = this._viewer.scene.camera.pickEllipsoid(
      movement.endPosition,
      Cesium.Ellipsoid.WGS84
    )
    this._viewer.tooltip.setPosition(this._position)
  }
}

export default EditPoint
