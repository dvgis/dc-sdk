/**
 * @Author: Caven
 * @Date: 2020-08-30 16:43:12
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '@dc-modules/event'
import { Transform } from '@dc-modules/transform'
import { TailedAttackArrow } from '@dc-modules/overlay'
import Draw from './Draw'
import TailedAttackArrowGraphics from '../graphics/TailedAttackArrowGraphics'

const DEF_STYLE = {
  material: Cesium.Color.YELLOW.withAlpha(0.6),
  fill: true
}

class DrawTailedAttackArrow extends Draw {
  constructor(style) {
    super()
    this._maxAnchorSize = 3
    this._style = {
      ...DEF_STYLE,
      ...style
    }
    this._graphics = new TailedAttackArrowGraphics()
  }

  /**
   *
   * @private
   */
  _mountEntity() {
    this.drawTool.tooltipMess = '左击选择点位'
    this._delegate = new Cesium.Entity({
      polygon: {
        ...this._style,
        hierarchy: new Cesium.CallbackProperty(() => {
          if (this._positions.length > 2) {
            this._graphics.positions = this._positions
            return this._graphics.hierarchy
          } else {
            return null
          }
        }, false)
      }
    })
    this._layer.entities.add(this._delegate)
  }

  /**
   *
   * @private
   */
  _stopdHook() {
    let tailedAttackArrow = new TailedAttackArrow(
      Transform.transformCartesianArrayToWGS84Array(this._positions)
    ).setStyle(this._style)
    this._options.onDrawStop && this._options.onDrawStop(tailedAttackArrow)
  }

  /**
   *
   * @param position
   * @returns {boolean}
   * @private
   */
  _onDrawAnchor(position) {
    let len = this._positions.length
    this._positions.push(position)
    this.drawTool.fire(PlotEventType.CREATE_ANCHOR, { position })
    this._graphics.positions = this._positions
    if (len >= this._maxAnchorSize) {
      this._positions.pop()
      this.drawTool.fire(PlotEventType.DRAW_STOP)
    }
  }
}

export default DrawTailedAttackArrow
