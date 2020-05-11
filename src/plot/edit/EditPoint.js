/*
 * @Author: Caven
 * @Date: 2020-03-17 17:52:29
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:13:57
 */

import Edit from './Edit'

const { OverlayType, Transform } = DC

class EditPoint extends Edit {
  constructor(plotInfo) {
    super(plotInfo)
    this._position = this._overlay.position
  }

  _mouseClickHandler(e) {
    this._position = e.target ? e.position : e.surfacePosition
    this._unbindEnvet()
    this._plotEvent.raiseEvent({
      type: OverlayType.POINT,
      points: [Transform.transformCartesianToWGS84(this._position)]
    })
  }

  _mouseMoveHandler(e) {
    this._position = e.target ? e.position : e.surfacePosition
    this._viewer.tooltip.showAt(e.windowPosition, '左击选择点位')
  }
}

export default EditPoint
