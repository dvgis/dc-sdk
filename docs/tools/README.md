---
sidebar: auto
---

# Tools 🌎

Auxiliary tools in 3D scenes to facilitate various measurements and markings in the scene

## DC.Plot

> PLot Tool

### example

```js
let plot = new DC.Plot(viewer, {})
plot.draw(DC.OverlayType.POINT, (overlay) => {}, {})
```

### creation

- **_constructor(viewer,[options])_**

  - parameters
    - `{Viewer} viewer`：场景
    - `{Object} options`：属性
  - returns `plot`

```json
// options(optional)
{
  "icon_center": "**.png",
  "icon_anchor": "**.png",
  "icon_midAnchor": "**.png",
  "icon_size": [12, 12],
  "clampToModel":false
}
```

### methods

- **_draw(type,callback,[style],[clampToModel])_**

  - parameters
    - `{String} type` [OverlayType](../base/#overlaytype)
    - `{Function} callback`
    - `{Object} style`
    - `{Boolean} clampToModel`: Whether the point gets the surface coordinates, if false, it will get the current 3D coordinates of the mouse
  - returns `this`

- **_edit(overlay,callback,[clampToModel])_**

  - parameters
    - `{Overlay} overlay`
    - `{Function} callback`
    - `{Boolean} clampToModel`: Whether the point gets the surface coordinates, if false, it will get the current 3D coordinates of the mouse
  - returns `this`

- **_stop()_**

  - returns `this`

## DC.PositionEditor

> Position Editor Tool

### example

```js
let positionEditor = new DC.PositionEditor(viewer)
```

### creation

- **_constructor(viewer,[options])_**

  - parameters
    - `{Viewer} viewer`
    - `{Object} options`
  - returns `positionEditor`

```json
// options(optional)
{
  "arrow": true, // whether the auxiliary axis is an arrow
  "width": 8, // auxiliary axis width
  "depthFail": true, // whether the auxiliary axis supports depth test
  "axisLineScale": 1 // auxiliary axis scale
}
```

### properties

- `{Overlay} overlay` **_`readonly`_**

### methods

- **_activate(type, callback)_**

  - parameters
    - `{String} type`
    - `{Function} callback` parameter ：position
  - returns `this`

- **_deactivate()_**

  - returns `this`

## DC.ModelManager

> Model Manager Tool

### example

```js
let manager = new DC.ModelManager(viewer, layer.getOverlays())
```

### creation

- **_constructor(viewer,models,[options])_**

  - parameters
    - `{Viewer} viewer`
    - `{Array} models`
    - `{Object} options`
  - returns `manager`

```json
// options(optional)
{
  "disappearHeight": 1000,
  "disappearSeconds": 0.5,
  "appearSeconds": 0.5
}
```

### properties

- `{Array} models`

### methods

- **_spread(height, seconds)_**

  - parameters
    - `{Number} height`
    - `{Number} seconds`
  - returns `this`

- **_combine(seconds)_**

  - parameters
    - `{Number} seconds`
  - returns `this`

- **_showModel(modelIndex)_**

  - parameters
    - `{Number} modelIndex`
  - returns `this`

- **_restore()_**

  - returns `this`
