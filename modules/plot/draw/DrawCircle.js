/**
 * @Author: Caven
 * @Date: 2020-08-29 21:24:55
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import { Circle } from '@dc-modules/overlay'
import Draw from './Draw'

const DEF_STYLE = {
  material: Cesium.Color.YELLOW.withAlpha(0.6),
  fill: true
}

class DrawCircle extends Draw {
  constructor(style) {
    super()
    this._positions = []
    this._radius = 0
    this._style = {
      ...DEF_STYLE,
      ...style
    }
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity({
      polygon: {
        ...this._style,
        hierarchy: new Cesium.CallbackProperty(() => {
          if (this._positions.length > 1) {
            this._radius = Cesium.Cartesian3.distance(
              this._positions[0],
              this._positions[1]
            )
            if (this._radius <= 0) {
              return null
            }
            let cep = Cesium.EllipseGeometryLibrary.computeEllipsePositions(
              {
                center: this._positions[0],
                semiMajorAxis: this._radius,
                semiMinorAxis: this._radius,
                rotation: 0,
                granularity: 0.005
              },
              false,
              true
            )
            let pnts = Cesium.Cartesian3.unpackArray(cep.outerPositions)
            pnts.push(pnts[0])
            return new Cesium.PolygonHierarchy(pnts)
          } else {
            return null
          }
        }, false)
      }
    })
    this._layer.add(this._delegate)
  }

  _onClick(e) {
    let len = this._positions.length
    let position = this._clampToGround ? e.surfacePosition : e.position
    if (len === 0) {
      this._positions.push(position)
      this.createAnchor(position, true)
      this._floatingAnchor = this.createAnchor(position)
    }
    this._positions.push(position)
    if (len > 0) {
      this.createAnchor(position)
    }
    if (len > 1) {
      this._positions.pop()
      this.unbindEvent()
      let circle = new Circle(
        Transform.transformCartesianToWGS84(this._positions[0]),
        this._radius
      )
      circle.setStyle(this._style)
      this._plotEvent.raiseEvent(circle)
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

export default DrawCircle
