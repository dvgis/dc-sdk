---
sidebar: auto
---

# Layers 🌎

Categorize overlay elements with the same business logic or attributes for the same management

## Layer

> The base class of the layer, its subclasses are instantiated and need to be added to the 3D scene in order to display all kinds of 3D data

:::warning
This basic class cannot be instantiated
:::

### properties

- `{String} id` **_`readonly`_**
- `{Boolean} show`
- `{Object} attr`：Business Properties
- `{String} state` **_`readonly`_**
- `{String} type` **_`readonly`_**

### methods

- **_addOverlay(overlay)_**

  - parameters
    - `{Overlay} overlay`
  - returns `this`

- **_addOverlays(overlays)_**

  - parameters
    - `{Array<Overlay>} overlays`
  - returns `this`

- **_removeOverlay(overlay)_**

  - parameters
    - `{Overlay} overlay`
  - returns `this`

- **_getOverlay(overlayId)_**

  - parameters
    - `{String} overlayId`
  - returns `overlay`

- **_getOverlayById(Id)_**

  - parameters
    - `{String} Id`
  - returns `overlay`

- **_getOverlaysByAttr(attrName, attrVal)_**

  - parameters
    - `{String} attrName`
    - `{Object} attrVal`
  - returns `array`

  ```js
  overlay.attr.name = 'test'
  let arr = layer.getOverlaysByAttr('name', 'test')
  ```

- **_getOverlays()_**

  - returns `array`

- **_eachOverlay(method, context)_**

  - parameters
    - `{Function} method`：Callback function with parameters for overlay
    - `{Object} context`
  - returns `this`

  ```js
  layer.eachOverlay((item) => {})
  ```

- **_clear()_**

  - returns `this`

- **_remove()_**

  - returns `this`

- **_addTo(viewer)_**

  - parameters
    - `{Viewer|World} viewer`：场景
  - returns `this`

- **_on(type, callback, context)_**

  Event Subscription

  - parameters
    - `{Object} type`
    - `{Function} callback`
    - `{Object} context`
  - returns `this`

- **_off(type, callback, context)_**

  Event Unsubscribe

  - parameters
    - `{Object} type`
    - `{Function} callback`
    - `{Object} context`
  - returns `this`

- **_fire(type,params)_**

  - parameters
    - `{Object} type`
    - `{Object} params`
  - returns `this`

### static methods

- **_registerType(type)_**

  - parameters
    - `{String} type`

- **_getLayerType()_**

  - returns `string`

## DC.LayerGroup

> Layer groups, grouping layers according to a certain logic to facilitate unified management

### example

```js
let layerGroup = new DC.LayerGroup('id')
viewer.addLayerGroup(layerGroup)
let layer = new DC.VectorLayer('layer')
layerGroup.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `layerGroup`

### properties

- `{String} id` **_`readonly`_**
- `{Boolean} show`
- `{String} type` **_`readonly`_**

### methods

- **_addLayer(layer)_**

  - parameters
    - `{Layer} layer`
  - returns `this`

- **_removeLayer(layer)_**

  - parameters
    - `{Layer} layer`
  - returns `this`

- **_getLayer(id)_**

  - parameters
    - `{String} id`
  - returns `layer`

- **_getLayers()_**

  - returns `layer`

- **_remove()_**

  - returns `this`

- **_addTo(viewer)_**

  - parameters
    - `{Viewer|World} viewer`：场景
  - returns `this`

## DC.VectorLayer

> Vector layer, used to add all kinds of vector data (points, lines, surfaces, etc.), grouping vector data according to a certain logic to facilitate unified management, inherited from [Layer](#layer)

### example

```js
let layer = new DC.VectorLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `vectorLayer`

## DC.DynamicLayer

> Dynamic layer, used to add all kinds of dynamic data (billboard、model etc.), grouping vector data according to a certain logic to facilitate unified management, inherited from [Layer](#layer)

### example

```js
let layer = new DC.DynamicLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `vectorLayer`

## DC.PrimitiveLayer

> The primitive layer, which is used to add all kinds of primitive data, group the primitive data in a certain logic to facilitate unified management, inherited from [Layer](#layer)

### example

```js
let layer = new DC.PrimitiveLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `primitiveLayer`

## DC.GroundPrimitiveLayer

> The ground primitive layer, which is used to add all kinds of ground primitive data, group the ground primitive data in a certain logic to facilitate unified management, inherited from [Layer](#layer)

### example

```js
let layer = new DC.GroundPrimitiveLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `groundPrimitiveLayer`

## DC.TilesetLayer

> 3dTiles layer, used to add 3dTiles model data, inherits from[Layer](#layer)

### example

```js
let layer = new DC.TilesetLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `tilesetLayer`

## DC.GeoJsonLayer

> GeoJson layer, used to load GeoJson data, inherited from [Layer](#layer)，

### example

```js
let layer = new DC.GeoJsonLayer('id', '**/**.geojson')
layer.eachOverlay((item) => {
  // item is an entity,
  if (item.polyline) {
    //todo
    let polyline = DC.Polyline.fromEntity(item)
  }
  if (item.polygon) {
    //todo
    let polygon = DC.Polygon.fromEntity(item)
  }
  if (item.billboard) {
    //todo
    let point = DC.Point.fromEntity(item)
    let divIcon = DC.DivIcon.fromEntity(item)
    let billboard = DC.Billboard.fromEntity(item)
  }
})
```

### creation

- **_constructor(id,url,[options])_**

  - parameters
    - `{String} id`
    - `{String} url`
    - `{Object} options` [GeoJsonDataSource](http://resource.dvgis.cn/cesium-docs/GeoJsonDataSource.html)
  - returns `geoJsonLayer`

### methods

- **_toVectorLayer()_**

  - returns `vectorLayer`

- **_toModelLayer(modelUrl)_**

  - parameters
    - `{String} modelUrl`
  - returns `vectorLayer`

## DC.TopoJsonLayer

> TopoJson layer, used to load TopoJson data, inherited from [Layer](#layer)，

### example

```js
let layer = new DC.GeoJsonLayer('id', '**/**.geojson')
layer.eachOverlay((item) => {
  // item is an entity,
  if (item.polyline) {
    //todo
    let polyline = DC.Polyline.fromEntity(item)
  }
  if (item.polygon) {
    //todo
    let polygon = DC.Polygon.fromEntity(item)
  }
  if (item.billboard) {
    //todo
    let point = DC.Point.fromEntity(item)
    let divIcon = DC.DivIcon.fromEntity(item)
    let billboard = DC.Billboard.fromEntity(item)
  }
})
```

### creation

- **_constructor(id,url,[options])_**

  - parameters
    - `{String} id`
    - `{String} url`
    - `{Object} options` [GeoJsonDataSource](http://resource.dvgis.cn/cesium-docs/GeoJsonDataSource.html)
  - returns `topoJsonLayer`

### methods

- **_toVectorLayer()_**

  - returns `vectorLayer`

- **_toModelLayer(modelUrl)_**

  - parameters
    - `{String} modelUrl`
  - returns `vectorLayer`

## DC.HtmlLayer

> Html layer for loading DivIcon nodes, inherited from [Layer](#layer)，

### example

```js
let layer = new DC.HtmlLayer('dom')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  DC.HtmlLayer 构造函数

  - parameters
    - `{String} id`：图层唯一标识
  - returns `htmlLayer`

## DC.CzmlLayer

> Czml layer for loading Czml data, inherited from [Layer](#layer)

### example

```js
let layer = new DC.CzmlLayer('id', '**/**.czml')
layer.eachOverlay((item) => {
  if (item.polyline) {
    //todo
  }
  if (item.polygon) {
    //todo
  }
  if (item.billboard) {
    //todo
  }
})
```

### creation

- **_constructor(id,url,[options])_**

  - parameters
    - `{String} id`
    - `{String} url`
    - `{Object} options` [CzmlDataSource](http://resource.dvgis.cn/cesium-docs/CzmlDataSource.html)
  - returns `czmlLayer`

## DC.KmlLayer

> Kml layer for loading Kml data, inherited from [Layer](#layer)

### example

```js
let layer = new DC.KmlLayer('id', '**/**.kml')
layer.eachOverlay((item) => {
  if (item.polyline) {
    //todo
  }
  if (item.polygon) {
    //todo
  }
  if (item.billboard) {
    //todo
  }
})
```

### creation

- **_constructor(id,url,[options])_**

  - parameters
    - `{String} id`
    - `{String} url`
    - `{Object} options` [KmlDataSource](http://resource.dvgis.cn/cesium-docs/KmlDataSource.html)
  - returns `kmlLayer`

## DC.GpxLayer

> Gpx layer for loading gpx data, inherited from [Layer](#layer)

### example

```js
let layer = new DC.GpxLayer('id', '**/**.gpx')
```

### creation

- **_constructor(id,url,[options])_**

  - parameters
    - `{String} id`
    - `{String} url`
    - `{Object} options` [GpxDataSource](http://resource.dvgis.cn/cesium-docs/GpxDataSource.html)
  - returns `gpxLayer`

## DC.ClusterLayer

> Inherited from [Layer](#layer)

### example

```js
let layer = new DC.ClusterLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id,[options])_**

  - parameters
    - `{String} id`
    - `{Object} options`
  - returns `clusterLayer`

```json
{
  "size": 48,
  "pixelRange": 40,
  "gradient": {
    "0.0001": DC.Color.DEEPSKYBLUE,
    "0.001": DC.Color.GREEN,
    "0.01": DC.Color.ORANGE,
    "0.1": DC.Color.RED
  },
  "style": "circle", // circle or clustering
  "fontSize": 12,
  "fontColor": DC.Color.BLACK
}
```

## DC.HeatLayer

> Inherited from [Layer](#layer)

### example

```js
let layer = new DC.HeatLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id,[options])_**

  - parameters
    - `{String} id`
    - `{Object} options`
  - returns `heatLayer`

```json
//options(optional)
{
  "gradient": {
    "0.5": "green",
    "0.6": "orange",
    "0.95": "red"
  },
  "height": 0,
  "radius": 30,
  "useGround": false,
  "classificationType": 2 // only use for "useGround" is true
}
```

### methods

- **_setPositions(positions)_**

  - parameters
    - `{Array<Object>} positions`
  - returns `heatLayer`

```json
{
  "lng": "",
  "lat": "",
  "value": 1
}
```

- **_addPosition(position)_**

  - parameters
    - `{Object} position`
  - returns `heatLayer`

```json
{
  "lng": "",
  "lat": "",
  "value": 1
}
```

## DC.WindLayer

> Inherited from [Layer](#layer)

### example

```js
let layer = new DC.WindLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id,[options])_**

  - parameters
    - `{String} id`
    - `{Object} options`
  - returns `windLayer`

```json
//options(optional)
{
  "globalAlpha": 0.9,
  "lineWidth": 1,
  "colorScale": "#fff",
  "velocityScale": 1 / 25,
  "maxAge": 90,
  "paths": 800,
  "frameRate": 20,
  "useCoordsDraw": true,
  "gpet": true
}
```

### methods

- **_setData(data,[options])_**

  - parameters
    - `{Object} data`
    - `{Object} options`
  - returns `windLayer`

- **_setOptions(options)_**

  - parameters
    - `{Object} options`
  - returns `windLayer`

## DC.S3MLayer

> SInherited from [Layer](#layer)

### example

```js
let layer = new DC.S3MLayer('id','**.scp')
viewer.addLayer(layer)
```

### creation

- **_constructor(id,url,[options])_**

  - parameters
    - `{String} id`
    - `{String} url`
    - `{Object} options`
  - returns `windLayer`

```json
//options(optional)
{
  "maxVisibleDistance"：Number.MAX_VALUE, 
  "minVisibleDistance"：0,
}
```
