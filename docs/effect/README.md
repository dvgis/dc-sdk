---
sidebar: auto
---

# Effects 🌎

Add dynamic elements to the 3D scene to allow the scene to move and run more closely to the real world

## DC.Weather

### example

```js
let weather = new DC.Weather()
viewer.use(weather)
```

### creation

- **_constructor()_**

  - Returns `weather`

### properties

- [`{Rain} rain`](#rain)**_`readonly`_**
- [`{Snow} snow`](#snow) **_`readonly`_**
- [`{Fog} snow`](#fog) **_`readonly`_**
- [`{Cloud} cloud`](#cloud) **_`readonly`_**

## Rain

### example

```js
viewer.weather.rain.enable = true
viewer.weather.rain.speed = 2
```

### properties

- `{Boolean} enable`
- `{Number} speed`

## Snow

### example

```js
viewer.weather.snow.enable = true
viewer.weather.snow.speed = 2
```

### properties

- `{Boolean} enable`
- `{Number} speed`

## Fog

### example

```js
viewer.weather.fog.enable = true
viewer.weather.fog.fogColor = DC.Color.BLACK
```

### properties

- `{Boolean} enable`
- `{Color} fogColor
- `{Object} fogByDistance`: { near: 10, nearValue: 0, far: 2000, farValue: 1.0 }

## Cloud

### example

```js
viewer.weather.cloud.enable = true
viewer.weather.cloud.rotateAmount = 0.02
```

### properties

- `{Boolean} enable`
- `{Number} rotateAmount`

## DC.Effect

### example

```js
let effect = new DC.Effect()
viewer.use(effect)
```

### creation

- **_constructor()_**

  - Returns `effect`

### properties

- [`{BlackAndWhite} blackAndWhite`](#blackandwhite) **_`readonly`_**
- [`{Bloom} bloom`](#bloom) **_`readonly`_**
- [`{Brightness} brightness`](#brightness)**_`readonly`_**
- [`{DepthOfField} depthOfField`](#depthoffield) **_`readonly`_**
- [`{LensFlare} lensFlare`](#lensflare) **_`readonly`_**
- [`{Night} night`](#night) **_`readonly`_**
- [`{Silhouette} silhouette`](#silhouette) **_`readonly`_**

## BlackAndWhite

### example

```js
viewer.effect.blackAndWhite.enable = true
```

### properties

- `{Boolean} enable`
- `{Number} gradations`
- `{Array} selected`

## Bloom

### example

```js
viewer.effect.bloom.enable = true
```

### properties

- `{Boolean} enable`
- `{Number} contrast`
- `{Number} brightness`
- `{Number} glowOnly`
- `{Number} delta`
- `{Number} sigma`
- `{Number} stepSize`
- `{Array} selected`

## Brightness

### example

```js
viewer.effect.brightness.enable = true
```

### properties

- `{Boolean} enable`
- `{Number} intensity`
- `{Array} selected`

## DepthOfField

### example

```js
viewer.effect.depthOfField.enable = true
```

### properties

- `{Boolean} enable`
- `{Number}} focalDistance`
- `{Number} delta`
- `{Number} sigma`
- `{Number} stepSize`
- `{Array} selected`

## LensFlare

### example

```js
viewer.effect.lensFlare.enable = true
```

### properties

- `{Boolean} enable`
- `{Number}} intensity`
- `{Number} distortion`
- `{Number} dirtAmount`
- `{Number} haloWidth`
- `{Array} selected`

## Night

### example

```js
viewer.effect.night.enable = true
```

### properties

- `{Boolean} enable`
- `{Array} selected`

## Silhouette

### example

```js
viewer.effect.silhouette.enable = true
```

### properties

- `{Boolean} enable`
- `{Color} color`
- `{Number} length`
- `{Array} selected`

## Animation

> Animation base class

:::warning
The class cannot be instantiated
:::

### methods

- **_start()_**

  - returns `this`

- **_stop()_**

  - returns `this`

## DC.AroundPoint

> Inherited from [Animation](#animation)

### example

```js
let aroundPoint = new DC.AroundPoint(viewer, '120.121, 31.12')
aroundPoint.start()
```

### creation

- **_constructor(viewer,position,[options])_**

  - parameters
    - `{Viewer} viewer`
    - `{Position|String|Array} position`
    - `{Object} options`
  - returns `aroundPoint`

```json
//options(optional)
{
  "heading": 0,
  "pitch": 0,
  "range": 0,
  "duration": 0,
  "callback": null,
  "context": null
}
```

## DC.AroundView

> Inherited from [Animation](#animation)

### example

```js
let aroundView = new DC.AroundView(viewer)
aroundView.start()
```

### creation

- **_constructor(viewer,options)_**

  - parameters
    - `{Viewer} viewer`
    - `{Object} options`
  - returns `aroundView`

```json
//options(optional)
{
  "heading": 0,
  "duration": 0,
  "pitch": 0,
  "roll": 0,
  "callback": null,
  "context": null
}
```

## DC.CircleScan

> Inherited from [Animation](#animation)

### example

```js
let circleScan = new DC.CircleScan(viewer, '120, 20', 200)
circleScan.start()
```

### creation

- **_constructor(viewer,position,radius,[options])_**

  - parameters
    - `{Viewer} viewer`：场景
    - `{DC.Position} position`：位置
    - `{Number} radius`：半径
    - `{Object} options`：属性
  - returns `circleScan`

```json
//options(optional)
{
  "color": DC.Color.BLUE,
  "speed": 5
}
```

## DC.Flying

> Inherited from [Animation](#animation)

### example

```js
let flying = new DC.Flying(viewer)
flying.positions = ['121.234,21.212,0,-29', '121.435,21.212,0,-29']
flying.start()
```

### creation

- **_constructor(viewer,options)_**

  - parameters
    - `{Viewer} viewer`：场景
    - `{Object} options`：options
  - returns `flying`

```json
//options(optional)
{
  "loop": false,
  "dwellTime": 3,
  "callback": null
}
```

### properties

- `{Array} positions`
- `{Array} durations`: The flight interval of each point, when the length of the array is 1, each interval is the same, if not 1, the length must be equal to the length of the point

### methods

- **_start()_**

  - returns `this`

- **_pause()_**

  - returns `this`

- **_restore()_**

  - returns `this`

## DC.GlobeRotate

> Inherited from [Animation](#animation)

### example

```js
let globeRotate = new DC.GlobeRotate(viewer, {
  duration: 5,
  speed: 1000,
  callback: () => {},
})
globeRotate.start()
```

### creation

- **_constructor(viewer,[options])_**

  - parameters
    - `{DC.Viewer} viewer`
    - `{Object} options`
  - returns `globeRotate`

```json
//options（optional）
{
  "speed": 12 * 1000,
  "duration": 0,
  "callback": null,
  "context": null
}
```

## DC.RadarScan

> Inherited from [Animation](#animation)

### example

```js
let radarScan = new DC.RadarScan(viewer, '120, 20', 200)
radarScan.start()
```

### creation

- **_constructor(viewer,position,radius,options)_**

  - parameters
    - `{Viewer} viewer`
    - `{DC.Position} position`
    - `{Number} radius`
    - `{Object} options`
  - returns `radarScan`

```json
//options(optional)
{
  "color": DC.Color.BLUE,
  "speed": 5
}
```

## DC.RoamingController

### example

```js
let rc = new DC.RoamingController(viewer)
```

### creation

- **_constructor(viewer)_**

  - parameters
    - `{Viewer} viewer`
  - returns `roamingController`

### methods

- **_addPath(path)_**

  - parameters
    - `{RoamingPath} path`
  - returns `this`

- **_addPaths(paths)_**

  - parameters
    - `{Array<RoamingPath>} paths`
  - returns `this`

- **_removePath(path)_**

  - parameters
    - `{RoamingPath} path`
  - returns `path`

- **_getPath(id)_**

  - parameters
    - `{String} id`
  - returns `path`

- **_getPaths()_**

  - returns `array`

- **_activate(path, viewOption)_**

  - parameters
    - `{RoamingPath} path`
    - `{String} viewOption`
  - returns `this`

```json
// options (optional)
{
  "pitch": 0,
  "range": 1000
}
```

- **_deactivate()_**

  - returns `this`

- **_clear()_**

  - returns `this`

## DC.RoamingPath

### example

```js
let path = new DC.RoamingPath('120.121,32.1213;121.132,32.1213', 20)
rc.addPath(path)
```

### creation

- **_constructor(positions, duration, [pathMode])_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
    - `{Number} duration`
    - `{String} pathMode` speed / time
  - returns `roamingPath`

### properties

- `{String} pathId` **_`readonly`_**
- `{String} id`
- `{String|Array<Position|Number|String>} positions`
- `{Number} duration`
- `{String} pathMode` speed / time
- `{String} state` **_`readonly`_**

## DC.KeyboardRoaming

### example

```js
let kr = new DC.KeyboardRoaming(viewer)
kr.enable = true
```

### creation

- **_constructor(viewer)_**

  - parameters
    - `{Viewer} viewer`
  - returns `keyboardRoaming`

### properties

- `{Boolean} enable`
- `{Number} moveRate` default: 100
- `{Number} rotateRate` default: 0.01

## DC.TrackController

### example

```js
let tc = new DC.TrackController(viewer)
```

### creation

- **_constructor(viewer)_**

  - parameters
    - `{Viewer} viewer`
  - returns `trackController`

### methods

- **_addTrack(track)_**

  - parameters
    - `{Track} track`
  - returns `this`

- **_addTracks(tracks)_**

  - parameters
    - `{Array<Track>} tracks`
  - returns `this`

- **_removeTrack(track)_**

  - parameters
    - `{Track} track`
  - returns `path`

- **_getTrack(id)_**

  - parameters
    - `{String} id`
  - returns `track`

- **_getTracks()_**

  - returns `array`

- **_play()_**

  - returns `this`

- **_pause()_**

  - returns `this`

- **_restore()_**

  - returns `this`

- **_viewTrack(track, viewOption)_**

  - parameters
    - `{Track} track`
    - `{String} viewOption`
  - returns `this`

```json
// options (optional)
{
  "mode": null, // DC.TrackViewMode
  "pitch": 0,
  "range": 1000
}
```

- **_releaseTrack(track)_**

  - parameters
    - `{Track} track`：路径
  - returns `this`

- **_clear()_**

  - returns `this`

## DC.Track

### example

```js
let track = new DC.Track('120.121,32.1213;121.132,32.1213', 20)
rc.addTrack(track)
```

### creation

- **_constructor(positions, duration, [callback], [options])_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
    - `{Number} duration`
    - `{Function} callback`：Each point arrival callback function, parameters are: position, isLast
    - `{Object} options`
  - returns `track`

```json
// options (optional)
{
  "clampToGround": false,
  "clampToTileset": false,
  "interpolationType": "Linear", // Linear、Hermite、Lagrange
  "interpolationDegree": 2,
  "endDelayTime": 0.5 // End time extension time, unit:second
}
```

### properties

- `{String} trackId` **_`readonly`_**
- `{String} id`
- `{String|Array<Position|Number|String|Object>} positions`
- `{Number} duration`
- `{Date} startTime`
- `{String} state` **_`readonly`_**

### methods

- **_addPosition(position,duration)_**

  - parameters
    - `{Position|Array|String|Object} position`
    - `{Number} duration`
  - returns `this`

- **_setModel(modelUrl,style)_**

  - parameters
    - `{String} modelPath`
    - `{Object} style` [DC.Model](../dc-sdk/#dc-model)
  - returns `this`

- **_setBillboard(icon,style)_**

  - parameters
    - `{String} icon`
    - `{Object} style` [DC.Billboard](../dc-sdk/#dc-billboard)
  - returns `this`

- **_setLabel(text,style)_**

  - parameters
    - `{String} text`
    - `{Object} style` [DC.Label](../dc-sdk/#dc-label)
  - returns `this`

- **_setPath(visible,style)_**

  - parameters
    - `{Boolean}} visible`
    - `{Object} style` [DC.Polyline](../dc-sdk/#dc-polyline)
  - returns `this`
