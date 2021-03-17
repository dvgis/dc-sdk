/**
 * @Author: Caven
 * @Date: 2020-08-30 23:12:09
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Edit from './Edit'

class EditPolygon extends Edit {
  constructor(overlay) {
    super()
    this._overlay = overlay
    this._positions = []
  }

  _mountEntity() {
    this._delegate = new Cesium.Entity()
    this._delegate.merge(this._overlay.delegate)
    this._overlay.show = false
    this._delegate.polygon.hierarchy = new Cesium.CallbackProperty(time => {
      if (this._positions.length > 2) {
        return new Cesium.PolygonHierarchy(this._positions)
      } else {
        return null
      }
    }, false)
    this._layer.add(this._delegate)
  }

  _mountAnchor() {
    let positions = [].concat(
      this._overlay.delegate.polygon.hierarchy.getValue(Cesium.JulianDate.now())
        .positions
    )
    positions.push(positions[0])
    for (let i = 0; i < positions.length - 1; i++) {
      let mid = this.computeMidPosition(positions[i], positions[i + 1])
      this._positions.push(positions[i])
      this._positions.push(mid)
    }
    this._positions.forEach((item, index) => {
      this.createAnchor(item, index, index % 2 !== 0)
    })
  }

  _onClick(e) {
    if (this._isMoving) {
      this._isMoving = false
      if (this._pickedAnchor && this._pickedAnchor.position) {
        let position = this._clampToGround ? e.surfacePosition : e.position
        this._pickedAnchor.position.setValue(position)
        let properties = this._pickedAnchor.properties.getValue(
          Cesium.JulianDate.now()
        )
        let currentIndex = properties.index
        if (properties.isMid) {
          let preMidPosition
          let nextMidPosition
          let len = this._positions.length
          if (currentIndex === len - 1) {
            preMidPosition = this.computeMidPosition(
              this._positions[currentIndex],
              this._positions[currentIndex - 1]
            )
            nextMidPosition = this.computeMidPosition(
              this._positions[currentIndex],
              this._positions[0]
            )
          } else {
            preMidPosition = this.computeMidPosition(
              this._positions[currentIndex],
              this._positions[currentIndex - 1]
            )
            nextMidPosition = this.computeMidPosition(
              this._positions[currentIndex],
              this._positions[currentIndex + 1]
            )
          }
          this._positions.splice(
            properties.index,
            1,
            preMidPosition,
            position,
            nextMidPosition
          )
          this._anchorLayer.removeAll()
          this._anchors = []
          this._positions.forEach((item, index) => {
            this.createAnchor(item, index, index % 2 !== 0)
          })
        }
      }
    } else {
      this._isMoving = true
      if (!e.target.id) {
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
      let currentIndex = properties.index
      this._pickedAnchor.position.setValue(position)
      this._positions[currentIndex] = position
      let len = this._positions.length
      if (!properties.isMid) {
        let preAnchorIndex = -1
        let preMidAnchorIndex = -1
        let nextAnchorIndex = -1
        let nextMidAnchorIndex = -1
        if (currentIndex === 0) {
          preAnchorIndex = len - 2
          preMidAnchorIndex = len - 1
          nextAnchorIndex = currentIndex + 2
          nextMidAnchorIndex = currentIndex + 1
        } else if (currentIndex === len - 2) {
          preAnchorIndex = currentIndex - 2
          preMidAnchorIndex = currentIndex - 1
          nextAnchorIndex = 0
          nextMidAnchorIndex = len - 1
        } else {
          preAnchorIndex = currentIndex - 2
          preMidAnchorIndex = currentIndex - 1
          nextAnchorIndex = currentIndex + 2
          nextMidAnchorIndex = currentIndex + 1
        }
        let preMidPosition = this.computeMidPosition(
          this._positions[preAnchorIndex],
          this._positions[currentIndex]
        )
        let nextMidPosition = this.computeMidPosition(
          this._positions[nextAnchorIndex],
          this._positions[currentIndex]
        )
        this._positions[preMidAnchorIndex] = preMidPosition
        this._positions[nextMidAnchorIndex] = nextMidPosition
        this._anchors[preMidAnchorIndex].position.setValue(preMidPosition)
        this._anchors[nextMidAnchorIndex].position.setValue(nextMidPosition)
      }
    }
  }

  _onRightClick(e) {
    this.unbindEvent()
    this._overlay.positions = Transform.transformCartesianArrayToWGS84Array(
      this._positions
    )
    this._overlay.show = true
    this._plotEvent.raiseEvent(this._overlay)
  }
}

export default EditPolygon
