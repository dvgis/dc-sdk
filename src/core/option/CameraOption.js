/*
 * @Author: Caven
 * @Date: 2020-01-21 15:33:52
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-25 10:54:49
 */
import Cesium from '@/namespace'

class CameraOption {
  constructor(viewer) {
    this._viewer = viewer
  }

  setPichRange(min, max) {
    let handler = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas)
    if (this._viewer.scene.mode === Cesium.SceneMode.SCENE3D) {
      handler.setInputAction(movement => {
        handler.setInputAction(movement => {
          let enableTilt = true
          let isUp = movement.endPosition.y < movement.startPosition.y
          if (isUp && this._viewer.camera.pitch > Cesium.Math.toRadians(max)) {
            enableTilt = false
          } else if (
            !isUp &&
            this._viewer.camera.pitch < Cesium.Math.toRadians(min)
          ) {
            enableTilt = false
          } else {
            enableTilt = true
          }
          this._viewer.scene.screenSpaceCameraController.enableTilt = enableTilt
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN)
      handler.setInputAction(movement => {
        this._viewer.scene.screenSpaceCameraController.enableTilt = true
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      }, Cesium.ScreenSpaceEventType.MIDDLE_UP)
    }
  }

  limitCameraToGround() {
    this._viewer.camera.changed.addEventListener(framestate => {
      if (
        this._viewer.camera._suspendTerrainAdjustment &&
        this._viewer.scene.mode === Cesium.SceneMode.SCENE3D
      ) {
        this._viewer.camera._suspendTerrainAdjustment = false
        this._viewer.camera._adjustOrthographicFrustum(true)
      }
    })
  }
}

export default CameraOption
