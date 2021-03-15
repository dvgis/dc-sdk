/**
 * @Author: Caven
 * @Date: 2020-08-29 22:51:36
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { PlotUtil } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'
import AttackArrow from './AttackArrow'

class TailedAttackArrow extends AttackArrow {
  constructor(positions) {
    super(positions)
    this._delegate = new Cesium.Entity({ polygon: {} })
    this.headHeightFactor = 0.18
    this.headWidthFactor = 0.3
    this.neckHeightFactor = 0.85
    this.neckWidthFactor = 0.15
    this.tailWidthFactor = 0.1
    this.headTailFactor = 0.8
    this.swallowTailFactor = 1
    this.type = Overlay.getOverlayType('tailed_attack_arrow')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.polygon.hierarchy = this._getHierarchy()
    return this
  }

  get positions() {
    return this._positions
  }

  _getHierarchy() {
    let pnts = Parse.parsePolygonCoordToArray(this._positions)[0]
    let tailLeft = pnts[0]
    let tailRight = pnts[1]
    if (PlotUtil.isClockWise(pnts[0], pnts[1], pnts[2])) {
      tailLeft = pnts[1]
      tailRight = pnts[0]
    }
    let midTail = PlotUtil.mid(tailLeft, tailRight)
    let bonePnts = [midTail].concat(pnts.slice(2))
    let headPnts = this._getArrowHeadPoints(bonePnts, tailLeft, tailRight)
    let neckLeft = headPnts[0]
    let neckRight = headPnts[4]
    let tailWidth = PlotUtil.distance(tailLeft, tailRight)
    let allLen = PlotUtil.getBaseLength(bonePnts)
    let len = allLen * this.tailWidthFactor * this.swallowTailFactor
    let swallowTailPnt = PlotUtil.getThirdPoint(
      bonePnts[1],
      bonePnts[0],
      0,
      len,
      true
    )
    let factor = tailWidth / allLen
    let bodyPnts = this._getArrowBodyPoints(
      bonePnts,
      neckLeft,
      neckRight,
      factor
    )
    let count = bodyPnts.length
    let leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2))
    leftPnts.push(neckLeft)
    let rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count))
    rightPnts.push(neckRight)
    leftPnts = PlotUtil.getQBSplinePoints(leftPnts)
    rightPnts = PlotUtil.getQBSplinePoints(rightPnts)
    return new Cesium.PolygonHierarchy(
      Transform.transformWGS84ArrayToCartesianArray(
        Parse.parsePositions(
          leftPnts.concat(headPnts, rightPnts.reverse(), [
            swallowTailPnt,
            leftPnts[0]
          ])
        )
      )
    )
  }
}

Overlay.registerType('tailed_attack_arrow')

export default TailedAttackArrow
