---
sidebar: auto
---

# 实用工具 🌎

三维场景中的辅助工具，方便在场景中进行各种测量、标绘、位置编辑

## DC.Plot

> 标绘类

### example

```js
let plot = new DC.Plot(viewer, {})
plot.draw(DC.OverlayType.POINT, (overlay) => {}, {})
```

### creation

- **_constructor(viewer,[options])_**

  构造函数

  - 参数
    - `{Viewer} viewer`：场景
    - `{Object} options`：属性
  - 返回值 `plot`

```json
//属性参数(可选)
{
  "icon_center": "**.png", // 自定义的中心点图标
  "icon_anchor": "**.png", //自定义的锚点图标
  "icon_midAnchor": "**.png", //自定义的中心锚点图标
  "icon_size": [12, 12],//自定义的中心锚点大小
  "clampToModel":false // 点位是否获取模型表面坐标
}
```

### methods

- **_draw(type,callback,[style],[clampToModel])_**

标绘

- 参数
  - `{String} type`：覆盖物类型，参照 [OverlayType](../base/#overlaytype)
  - `{Function} callback`：标绘完成的回调函数，参数为覆盖物
  - `{Object} style`：标绘的覆盖物样式设置
  - `{Boolean} clampToModel`：点位是否获取模型表面坐标
- 返回值 `this`

- **_edit(overlay,callback,[clampToModel])_**

编辑

- 参数
  - `{Overlay} overlay`：覆盖物
  - `{Function} callback`：编辑完成的回调函数，参数为覆盖物
  - `{Boolean} clampToModel`：点位是否获取模型表面坐标
- 返回值 `this`

- **_stop()_**

停止

- 返回值 `this`

## DC.PositionEditor

> 位置编辑工具

### example

```js
let coords = new DC.PositionEditor(viewer)
```

### creation

- **_constructor(viewer,[options])_**

  构造函数

  - 参数
    - `{Viewer} viewer`：场景
    - `{Object} options`：属性
  - 返回值 `plot`

```json
//属性参数(可选)
{
  "arrow": true, // 辅助轴线是否为箭头
  "width": 8, // 辅助轴线宽度
  "depthFail": true, // 辅助轴线是否支持深度检测
  "axisLineScale": 1 // 辅助轴线比例
}
```

### properties

- `{Overlay} overlay`：覆盖物 **_`writeOnly`_**

### methods

- **_activate(type, callback)_**

  激活

  - 参数
    - `{String} type`：类型，`DC.PositionEditorType`
    - `{Function} callback`：回调函数，参数为：position
  - 返回值 `this`

- **_deactivate()_**

  失效

  - 返回值 `this`

## DC.ModelManager

> 模型管理工具

### example

```js
let manager = new DC.ModelManager(viewer, layer.getOverlays())
```

### creation

- **_constructor(viewer,models,[options])_**

  构造函数

  - 参数
    - `{Viewer} viewer`：场景
    - `{Array} models`：覆盖物
    - `{Object} options`：属性
  - 返回值 `manager`

```json
//属性参数(可选)
{
  "disappearHeight": 1000, // 消失高度
  "disappearSeconds": 0.5, // 消失时间
  "appearSeconds": 0.5 // 出现时间
}
```

### properties

- `{Array} models`：覆盖物

### methods

- **_spread(height, seconds)_**

  展开

  - 参数
    - `{Number} height`：高度
    - `{Number} seconds`：时间
  - 返回值 `this`

- **_combine(seconds)_**

  合并

  - 参数
    - `{Number} seconds`：时间
  - 返回值 `this`

- **_showModel(modelIndex)_**

  展示模型

  - 参数
    - `{Number} modelIndex`：模型索引，和数组索引一致
  - 返回值 `this`

- **_restore()_**

  还原

  - 返回值 `this`
