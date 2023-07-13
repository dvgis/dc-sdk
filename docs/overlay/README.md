---
sidebar: auto
---

# Overlays 🌎

An important part of the 3D scene, digitally representing an entity in the three scenes and recording its real-time state

## Overlay

> base class

:::warning
The class cannot be instantiated
:::

### properties

- `{String} overlayId` **_`readonly`_**
- `{String} id`
- `{Boolean} show`
- `{Object} attr`
- `{Array} contextMenu`
- `{String} state` **_`readonly`_**
- `{String} type` **_`readonly`_**
- `{Boolean} allowDrillPicking`：Default is false, if true, the overlay selects all the overlays behind it for penetration and triggers a mouse thing for all the overlays behind it 件

### methods

- **_addTo(layer)_**

  - parameters
    - `{Layer} layer`
  - returns `this`

- **_remove()_**

  - returns `this`

- **_setLabel(text, textStyle)_**

  - parameters
    - `{String} text`
    - `{String} textStyle` [DC.Label](#dc-label)
  - returns `this`

:::warning
This function is only valid for the following overlays：Point、Circle、Polygon、Billboard、Ellipse、Rectangle
:::

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

- **_getOverlayType(type)_**

  - parameters
    - `{String} type`
  - returns `string`

## DC.Point

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let point = new DC.Point(position)
point.setStyle({
  pixelSize: 10,
})
```

### creation

- **_constructor(position)_**

  - parameters
    - `{Position|String|Array|Object} position`
  - returns `point`

### properties

- `{Position|String|Array|Object} position`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [PointGraphics](http://resource.dvgis.cn/cesium-docs/PointGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "pixelSize": 1,
  "heightReference": 0,
  "color": DC.Color.WHITE,
  "outlineColor": DC.Color.WHITE,
  "outlineWidth": 0,
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

- **_fromEntity(entity)_**

  - parameters
    - `{Object} entity`
  - returns `point`

## DC.Polyline

> Inherited from [Overlay](#overlay)

### example

```js
let polyline = new DC.Polyline('120,20;120,30')
polyline.setStyle({
  width: 10,
})
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `polyline`

### properties

- `{String|Array<Position|Number|String|Object>} positions`
- `{DC.Position} center` **_`readonly`_**
- `{Number} distance` **_`readonly`_**

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [PolylineGraphics](http://resource.dvgis.cn/cesium-docs/PolylineGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "width": 1,
  "material": DC.Color.WHITE,
  "clampToGround": false,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "classificationType": 2,
  "zIndex": 0
}
```

- **_fromEntity(entity)_**

  - parameters
    - `{Object} entity`
  - returns `polyline`

## DC.Polygon

> Inherited from [Overlay](#overlay)

### example

```js
let polygon = new DC.Polygon('120,20;120,30;122,30')
polygon.setStyle({
  height: 10,
})
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `polygon`

### properties

- `{String|Array<Position|Number|String|Object>} positions`
- `{String|Array<Position|Number|String|Object>} holes`
- `{DC.Position} center` **_`readonly`_**
- `{Number} area` **_`readonly`_**

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [PolygonGraphics](http://resource.dvgis.cn/cesium-docs/PolygonGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "height": 1,
  "heightReference": 0,
  "extrudedHeight": 0,
  "stRotation": 0,
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "closeTop": true,
  "closeBottom": true,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "classificationType": 2,
  "zIndex": 0
}
```

- **_fromEntity(entity)_**

  - parameters
    - `{Object} entity`
  - returns `polygon`

## DC.Billboard

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let billboard = new DC.Billboard(position, '***/**.png')
billboard.size = [20, 20]
```

### creation

- **_constructor(position,icon)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} icon`
  - returns `billboard`

### properties

- `{Position|String|Array|Object} position`
- `{String} icon`
- `{Array<Number>} size`: [width,height]

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [BillboardGraphics](http://resource.dvgis.cn/cesium-docs/BillboardGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "scale": 1,
  "pixelOffset": { "x": 0, "y": 0 },
  "rotation": 0,
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

- **_fromEntity(entity)_**

  - parameters
    - `{Object} entity`：
  - returns `billboard`

## DC.Label

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let Label = new DC.Label(position, 'test')
```

### creation

- **_constructor(position,text)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} text`
  - returns `label`

### properties

- `{Position|String|Array|Object} position`
- `{String} text`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [LabelGraphics](http://resource.dvgis.cn/cesium-docs/LabelGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "font": "30px sans-serif",
  "scale": 1,
  "pixelOffset": { "x": 0, "y": 0 },
  "heightReference": 0,
  "showBackground": false,
  "backgroundColor": DC.Color.BLACK,
  "backgroundPadding": { "x": 0, "y": 0 },
  "fillColor": DC.Color.BLACK,
  "outlineColor": DC.Color.WHITE,
  "outlineWidth": 0,
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

- **_fromEntity(entity,text)_**

  - parameters
    - `{Object} entity`
    - `{String} text`
  - returns `label`

## DC.Circle

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let circle = new DC.Circle(position, 200)
```

### creation

- **_constructor(center, radius)_**

  - parameters
    - `{Position|String|Array|Object} center`
    - `{String} radius`
  - returns `billboard`

### properties

- `{Position|String|Array|Object} center`
- `{String} radius`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [EllipseGraphics](http://resource.dvgis.cn/cesium-docs/EllipseGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "height": 1,
  "heightReference": 0,
  "extrudedHeight": 0,
  "rotation": 0,
  "stRotation": 0,
  "fill": true, s
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "classificationType": 2,
  "zIndex": 0
}
```

## DC.Rectangle

> 矩形要素，继承于[Overlay](#overlay)

### example

```js
let rectangle = new DC.Rectangle('-90.0,32.0;-94.0,36.0;')
```

### creation

- **_constructor(positions)_**

  构造函数

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`：坐标串
  - returns `rectangle`

### properties

- `{String|Array<Position|Number|String|Object>} positions`：坐标串

### methods

- **_setStyle(style)_**

  设置样式

  - parameters
    - `{Object} style`：样式，详情参考：[RectangleGraphics](http://resource.dvgis.cn/cesium-docs/RectangleGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "height": 1, //高度
  "heightReference": 0, //高度参照，0：位置无参照，位置是绝对的，1：位置固定在地形上 2：位置高度是指地形上方的高度。
  "extrudedHeight": 0, //拉升高度
  "rotation": 0, //顺时针旋转角度
  "stRotation": 0, //逆时针旋转角度
  "fill": true, //是否用提供的材料填充多边形。
  "material": DC.Color.WHITE, //材质
  "outline": false, //是否显示边框
  "outlineColor": DC.Color.BLACK, //边框颜色
  "outlineWidth": 0, //边框宽度
  "shadows": 0, //阴影类型，0：禁用、1：启用 、2：投射、3：接受
  "distanceDisplayCondition": {
    "near": 0, //最近距离
    "far": Number.MAX_VALUE //最远距离
  }, //根据距离设置可见
  "classificationType": 2, //分类 是否影响地形，3D切片或同时影响这两者。0:地形、1:3D切片、2：两者
  "zIndex": 0 //层级
}
```

## DC.Wall

> 墙体要素，继承于[Overlay](#overlay)

### example

```js
let wall = new DC.Wall('-90.0,32.0,1000;-94.0,36.0,1000;')
```

### creation

- **_constructor(positions)_**

  构造函数

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`：坐标串
  - returns `wall`

### properties

- `{String|Array<Position|Number|String|Object>} positions`：坐标串

### methods

- **_setStyle(style)_**

  设置样式

  - parameters
    - `{Object} style`：样式，详情参考：[WallGraphics](http://resource.dvgis.cn/cesium-docs/WallGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "fill": true, //是否用提供的材料填充多边形。
  "material": DC.Color.WHITE, //材质
  "outline": false, //是否显示边框
  "outlineColor": DC.Color.BLACK, //边框颜色
  "outlineWidth": 0, //边框宽度
  "shadows": 0, //阴影类型，0：禁用、1：启用 、2：投射、3：接受
  "distanceDisplayCondition": {
    "near": 0, //最近距离
    "far": Number.MAX_VALUE //最远距离
  }, //根据距离设置可见
  "classificationType": 2 //分类 是否影响地形，3D切片或同时影响这两者。0:地形、1:3D切片、2：两者
}
```

- **_fromEntity(entity)_**

  Entity 转换为 Overlay

  - parameters
    - `{Object} entity`：Cesium 覆盖物
  - returns `wall`

## DC.Model

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let model = new DC.Model(position, '**/**.glb')
```

### creation

- **_constructor(position, modelUrl)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} modelUrl`
  - returns `model`

### properties

- `{Position|String|Array|Object} position`
- `{String} modelUrl`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [ModelGraphics](http://resource.dvgis.cn/cesium-docs/ModelGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "scale": 1,
  "minimumPixelSize": 0,
  "maximumScale": 0,
  "heightReference": 0,
  "shadows": 0,
  "silhouetteColor": DC.Color.RED,
  "silhouetteSize": 0,
  "lightColor": DC.Color.RED,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

- **_fromEntity(entity,modelUrl)_**

  - parameters
    - `{Object} entity`
    - `{String} modelUrl`
  - returns `model`

## DC.Tileset

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let tileset = new DC.Tileset('**/tileset.json')
tileset.setPosition(position)
```

### creation

- **_constructor(url,[options])_**

  - parameters
    - `{String} url`
    - `{Object} options` [Tileset](http://resource.dvgis.cn/cesium-docs/Cesium3DTileset.html)
  - returns `tileset`

### properties

-`{Promise} readyPromise`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [TileStyle](https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling)
  - returns `this`

  ```js
  let style = new DC.TilesetStyle({
    color: {
      conditions: [
        ['${Height} >= 100', 'color("purple", 0.5)'],
        ['${Height} >= 50', 'color("red")'],
        ['true', 'color("blue")'],
      ],
    },
    show: '${Height} > 0',
  })
  ```

- **_setPosition(position)_**

  - parameters
    - `{Position|Array|String} position`
  - returns `this`

- **_setHeadingPitchRoll(heading, pitch, roll)_**

  - parameters
    - `{Number} heading`
    - `{Number} pitch`
    - `{Number} roll`
  - returns `this`

- **_setHeight(height,isAbsolute)_**

  - parameters
    - `{Number} height`
    - `{Boolean} isAbsolute`
  - returns `this`

- **_setScale(scale)_**

  - parameters
    - `{Number} scale`
  - returns `this`

- **_setCustomShader(customShader)_**

  - parameters
    - `{String} customShader`
  - returns `this`

- **_setProperties(properties)_**

  - parameters
    - `{Array<Object>} properties`
  - returns `this`

```json
{
  "key": "name",
  "keyValue": "1",
  "propertyName": "highlight",
  "propertyValue": true
}
```

## DC.DivIcon

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let divIcon = new DC.DivIcon(position, '<div></div>')
```

### creation

- **_constructor(position, content)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String|Element} content`
  - returns `divIcon`

### properties

- `{Position|String|Array|Object} position`
- `{String|Element} content` **_`writeonly`_**

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "className": "test",
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

- **_fromEntity(entity,content)_**

  - parameters
    - `{Object} entity`
    - `{String|Element} content`
  - returns `divIcon`

## DC.Box

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let box = new DC.Box(position, 20, 30, 40)
```

### creation

- **_constructor(position, length, width, height)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{Number} length`
    - `{Number} width`
    - `{Number} height`
  - returns `box`

### properties

- `{Position|String|Array|Object} position`
- `{Number} length`
- `{Number} width`
- `{Number} height`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [BoxGraphics](http://resource.dvgis.cn/cesium-docs/BoxGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

## DC.Corridor

> Inherited from [Overlay](#overlay)

### example

```js
let corridor = new DC.Corridor('120,20;120,30')
corridor.setStyle({
  width: 10,
})
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `corridor`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [CorridorGraphics](http://resource.dvgis.cn/cesium-docs/CorridorGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "width": 1,
  "height": 0,
  "heightReference": 0,
  "cornerType": 0,
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "classificationType": 2,
  "zIndex": 0
}
```

- **_fromEntity(entity)_**

  - parameters
    - `{Object} entity`
  - returns `corridor`

## DC.Cylinder

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let cylinder = new DC.Cylinder(position, 20, 30, 40)
```

### creation

- **_constructor(position, length, topRadius, bottomRadius)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{Number} length`
    - `{Number} topRadius`
    - `{Number} bottomRadius`
  - returns `cylinder`

### properties

- `{Position|String|Array|Object} position`
- `{Number} length`
- `{Number} topRadius`
- `{Number} bottomRadius`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [CylinderGraphics](http://resource.dvgis.cn/cesium-docs/CylinderGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

## DC.Ellipse

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let ellipse = new DC.Ellipse(position, 20, 30)
```

### creation

- **_constructor(position, semiMajorAxis, semiMinorAxis)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{Number} semiMajorAxis`
    - `{Number} semiMinorAxis`
  - returns `ellipse`

### properties

- `{Position|String|Array|Object} position`
- `{Number} semiMajorAxis`
- `{Number} semiMinorAxis`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [EllipseGraphics](http://resource.dvgis.cn/cesium-docs/EllipseGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "height": 1,
  "heightReference": 0,
  "extrudedHeight": 0,
  "rotation": 0,
  "stRotation": 0,
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "classificationType": 2,
  "zIndex": 0
}
```

## DC.Ellipsoid

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let ellipsoid = new DC.Ellipsoid(position, { x: 30, y: 30, z: 30 })
```

### creation

- **_constructor(position, radius)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{Object} radius`：{x: 30, y: 30, z: 30}
  - returns `ellipsoid`

### properties

- `{Position|String|Array|Object} position`
- `{Object} radius`：{x: 30, y: 30, z: 30}

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [EllipsoidGraphics](http://resource.dvgis.cn/cesium-docs/EllipsoidGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

## DC.Plane

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let plane = new DC.Plane(position, 20, 30, { normal: 'x' })
```

### creation

- **_constructor(position, width, height, direction)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{Number} width`
    - `{Number} height`
    - `{Object} plane`
  - returns `plane`

```json
// plane
{
  "normal": "x",
  "distance": 0
}
```

### properties

- `{Position|String|Array|Object} position`
- `{Number} width`
- `{Number} height`
- `{Number} distance`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [PlaneGraphics](http://resource.dvgis.cn/cesium-docs/PlaneGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

## DC.PolylineVolume

> Inherited from [Overlay](#overlay)

### example

```js
function computeCircle(radius) {
  var positions = []
  for (var i = 0; i < 360; i++) {
    var radians = DC.Math.toRadians(i)
    positions.push({
      x: radius * Math.cos(radians),
      y: radius * Math.sin(radians),
    })
  }
  return positions
}

let polylineVolume = new DC.PolylineVolume(
  '-90.0,32.0,0.0;-90.0,36.0,100000.0;-94.0,36.0,0.0;',
  computeCircle(60000)
)
```

### creation

- **_constructor(positions, shape)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
    - `{Array} shape`
  - returns `polylineVolume`

### properties

- `{String|Array<Position|Number|String|Object>} positions`
- `{Array} shape`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [PolylineVolumeGraphics](http://resource.dvgis.cn/cesium-docs/PolylineVolumeGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "cornerType": 0,
  "fill": true,
  "material": DC.Color.WHITE,
  "outline": false,
  "outlineColor": DC.Color.BLACK,
  "outlineWidth": 0,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

- **_fromEntity(entity)_**

  - parameters
    - `{Object} entity`
  - returns `polylineVolume`

## DC.DynamicBillboard

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let billboard = new DC.DynamicBillboard(position, '***/**.png')
billboard.size = [20, 20]
```

### creation

- **_constructor(position,icon)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} icon`
  - returns `billboard`

### properties

- `{Position} position` **_`readonly`_**
- `{String} icon`
- `{Array<Number>} size`

### methods

- **_addPosition(position,interval)_**

  - parameters
    - `{Position|Array|String|Object} position`
    - `{Number} interval`
  - return's `this`

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [BillboardGraphics](http://resource.dvgis.cn/cesium-docs/BillboardGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "scale": 1,
  "pixelOffset": { "x": 0, "y": 0 },
  "rotation": 0,
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

## DC.DynamicModel

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let model = new DC.DynamicModel(position, '**/**.glb')
```

### creation

- **_constructor(position, modelUrl)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} modelUrl`
  - returns `model`

### properties

- `{Position} position` **_`readonly`_**
- `{String} modelUrl`

### methods

- **_addPosition(position,interval)_**

  - parameters
    - `{Position|Array|String|Object} position`
    - `{Number} interval`
  - returns `this`

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [ModelGraphics](http://resource.dvgis.cn/cesium-docs/ModelGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "scale": 1,
  "minimumPixelSize": 0,
  "maximumScale": 0,
  "heightReference": 0,
  "shadows": 0,
  "silhouetteColor": DC.Color.RED,
  "silhouetteSize": 0,
  "lightColor": DC.Color.RED,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

## DC.CustomBillboard

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let billboard = new DC.CustomBillboard(position, '***/**.png')
billboard.size = [20, 20]
```

### creation

- **_constructor(position,icon)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} icon`
  - returns `billboard`

### properties

- `{Position|String|Array|Object} position`
- `{String} icon`
- `{Array<Number>} size`

### methods

- **_setVLine(style)_**

  - parameters
    - `{Object} style` [PolylineGraphics](http://resource.dvgis.cn/cesium-docs/PolylineGraphics.html)
  - returns `this`

- **_setBottomCircle(radius,style,rotateAmount)_**

  - parameters
    - `{Number} radius`
    - `{Object} style` [EllipseGraphics](http://resource.dvgis.cn/cesium-docs/EllipseGraphics.html)
    - `{Number} rotateAmount`
  - returns `this`

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [BillboardGraphics](http://resource.dvgis.cn/cesium-docs/BillboardGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "scale": 1,
  "pixelOffset": { "x": 0, "y": 0 },
  "rotation": 0,
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

## DC.CustomLabel

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let label = new DC.CustomLabel(position, 'test')
```

### creation

- **_constructor(position,text)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} text`
  - returns `label`

### properties

- `{Position|String|Array|Object} position`
- `{String} text`

### methods

- **_setVLine(style)_**

  - parameters
    - `{Object} style` [PolylineGraphics](http://resource.dvgis.cn/cesium-docs/PolylineGraphics.html)
  - returns `this`

- **_setBottomCircle(radius,style,rotateAmount)_**

  - parameters
    - `{Number} radius`
    - `{Object} style` [EllipseGraphics](http://resource.dvgis.cn/cesium-docs/EllipseGraphics.html)
    - `{Number} rotateAmount`
  - returns `this`

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [LabelGraphics](http://resource.dvgis.cn/cesium-docs/LabelGraphics.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "scale": 1,
  "pixelOffset": { "x": 0, "y": 0 },
  "rotation": 0,
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

## DC.AttackArrow

> Inherited from [Overlay](#overlay)

### example

```js
let attackArrow = new DC.AttackArrow('-90.0,32.0;-94.0,36.0;-94.0,38.0')
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `attackArrow`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Polygon](#dc-polygon)
  - returns `this`

## DC.DoubleArrow

> Inherited from [Overlay](#overlay)

### example

```js
let doubleArrow = new DC.DoubleArrow('-90.0,32.0;-94.0,36.0;-94.0,38.0')
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `doubleArrow`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Polygon](#dc-polygon)
  - returns `this`

## DC.FineArrow

> Inherited from [Overlay](#overlay)

### example

```js
let fineArrow = new DC.FineArrow('-90.0,32.0;-94.0,36.0')
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `fineArrow`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Polygon](#dc-polygon)
  - returns `this`

## DC.GatheringPlace

> Inherited from [Overlay](#overlay)

### example

```js
let gatheringPlace = new DC.GatheringPlace('-90.0,32.0;-94.0,36.0')
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `gatheringPlace`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Polygon](#dc-polygon)
  - returns `this`

## DC.TailedAttackArrow

> Inherited from [Overlay](#overlay)

### example

```js
let tailedAttackArrow = new DC.TailedAttackArrow('-90.0,32.0;-94.0,36.0')
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `tailedAttackArrow`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`：[Polygon](#dc-polygon)
  - returns `this`

## DC.BillboardPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let billboard = new DC.BillboardPrimitive(position, '***/**.png')
billboard.size = [20, 20]
```

### creation

- **_constructor(position,icon)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} icon`
  - returns `billboard`

### properties

- `{Position|String|Array|Object} position`
- `{String} icon`
- `{Array<Number>} size`: [width,height]

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Billboard](http://resource.dvgis.cn/cesium-docs/Billboard.html)
  - returns `this`

```json
// style(optional)
{
  "heightReference": 0,
  "scale": 1,
  "pixelOffset": { "x": 0, "y": 0 },
  "rotation": 0,
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

## DC.BounceBillboardPrimitive

> Inherited from [BillboardPrimitive](#dc-billboardprimitive)

### example

```js
let position = new DC.Position(120, 20)
let billboard = new DC.BounceBillboardPrimitive(position, '***/**.png')
billboard.size = [20, 20]
```

### creation

- **_constructor(position,icon)_**

  - parameters
    - `{Position|Number|String|Object} position`
    - `{String} icon`
  - returns `billboard`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Billboard](http://resource.dvgis.cn/cesium-docs/Billboard.html)
  - returns `this`

```json
// style(optional)
{
  "maxOffsetY": 10, //Maximum translation in vertical direction
  "offsetAmount": 0.1 //Vertical panning per frame
  // Other styles refer to BillboardPrimitive style
}
```

## DC.DiffuseWallPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let wall = new DC.DiffuseWallPrimitive(position, 2000, 1000)
```

### creation

- **_constructor(center, radius, height)_**

  - parameters
    - `{Position|Number|String|Object} center`
    - `{Number} radius`
    - `{Number} height`
  - returns `wall`

### properties

- `{Position|Number|String|Object} center`
- `{Number} radius`
- `{Number} height`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "minRadius": 10,
  "minHeight": 30,
  "color": DC.Color.RED,
  "slices": 128,
  "speed": 10
}
```

## DC.ElecEllipsoidPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let elecEllipsoid = new DC.ElecEllipsoidPrimitive('120,20',{x:2000,y:2000:z:2000})
```

### creation

- **_constructor(center,radius)_**

  - parameters
    - `{String|Position|Array|Object} center`
    - `{Object} radius`: {x:100,y:100,z:100}
  - returns `elecEllipsoidPrimitive`

### properties

- `{String|Position|Array|Object} center`
- `{Object} radius`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "speed": 5,
  "color": DC.Color.WHITE
}
```

## DC.FlowLinePrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let flowLinePrimitive = new DC.FlowLinePrimitive('120,20;120,30;122,30')
```

### creation

- **_constructor(positions,[asynchronous])_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `flowLinePrimitive`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "speed": 5,
  "color": DC.Color.WHITE,
  "percent": 0.3,
  "gradient": 0.1
}
```

## DC.LabelPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let label = new DC.LabelPrimitive(position, 'test')
```

### creation

- **_constructor(position,text)_**

  - parameters
    - `{Position|String|Array|Object} position`
    - `{String} text`
  - returns `label`

### properties

- `{Position|String|Array|Object} position`
- `{String} text`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Labels](http://resource.dvgis.cn/cesium-docs/Label.html)
  - returns `this`

```json
// style(optional)
{
  "font": "30px sans-serif",
  "scale": 1,
  "pixelOffset": { "x": 0, "y": 0 },
  "heightReference": 0,
  "showBackground": false,
  "backgroundColor": DC.Color.BLACK,
  "backgroundPadding": { "x": 0, "y": 0 },
  "fillColor": DC.Color.BLACK,
  "outlineColor": DC.Color.WHITE,
  "outlineWidth": 0,
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

## DC.LightCylinderPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let cylinder = new DC.LightCylinderPrimitive(position, 1000,1,100)
```

### creation

- **_constructor(center, length, topRadius, bottomRadius)_**

  - parameters
    - `{Position|String|Array|Object} center`
    - `{Number} length`
    - `{Number} topRadius`
    - `{Number} bottomRadius`
  - returns `cylinder`

### properties

- `{Position|String|Array|Object} center`
- `{Number} length`
- `{Number} topRadius`
- `{Number} bottomRadius`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` 
  - returns `this`

```json
// style(optional)
{
  "color": DC.Color.BLACK
}
```

## DC.BounceLabelPrimitive

> Inherited from [LabelPrimitive](#dc-labelprimitive)

### example

```js
let position = new DC.Position(120, 20)
let label = new DC.BounceLabelPrimitive(position, 'test')
```

### creation

- **_constructor(position,text)_**

  - parameters
    - `{Position|Number|String|Object} position`
    - `{String} text`
  - returns `label`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Label](http://resource.dvgis.cn/cesium-docs/Label.html)
  - returns `this`

```json
// style(optional)
{
  "maxOffsetY": 10, //Maximum translation in vertical direction
  "offsetAmount": 0.1 //Vertical panning per frame
  // Other styles refer to LabelPrimitive style
}
```

## DC.ModelPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let model = new DC.ModelPrimitive(position, '**/**.glb')
```

### creation

- **_constructor(position, modelUrl)_**

  - parameters
    - `{Position|Number|String|Object} position`
    - `{String} modelUrl`
  - returns `model`

### properties

- `{Position|Number|String|Object} position`
- `{String} modelUrl`
- `{Promise} readyPromise` **_`readonly`_**

### methods

- **_getMaterial(name)_**

  - parameters
    - `{String} name`
  - returns `modelMaterial`

- **_getMesh(name)_**

  - parameters
    - `{String} name`
  - returns `modelMesh`

- **_getNode(name)_**

  - parameters
    - `{String} name`
  - returns `modelNode`

- **_getNodes()_**

  - returns `array<ModelNode>`

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Model](http://resource.dvgis.cn/cesium-docs/Model.html)
  - returns `this`

```json
// style(optional)
{
  "scale": 1,
  "minimumPixelSize": 0,
  "maximumScale": 0,
  "heightReference": 0,
  "shadows": 0,
  "silhouetteColor": DC.Color.RED,
  "silhouetteSize": 0,
  "lightColor": DC.Color.RED,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

## DC.ModelCollectionPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let positions = '120,20;120,30;122,30'
let model = new DC.ModelCollectionPrimitive(positions, '**/**.glb')
```

### creation

- **_constructor(positions, modelUrl)_**

  - parameters
    - `{Array<Position|String|Object>} positions`
    - `{String} modelUrl`
  - returns `model`

### properties

- `{Array<Position|String|Object>} positions`
- `{String} modelUrl`
- `{Array<Object>} attrs`
- `{Promise} readyPromise` **_`readonly`_**

### methods

- **_getModelInstance(instanceId)_**

  - parameters
    - `{String} instanceId`：Instance ID, the default is the index of the instance, which can be obtained through mouse events
  - returns `modelInstance`

- **_getAttrByInstanceId(instanceId)_**

  - parameters
    - `{String} instanceId`：Instance ID, the default is the index of the instance, which can be obtained through mouse events
  - returns `Object`

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Model](http://resource.dvgis.cn/cesium-docs/Model.html)
  - returns `this`

```json
// style(optional)
{
  "scale": 1,
  "minimumPixelSize": 0,
  "maximumScale": 0,
  "heightReference": 0,
  "shadows": 0,
  "silhouetteColor": DC.Color.RED,
  "silhouetteSize": 0,
  "lightColor": DC.Color.RED,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  }
}
```

## DC.PointPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let position = new DC.Position(120, 20)
let point = new DC.PointPrimitive(position)
point.setStyle({
  pixelSize: 10,
})
```

### creation

- **_constructor(position)_**

  - parameters
    - `{Position|Number|String|Object} position`：坐标
  - returns `point`

### properties

- `{Position|Number|String|Object} position`：坐标

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Point](http://resource.dvgis.cn/cesium-docs/Point.html)
  - returns `this`

```json
// style(optional)
{
  "pixelSize": 1,
  "heightReference": 0,
  "color": DC.Color.WHITE,
  "outlineColor": DC.Color.WHITE,
  "outlineWidth": 0,
  "scaleByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "translucencyByDistance": {
    "near": 0,
    "nearValue": 0,
    "far": 1,
    "farValue": 0
  },
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "disableDepthTestDistance": 0
}
```

## DC.PolylinePrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let polyline = new DC.PolylinePrimitive('120,20;120,30')
polyline.setStyle({
  width: 10,
})
```

### creation

- **_constructor(positions)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `polyline`

### properties

- `{String|Array<Position|Number|String|Object>} positions`
- `{Position} center` **_`readonly`_**
- `{Number} distance` **_`readonly`_**

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style` [Polyline](http://resource.dvgis.cn/cesium-docs/Polyline.html)
  - returns `this`

```json
// style(optional)
{
  "width": 1,
  "material": DC.Color.WHITE,
  "clampToGround": false,
  "shadows": 0,
  "distanceDisplayCondition": {
    "near": 0,
    "far": Number.MAX_VALUE
  },
  "classificationType": 2,
  "zIndex": 0
}
```

## DC.ScanCirclePrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let scanCirclePrimitive = new DC.ScanCirclePrimitive('120,20', 1000)
```

### creation

- **_constructor(position,radius)_**

  - parameters
    - `{String|Position|Array|Object} position`
    - `{Number} radius`
  - returns `scanCirclePrimitive`

### properties

- `{String|Position|Array|Object} position`
- `{Number} radius`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "speed": 5,
  "color": DC.Color.WHITE
}
```

## DC.TrailLinePrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let trailLinePrimitive = new DC.TrailLinePrimitive('120,20;120,30;122,30')
```

### creation

- **_constructor(positions,[asynchronous])_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
  - returns `trailLinePrimitive`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "speed": 5,
  "color": DC.Color.WHITE
}
```

## DC.WaterPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let water = new DC.WaterPrimitive('120,20;120,30;122,30')
water.setStyle({
  baseWaterColor: DC.Color.AQUA.withAlpha(0.3),
  normalMap: 'examples/images/icon/waterNormalsSmall.jpg',
  frequency: 1000.0,
  animationSpeed: 0.01,
  amplitude: 10,
  specularIntensity: 10,
})
```

### creation

- **_constructor(positions,[holes])_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
    - `{Array<Position|Number|String|Object>} holes`
  - returns `water`

### properties

- `{String|Array<Position|Number|String|Object>} positions`

### methods

- **_setStyle(style)_**

  - parameters
    - `{Object} style`
  - returns `this`

```json
// style(optional)
{
  "height": 1,
  "extrudedHeight": 0,
  "stRotation": 0,
  "outline": false,
  "closeTop": true,
  "closeBottom": true,
  "classificationType": 2,
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

## DC.VideoPrimitive

> Inherited from [Overlay](#overlay)

### example

```js
let videoEl = new document.getElementById('video')
let videoPrimitive = new DC.VideoPrimitive('120,20;120,30;122,30', videoEl)
```

### creation

- **_constructor(positions,video)_**

  - parameters
    - `{String|Array<Position|Number|String|Object>} positions`
    - `{Element} video`
  - returns `videoPrimitive`

### properties

- `{String|Array<Position|Number|String|Object>} positions`
- `{Element} video`
