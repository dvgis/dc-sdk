/**
 * @Author: Caven
 * @Date: 2020-08-29 20:55:14
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '@dc-modules/event'
import { Transform } from '@dc-modules/transform'
import { Polygon } from '@dc-modules/overlay'
import Draw from './Draw'

const DEF_STYLE = {
  material: Cesium.Color.YELLOW.withAlpha(0.6),
  fill: true
}

class DrawPolygon extends Draw {
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
      polygon: {
        ...this._style,
        hierarchy: new Cesium.CallbackProperty(() => {
          if (this._positions.length > 2) {
            return new Cesium.PolygonHierarchy(this._positions)
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
    let polygon = new Polygon(
      Transform.transformCartesianArrayToWGS84Array(this._positions)
    ).setStyle(this._style)
    this._options.onDrawStop && this._options.onDrawStop(polygon)
  }

  /**
   *
   * @param position
   * @private
   */
  _onDrawAnchor(position) {
    this._positions.push(position)
    this.drawTool.fire(PlotEventType.CREATE_ANCHOR, { position })
  }
}

export default DrawPolygon
