/**
 * @Author: Caven
 * @Date: 2020-08-30 17:22:21
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { GatheringPlace } from '@dc-modules/overlay'
import Draw from './Draw'
import GatheringPlaceGraphics from '../graphics/GatheringPlaceGraphics'

const DEF_STYLE = {
  material: Cesium.Color.YELLOW.withAlpha(0.6),
  fill: true
}

class DrawGatheringPlace extends Draw {
  constructor(style) {
    super()
    this._positions = []
    this._floatingAnchor = undefined
    this._style = {
      ...DEF_STYLE,
      ...style
    }
    this._graphics = new GatheringPlaceGraphics()
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity({
      polygon: {
        ...this._style,
        hierarchy: new Cesium.CallbackProperty(() => {
          if (this._positions.length > 1) {
            this._graphics.positions = this._positions
            return this._graphics.hierarchy
          } else {
            return null
          }
        }, false)
      }
    })
    this._layer.add(this._delegate)
  }

  _onClick(e) {
    let position = this._clampToGround ? e.surfacePosition : e.position
    let len = this._positions.length
    if (len === 0) {
      this._positions.push(position)
      this.createAnchor(position)
      this._floatingAnchor = this.createAnchor(position)
    }
    this._positions.push(position)
    this._graphics.positions = this._positions
    this.createAnchor(position)
    if (len > 2) {
      this._positions.pop()
      this.unbindEvent()
      let gatheringPlace = new GatheringPlace(
        Transform.transformCartesianArrayToWGS84Array(this._positions)
      )
      gatheringPlace.setStyle(this._style)
      this._plotEvent.raiseEvent(gatheringPlace)
    }
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '单击选择点位')
    if (this._floatingAnchor) {
      let position = this._clampToGround ? e.surfacePosition : e.position
      this._floatingAnchor.position.setValue(position)
      this._positions.pop()
      this._positions.push(position)
    }
  }
}

export default DrawGatheringPlace
