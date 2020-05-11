/*
 * @Author: Caven
 * @Date: 2020-03-17 18:23:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:13:36
 */
import Edit from './Edit'

const { OverlayType, Transform } = DC

class EditCircle extends Edit {
  constructor(plotInfo) {
    super(plotInfo)
    this._center = this._overlay.center
    this._radius = this._overlay.radius
  }

  _computeRadius(src, dest) {
    let srcCartographic = Cesium.Cartographic.fromCartesian(src)
    let destCartographic = Cesium.Cartographic.fromCartesian(dest)
    let geodesic = new Cesium.EllipsoidGeodesic()
    geodesic.setEndPoints(srcCartographic, destCartographic)
    let s = geodesic.surfaceDistance
    this._radius = Math.sqrt(
      Math.pow(s, 2) +
        Math.pow(destCartographic.height - srcCartographic.height, 2)
    )
  }

  _prepareMarkers() {
    // let rectangle = Cesium.EllipseGeometry.computeRectangle({
    //   center: Transform.this._center,
    //   semiMajorAxis: this._radius,
    //   semiMinorAxis: this._radius
    // })
    //let positions = [this._center]
  }
}

export default EditCircle
