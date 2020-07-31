/**
 * @Author: Caven
 * @Date: 2019-12-30 09:35:51
 */

const { Cesium } = DC.Namespace

const thirdPart = {
  Cartesian2: Cesium.Cartesian2,
  Cartesian3: Cesium.Cartesian3,
  SceneMode: Cesium.SceneMode,
  TilesetStyle: Cesium.Cesium3DTileStyle,
  CallbackProperty: Cesium.CallbackProperty,
  JulianDate: Cesium.JulianDate,
  ClassificationType: Cesium.ClassificationType,
  Color: Cesium.Color,
  ColorMaterialProperty: Cesium.ColorMaterialProperty,
  ImageMaterialProperty: Cesium.ImageMaterialProperty,
  PolylineDashMaterialProperty: Cesium.PolylineDashMaterialProperty,
  PolylineGlowMaterialProperty: Cesium.PolylineGlowMaterialProperty,
  PolylineOutlineMaterialProperty: Cesium.PolylineOutlineMaterialProperty,
  PolylineArrowMaterialProperty: Cesium.PolylineArrowMaterialProperty
}

DC.mixin(thirdPart)
