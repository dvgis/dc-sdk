---
sidebar: auto
---

# Material 🌎

In the real world, each object would react differently to light. Steel looks more shiny than a ceramic vase, and a wooden box would not reflect light as strongly as a steel box. Each object also reacts differently to specular highlights. Some objects don't scatter a lot of light but reflect a lot of light, resulting in a smaller highlight, and some objects scatter a lot and they produce a larger radius highlight. If we want to simulate multiple types of objects in OpenGL, we must define the Material property for each object separately.

## DC.ColorMaterialProperty

### example

```js
let material = new DC.ColorMaterialProperty(DC.Color.RED)
```

### creation

- **_constructor(color)_**

  - parameters
    - `{DC.Color} color`
  - returns `material`

## DC.ImageMaterialProperty

### example

```js
let material = new DC.ImageMaterialProperty({
  image: '**/**.png',
  transparent: true,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `material`

```json
//options(optional)
{
  "image": "",
  "repeat": { "x": 1, "y": 1 },
  "color": DC.Color.WHITE,
  "transparent": false
}
```

### properties

- `{String} image`
- `{Object} repeat`
- `{DC.Color} color`
- `{Boolean} transparent`

## DC.CircleBlurMaterialProperty

### example

```js
let material = new DC.CircleBlurMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.CircleDiffuseMaterialProperty

### example

```js
let material = new DC.CircleDiffuseMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.CircleFadeMaterialProperty

### example

```js
let material = new DC.CircleFadeMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.CirclePulseMaterialProperty

### example

```js
let material = new DC.CirclePulseMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.CircleScanMaterialProperty

### example

```js
let material = new DC.CircleScanMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `material`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.CircleSpiralMaterialProperty

### example

```js
let material = new DC.CircleSpiralMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.CircleVaryMaterialProperty

### example

```js
let material = new DC.CircleVaryMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `material`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.CircleWaveMaterialProperty

### example

```js
let material = new DC.CircleWaveMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `material`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10,
  "count": 5,
  "gradient": 0.1
}
```

### properties

- `{Color} color`
- `{Number} speed`
- `{Number} count`
- `{Number} gradient`

## DC.EllipsoidElectricMaterialProperty

### example

```js
let material = new DC.EllipsoidElectricMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.EllipsoidTrailMaterialProperty

### example

```js
let material = new DC.EllipsoidTrailMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.PolylineDashMaterialProperty

### example

```js
let material = new DC.PolylineDashMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "gapColor": DC.Color.TRANSPARENT,
  "dashLength": 16.0
}
```

### properties

- `{DC.Color} color`
- `{DC.Color} gapColor`
- `{Number} dashLength`

## DC.PolylineArrowMaterialProperty

### example

```js
let material = new DC.PolylineArrowMaterialProperty(DC.Color.WHITE)
```

### creation

- **_constructor(color)_**

  - parameters
    - `{DC.Color} color`
  - returns `materialProperty`

### properties

- `{DC.Color} color`

## DC.PolylineOutlineMaterialProperty

### example

```js
let material = new DC.PolylineOutlineMaterialProperty({
  color: DC.Color.WHITE,
  outlineColor: DC.Color.BLACK,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 1
}
```

### properties

- `{DC.Color} color`
- `{DC.Color} outlineColor`
- `{Number} outlineWidth`

## DC.PolylineGlowMaterialProperty

### example

```js
let material = new DC.PolylineGlowMaterialProperty({
  color: DC.Color.WHITE,
  glowPower: 0.25,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "glowPower": 0.25,
  "taperPower": 1
}
```

### properties

- `{DC.Color} color`
- `{Number} glowPower`
- `{Number} taperPower`

## DC.PolylineFlickerMaterialProperty

### example

```js
let material = new DC.PolylineFlickerMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.PolylineFlowMaterialProperty

### example

```js
let material = new DC.PolylineFlowMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10,
  "percent": 0.3,
  "gradient": 0.1
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`
- `{Number} percent`
- `{Number} gradient`

## DC.PolylineImageTrailMaterialProperty

### example

```js
let material = new DC.PolylineImageTrailMaterialProperty({
  color: DC.Color.WHITE,
  image: '**/*.png',
  repeat: { x: 10, y: 1 },
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10,
  "image": "**/*.png",
  "repeat": { "x": 10, "y": 1 }
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`
- `{String} image`
- `{Object} repeat`

## DC.PolylineLightingMaterialProperty

### example

```js
let material = new DC.PolylineLightingMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE
}
```

### properties

- `{DC.Color} color`

## DC.PolylineLightingTrailMaterialProperty

### example

```js
let material = new DC.PolylineLightingTrailMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.PolylineTrailMaterialProperty

### example

```js
let material = new DC.PolylineTrailMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.RadarLineMaterialProperty

### example

```js
let material = new DC.RadarLineMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.RadarWaveMaterialProperty

### example

```js
let material = new DC.RadarWaveMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.WallImageTrailMaterialProperty

### example

```js
let material = new DC.WallImageTrailMaterialProperty({
  color: DC.Color.WHITE,
  image: '**/*.png',
  repeat: { x: 10, y: 1 },
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `materialProperty`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10,
  "image": "**/*.png",
  "repeat": { "x": 10, "y": 1 }
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`
- `{String} image`
- `{Object} repeat`

## DC.WallTrailMaterialProperty

### example

```js
let material = new DC.WallTrailMaterialProperty({
  color: DC.Color.WHITE,
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `material`

```json
// options(optional)
{
  "color": DC.Color.WHITE,
  "speed": 10
}
```

### properties

- `{DC.Color} color`
- `{Number} speed`

## DC.WaterMaterialProperty

### example

```js
let material = new DC.WaterMaterialProperty({
  baseWaterColor: DC.Color.WHITE,
  normalMap: '**/**.png',
})
```

### creation

- **_constructor([options])_**

  - parameters
    - `{Object} options`
  - returns `material`

```json
// options(optional)
{
  "baseWaterColor": DC.Color.WHITE,
  "blendColor": DC.Color.WHITE,
  "specularMap": "",
  "normalMap": "",
  "frequency": 1000,
  "animationSpeed": 0.03,
  "amplitude": 10,
  "specularIntensity": 10
}
```

### properties

- `{DC.Color} baseWaterColor`
- `{DC.Color} blendColor`
- `{String} normalMap`
- `{String} specularMap`
