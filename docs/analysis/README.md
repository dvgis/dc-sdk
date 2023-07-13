---
sidebar: auto
---

# Analysis 🌎

## DC.Measure

> viewer measure

### example

```js
viewer.use(new DC.Measure())
```

### creation

- **_constructor()_**

  - returns `measure`

### methods

- **_angle([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_area([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_areaSurface([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_distance([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_distanceSurface([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_heading([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_height([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_triangleHeight([options])_**

  - parameters
    - `{Object} options`
  - returns `this`

- **_activate(type,[options])_**

  - parameters
    - `{String} type`
    - `{Object} options`
  - returns `this`

```json
// options(optional)
{
  "icon_center": "**.png",
  "icon_anchor": "**.png",
  "icon_midAnchor": "**.png",
  "icon_size": [12, 12],
  "clampToModel": false
}
```

- **_deactivate()_**

  - returns `this`

## DC.Analysis

> Viewer analysis

### example

```js
viewer.use(new DC.Analysis())
```

### creation

- **_constructor()_**

  - returns `analysis`

### methods

- **_contourLine(lineColor, lineWidth, lineSpacing)_**

  Contour Line Analysis

  - parameters
    - `{Color} lineColor`
    - `{Number} lineWidth`
    - `{Number} lineSpacing`
  - returns `this`

- **_shadows(startTime, multiplier)_**

  Daylight Analysis

  - parameters
    - `{Date} startTime`
    - `{Number} multiplier`
  - returns `this`

- **_sightLine(startPosition, endPosition, excludes, lerpNum)_**

  Through-view analysis (line)

  - parameters
    - `{Position|Array|String|Object} startPosition`
    - `{Position|Array|String|Object} endPosition`
    - `{Array<Overlay>} excludes`
    - `{Number} lerpNum`: Number of Interpolation, default: 10, the larger the number the more accurate, and at the same time the amount of calculation will increase
  - returns `this`

- **_sightCircle(center, radius, excludes, lerpNum)_**

  Through-view analysis (circle)

  - parameters
    - `{Position|Array|String|Object} center`
    - `{Number} radius`
    - `{Array<Overlay>} excludes`
    - `{Number} lerpNum`: Number of Interpolation, default: 10, the larger the number the more accurate, and at the same time the amount of calculation will increase
  - returns `this`

- **_viewshed(position, radius, fov, aspectRatio, options)_**

  View-Shed Analysis

  - parameters
    - `{Position|Array|String|Object} position`
    - `{Number} radius`
    - `{Number} fov`
    - `{Number} aspectRatio`
    - `{Object} options`
  - returns `this`

```json
//options(optional)
{
  "mixNum":1, 
  "visibleColor"：DC.Color.GREEN,
  "disVisibleColor"：DC.Color.RED,
  "showHelp": false,
  "gridColor": DC.Color.YELLOW,
  "lineColor": DC.Color.YELLOW.withAlpha(0.3)
}
```

- **_deactivate([type])_**

  - parameters
    - `{String} type`：Refer to `DC.AnalysisType`. When the type is empty, all analyses will be deactivated
  - returns `this`

## DC.CameraVideoLayer

> Inherited from [Layer](../layer/#layer)

### example

```js
let layer = new DC.CameraVideoLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `videoLayer`

### methods

- **_showHelp(show, videoOverlay, color)_**

  - parameters
    - `{Boolean} show`
    - `{Overlay} videoOverlay`
    - `{Color} color`
  - returns `this`

## DC.CameraVideo

> Inherited from [Overlay](../overlay/#overlay)

### example

```js
let position = new DC.Position(120, 20, 200, -20, 19)
let videoEl = new document.getElementById('video')
let cameraVideo = new DC.CameraVideo(position, videoEl)
layer.addOverlay(cameraVideo)
```

### creation

- **_constructor(position, video,[maskUrl])_**

  - parameters
    - `{Position} position`
    - `{Element} video`
    - `{String} [maskUrl]`
  - returns `cameraVideo`

### properties

- `{Position} position`
- `{Element} video`
- `{String} maskUrl`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "fov": 60,
  "near": 1,
  "far": 5000,
  "aspectRatio": 1,
  "alpha": 1,
  "clearBlack": true,
  "disViewColor": DC.Color.WHITE
}
```

## DC.PlaneVideoLayer

> Inherited from [Layer](../layer/#layer)

### example

```js
let layer = new DC.PlaneVideoLayer('id')
viewer.addLayer(layer)
```

### creation

- **_constructor(id)_**

  - parameters
    - `{String} id`
  - returns `videoLayer`

### methods

- **_showHelp(show, videoOverlay, color)_**

  - parameters
    - `{Boolean} show`
    - `{Overlay} videoOverlay`
    - `{Color} color`
  - returns `this`

## DC.PlaneVideo

> Inherited from [Overlay](../overlay/#overlay)

### example

```js
let position = new DC.Position(120, 20, 200, -20, 19)
let videoEl = new document.getElementById('video')
let cameraVideo = new DC.PlaneVideo(position, videoEl)
layer.addOverlay(cameraVideo)
```

### creation

- **_constructor(position, video)_**

  - parameters
    - `{Position} position`
    - `{Element} video`
  - returns `cameraVideo`

### properties

- `{Position} position`
- `{Element} video`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "fov": 60,
  "near": 1,
  "far": 5000,
  "aspectRatio": 1
}
```

## DC.GeoTools

> Geometry Tool

### example

```js
let coords = DC.GeoTools.pointBuffer(
  '120.71259021075333,31.22148081085083',
  100
)

let coords1 = DC.GeoTools.polygonBuffer(
  '120.71259021075333,31.22148081085083;120.71611354431036,31.221447256684566;120.7140691869497,31.21875584696343',
  150
)
```

### static methods

- **_pointBuffer(position, radius, steps)_**

  - parameters
    - `{Array|String|Position} position`
    - `{Number} radius`
    - `{Number} steps` default:8
  - returns `array`

- **_polylineBuffer(positions, radius, steps)_**

  - parameters
    - `{Array|String|Array<Position>} positions`
    - `{Number} radius`
    - `{Number} steps` default:8
  - returns `array`

- **_polygonBuffer(positions, radius, steps)_**

  - parameters
    - `{Array|String|Array<Position>} positions`
    - `{Number} radius`
    - `{Number} steps` default:8
  - returns `array`

- **_transformPolylineScale(positions, factor)_**

  - parameters
    - `{Array|String|Array<Position>} positions`
    - `{Number} factor`
  - returns `array`

- **_transformPolygonScale(positions, factor)_**

  - parameters
    - `{Array|String|Array<Position>} positions`
    - `{Number} factor`
  - returns `array`

- **_transformPolylineRotate(positions, angle)_**

  - parameters
    - `{Array|String|Array<Position>} positions`
    - `{Number} angle`
  - returns `array`

- **_transformPolygonRotate(positions, angle)_**

  - parameters
    - `{Array|String|Array<Position>} positions`
    - `{Number} angle`
  - returns `array`

## DC.GlobClipping

> Glob Clipping

### example

```js
let globClipping = new DC.GlobClipping(viewer)
```

### creation

- **_constructor(viewer,[options])_**

  - parameters
    - `{Viewer} viewer`
    - `{Object} options`
  - returns `globClipping`

```json
// options(optional)
{
  "edgeWidth": 0,
  "edgeColor": DC.Color.WHITE
}
```

### properties

- `{Array<Position>} positions`
- `{Number} distance`
- `{Boolean} enable`
- `{String} state` **_`readonly`_**

## DC.TerrainClipping

> Terrain Clipping

### example

```js
let terrainClipping = new DC.TerrainClipping(viewer)
```

### creation

- **_constructor(viewer,[options])_**

  - parameters
    - `{Viewer} viewer`
    - `{Object} options`
  - returns `terrainClipping`

```json
// options(optional)
{
  "edgeWidth": 0,
  "edgeColor": DC.Color.WHITE,
  "lerpInterval": 50,
  "bottomImage": "",
  "sideImage": ""
}
```

### properties

- `{Array<Position>} positions`
- `{Number} height`
- `{Boolean} enable`
- `{String} state` **_`readonly`_**
