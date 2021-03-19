/**
 * @Author: Caven
 * @Date: 2020-08-30 17:26:34
 */

import { Cesium } from '@dc-modules/namespace'
import Parse from '@dc-modules/parse/Parse'
import { Transform } from '@dc-modules/transform'
import { PlotUtil } from '@dc-modules/utils'
import AttackArrowGraphics from './AttackArrowGraphics'

class TailedAttackArrowGraphics extends AttackArrowGraphics {
  constructor(options) {
    super(options)
    this.headHeightFactor = 0.18
    this.headWidthFactor = 0.3
    this.neckHeightFactor = 0.85
    this.neckWidthFactor = 0.15
    this.tailWidthFactor = 0.1
    this.headTailFactor = 0.8
    this.swallowTailFactor = 1
  }

  _createHierarchy() {
    let pnts = Parse.parsePolygonCoordToArray(
      Transform.transformCartesianArrayToWGS84Array(this._positions)
    )[0]
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

export default TailedAttackArrowGraphics
