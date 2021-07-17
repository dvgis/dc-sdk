/**
 * @Author: Caven
 * @Date: 2020-08-29 20:29:59
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '@dc-modules/event'
import { Transform } from '@dc-modules/transform'
import { Billboard } from '@dc-modules/overlay'
import Draw from './Draw'

const IMG_CIRCLE_RED = require('@dc-modules/images/circle_red.png')

class DrawPoint extends Draw {
  constructor(style) {
    super()
    this._position = Cesium.Cartesian3.ZERO
    this._style = {
      image: IMG_CIRCLE_RED,
      ...style
    }
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    this.drawTool.tooltipMess = '单击选择点位'
    this._delegate = new Cesium.Entity({
      position: new Cesium.CallbackProperty(() => {
        return this._position
      }, false),
      billboard: {
        ...this._style
      }
    })
    this._layer.entities.add(this._delegate)
  }

  /**
   *
   * @private
   */
  _stopdHook() {
    let billboard = new Billboard(
      Transform.transformCartesianToWGS84(this._position),
      this._style.image
    ).setStyle(this._style)
    this._options.onDrawStop && this._options.onDrawStop(billboard)
  }

  /**
   *
   * @param position
   * @private
   */
  _onDrawAnchor(position) {
    this._position = position
    this.drawTool.fire(PlotEventType.DRAW_STOP)
  }

  /**
   *
   * @param position
   * @private
   */
  _onAnchorMoving(position) {
    this._position = position
  }
}

export default DrawPoint
