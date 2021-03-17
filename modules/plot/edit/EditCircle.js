/**
 * @Author: Caven
 * @Date: 2020-08-31 10:54:38
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Edit from './Edit'

class EditCircle extends Edit {
  constructor(overlay) {
    super()
    this._overlay = overlay
    this._center = undefined
    this._radius = 0
    this._positions = []
  }

  _mountEntity() {
    this._radius = this._overlay.radius
    this._center = Transform.transformWGS84ToCartesian(this._overlay.center)
    this._overlay.show = false
    this._delegate = new Cesium.Entity({
      polygon: {
        material: this._overlay.delegate?.polygon?.material
      }
    })
    this._positions = [].concat([
      this._center,
      this._computeCirclePoints(this._center, this._radius)[0]
    ])
    this._delegate.polygon.hierarchy = new Cesium.CallbackProperty(time => {
      if (this._positions.length > 1) {
        this._radius = Cesium.Cartesian3.distance(
          this._positions[0],
          this._positions[1]
        )
        if (this._radius <= 0) {
          return null
        }
        let pnts = this._computeCirclePoints(this._positions[0], this._radius)
        pnts.push(pnts[0])
        return new Cesium.PolygonHierarchy(pnts)
      } else {
        return null
      }
    }, false)
    this._layer.add(this._delegate)
  }

  _mountAnchor() {
    this._positions.forEach((item, index) => {
      this.createAnchor(item, index, false, index % 2 === 0)
    })
  }

  _computeCirclePoints(center, radius) {
    let pnts = []
    let cep = Cesium.EllipseGeometryLibrary.computeEllipsePositions(
      {
        center: center,
        semiMajorAxis: radius,
        semiMinorAxis: radius,
        rotation: 0,
        granularity: 0.005
      },
      false,
      true
    )
    if (cep && cep.outerPositions) {
      pnts = Cesium.Cartesian3.unpackArray(cep.outerPositions)
    }
    return pnts
  }

  _onClick(e) {
    let now = Cesium.JulianDate.now()
    if (this._isMoving) {
      this._isMoving = false
      if (this._pickedAnchor && this._pickedAnchor.position) {
        let position = this._clampToGround ? e.surfacePosition : e.position
        this._pickedAnchor.position.setValue(position)
        let properties = this._pickedAnchor.properties.getValue(now)
        this._positions[properties.index] = position
      }
    } else {
      this._isMoving = true
      if (!e.target || !e.target.id) {
        return false
      }
      this._pickedAnchor = e.target.id
    }
  }

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, '点击锚点移动,右击结束编辑')
    if (!this._isMoving) {
      return
    }
    if (this._pickedAnchor && this._pickedAnchor.position) {
      let properties = this._pickedAnchor.properties.getValue(
        Cesium.JulianDate.now()
      )
      let position = this._clampToGround ? e.surfacePosition : e.position
      this._pickedAnchor.position.setValue(position)
      this._positions[properties.index] = position
    }
  }

  _onRightClick(e) {
    this.unbindEvent()
    this._overlay.center = Transform.transformCartesianToWGS84(
      this._positions[0]
    )
    this._overlay.radius = this._radius
    this._overlay.show = true
    this._plotEvent.raiseEvent(this._overlay)
  }
}

export default EditCircle
