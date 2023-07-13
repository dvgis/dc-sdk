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
