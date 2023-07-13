---
sidebar: auto
---

# Map 🌎

Construct topography and pictures of the earth's surface to show the real state of the earth's surface

## DC.ImageryLayerFactory

> For creating all kinds of map tiles

### example

```js
let baseLayer = DC.ImageryLayerFactory.createAmapImageryLayer({
  style: 'img',
})
viewer.addBaseLayer(baseLayer, {
  name: 'map',
  iconUrl: '../preview.png',
})
```

### static methods

- **_createAmapImageryLayer(options)_**

  - parameters
    - `{Object} options`
  - returns `Promise<baseLayerProvider>`

- **_createBaiduImageryLayer(options)_**

  - parameters
    - `{Object} options`
  - returns `Promise<baseLayerProvider>`

- **_createGoogleImageryLayer(options)_**

  - parameters
    - `{Object} options`
  - returns `Promise<baseLayerProvider>`

- **_createTdtImageryLayer(options)_**

  - parameters
    - `{Object} options`
  - returns `Promise<baseLayerProvider>`

- **_createTencentImageryLayer(options)_**

  - parameters
    - `{Object} options`
  - returns `Promise<baseLayerProvider>`

- **_createArcGisImageryLayer(options)_**

  - parameters
    - `{Object} options` [ArcGis](http://resource.dvgis.cn/cesium-docs/ArcGisMapServerImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createSingleTileImageryLayer(options)_**

  - parameters
    - `{Object} options` [Single](http://resource.dvgis.cn/cesium-docs/SingleTileImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createWMSImageryLayer(options)_**

  - parameters
    - `{Object} options` [WMS](http://resource.dvgis.cn/cesium-docs/WebMapServiceImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createWMTSImageryLayer(options)_**

  - parameters
    - `{Object} options` [WMTS](http://resource.dvgis.cn/cesium-docs/WebMapTileServiceImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createXYZImageryLayer(options)_**

  - parameters
    - `{Object} options` [X/Y/Z](http://resource.dvgis.cn/cesium-docs/UrlTemplateImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createCoordImageryLayer(options)_**

  - parameters
    - `{Object} options`
  - returns `Promise<baseLayerProvider>`

- **_createGridImageryLayer(options)_**

  - parameters
    - `{Object} options` [Grid](http://resource.dvgis.cn/cesium-docs/GridImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createMapboxImageryLayer(options)_**

  - parameters
    - `{Object} options` [Mapbox](http://resource.dvgis.cn/cesium-docs/MapboxImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createMapboxStyleImageryLayer(options)_**

  - parameters
    - `{Object} options` [Mapbox Style](http://resource.dvgis.cn/cesium-docs/MapboxStyleImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createTMSImageryLayer(options)_**

  - parameters
    - `{Object} options` [TMS](http://resource.dvgis.cn/cesium-docs/TileMapServiceImageryProvider.html#.ConstructorOptions)
  - returns `Promise<baseLayerProvider>`

- **_createImageryLayer(type, options)_**

  - parameters
    - `{String} type`，DC.ImageryType
    - `{Object} options`
  - returns `Promise<baseLayerProvider>`

```json
//options(optional)
{
  "url": "",
  "style": "img", //img、elec、ter。baidu：normal、middlenight、dark，tencent：img,1、4
  "key": "", //Valid only for TDT
  "subdomains": [],
  "crs":"WGS84",// WGS84 、BD09 、GCJ02, Valid only for BAIDU and AMAP
  "protocol":null,// http、https
  "tilingScheme":null, // GeographicTilingScheme , WebMercatorTilingScheme
  "rectangle": {
    "west": 0,
    "south": 0,
    "east": 0,
    "north":
  }
}
```

## DC.TerrainFactory

> For creating terrain

### example

```js
let terrain = DC.TerrainFactory.createUrlTerrain({
  url: '****/***',
})
viewer.addTerrain(terrain)
```

### static methods

- **_createEllipsoidTerrain()_**

  - returns `terrain`

- **_createUrlTerrain(options)_**

  - parameters
    - `{Object} options`
  - returns `terrain`

- **_createGoogleTerrain(options)_**

  - parameters
    - `{Object} options`
  - returns `terrain`

- **_createArcgisTerrain(options)_**

  - parameters
    - `{Object} options`
  - returns `terrain`

- **_createVRTerrain(options)_**

  - parameters
    - `{Object} options`
  - returns `terrain`

- **_createTerrain(type，options)_**

  - parameters
    - `{String} type`: DC.TerrainType
    - `{Object} options`
  - returns `terrain`

```json
//options（optional）
{
  "url": ""
}
```
