/**
 * @Author: Caven
 * @Date: 2020-08-29 20:54:37
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '@dc-modules/event'
import { Transform } from '@dc-modules/transform'
import { Polyline } from '@dc-modules/overlay'
import Draw from './Draw'

const DEF_STYLE = {
  width: 3,
  material: Cesium.Color.YELLOW.withAlpha(0.6)
}

class DrawPolyline extends Draw {
  constructor(style) {
    super()
    this._style = {
      ...DEF_STYLE,
      ...style
    }
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    this.drawTool.tooltipMess = '左击选择点位,右击结束'
    this._delegate = new Cesium.Entity({
      polyline: {
        ...this._style,
        positions: new Cesium.CallbackProperty(() => {
          return this._positions
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
    let polyline = new Polyline(
      Transform.transformCartesianArrayToWGS84Array(this._positions)
    ).setStyle(this._style)
    this._options.onDrawStop && this._options.onDrawStop(polyline)
  }

  /**
   *
   * @param position
   * @returns {boolean}
   * @private
   */
  _onDrawAnchor(position) {
    this._positions.push(position)
    this.drawTool.fire(PlotEventType.CREATE_ANCHOR, { position })
  }
}

export default DrawPolyline
