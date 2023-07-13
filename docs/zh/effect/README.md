---
sidebar: auto
---

# 效果动画 🌎

在三维场景中添加动态要素，让场景能够动起来，更加贴近真实世界的运行

## DC.Weather

> 天气效果

### example

```js
let weather = new DC.Weather()
viewer.use(weather)
```

### creation

- **_constructor()_**

  构造函数

  - 返回值 `weather`

### properties

- [`{Rain} rain`](#rain)：雨天 **_`readonly`_**
- [`{Snow} snow`](#snow)：雪天 **_`readonly`_**
- [`{Fog} snow`](#fog)：雾天 **_`readonly`_**
- [`{Cloud} cloud`](#cloud)：云 **_`readonly`_**

## Rain

> 雨天效果

### example

```js
viewer.weather.rain.enable = true
viewer.weather.rain.speed = 2
```

### properties

- `{Boolean} enable`：是否启用
- `{Number} speed`：速度

## Snow

> 雪天效果

### example

```js
viewer.weather.snow.enable = true
viewer.weather.snow.speed = 2
```

### properties

- `{Boolean} enable`：是否启用
- `{Number} speed`：速度

## Fog

> 雾天效果

### example

```js
viewer.weather.fog.enable = true
viewer.weather.fog.fogColor = DC.Color.BLACK
```

### properties

- `{Boolean} enable`：是否启用
- `{Color} fogColor`：颜色，
- `{Object} fogByDistance`：距离可见，默认： { near: 10, nearValue: 0, far: 2000, farValue: 1.0 }

## Cloud

> 云效果

### example

```js
viewer.weather.cloud.enable = true
viewer.weather.cloud.rotateAmount = 0.02
```

### properties

- `{Boolean} enable`：是否启用
- `{Number} rotateAmount`：移动增量，可为负数

## DC.Effect

> 效果类

### example

```js
let effect = new DC.Effect()
viewer.use(effect)
```

### creation

- **_constructor()_**

  构造函数

  - 返回值 `effect`

### properties

- [`{BlackAndWhite} blackAndWhite`](#blackandwhite)：黑白 **_`readonly`_**
- [`{Bloom} bloom`](#bloom)：泛光 **_`readonly`_**
- [`{Brightness} brightness`](#brightness)：明亮 **_`readonly`_**
- [`{DepthOfField} depthOfField`](#depthoffield)：景深 **_`readonly`_**
- [`{LensFlare} lensFlare`](#lensflare)：镜头耀斑 **_`readonly`_**
- [`{Night} night`](#night)：夜视 **_`readonly`_**
- [`{Silhouette} silhouette`](#silhouette)：描边 **_`readonly`_**

## BlackAndWhite

> 黑白效果

### example

```js
viewer.effect.blackAndWhite.enable = true
```

### properties

- `{Boolean} enable`：是否启用
- `{Number} gradations`：强度
- `{Array} selected`：设置后期作用的覆盖物

## Bloom

> 泛光效果

### example

```js
viewer.effect.bloom.enable = true
```

### properties

- `{Boolean} enable`：是否启用
- `{Number} contrast`：对比度
- `{Number} brightness`：亮度
- `{Number} glowOnly`：只发光
- `{Number} delta`：Delta
- `{Number} sigma`：Sigma
- `{Number} stepSize`：StepSize
- `{Array} selected`：设置后期作用的覆盖物

## Brightness

> 明亮效果

### example

```js
viewer.effect.brightness.enable = true
```

### properties

- `{Boolean} enable`：是否启用
- `{Number} intensity`：强度
- `{Array} selected`：设置后期作用的覆盖物

## DepthOfField

> 景深效果

### example

```js
viewer.effect.depthOfField.enable = true
```

### properties

- `{Boolean} enable`：是否启用
- `{Number}} focalDistance`：焦距
- `{Number} delta`：Delta
- `{Number} sigma`：Sigma
- `{Number} stepSize`：StepSize
- `{Array} selected`：设置后期作用的覆盖物

## LensFlare

> 镜头耀斑效果

### example

```js
viewer.effect.lensFlare.enable = true
```

### properties

- `{Boolean} enable`：是否启用
- `{Number}} intensity`：强度
- `{Number} distortion`：扭曲度
- `{Number} dirtAmount`：分散度
- `{Number} haloWidth`：光圈宽度
- `{Array} selected`：设置后期作用的覆盖物

## Night

> 夜视效果

### example

```js
viewer.effect.night.enable = true
```

### properties

- `{Boolean} enable`：是否启用
- `{Array} selected`：设置后期作用的覆盖物

## Silhouette

> 描边效果

### example

```js
viewer.effect.silhouette.enable = true
```

### properties

- `{Boolean} enable`：是否启用
- `{Color} color`：颜色
- `{Number} length`：长度
- `{Array} selected`：设置后期作用的覆盖物

## Animation

> 场景动画基类

:::warning
该类无法实例化
:::

### methods

- **_start()_**

  开始动画

  - 返回值 `this`

- **_stop()_**

  停止动画

  - 返回值 `this`

## DC.AroundPoint

> 点位环绕,继承于[Animation](#animation)

### example

```js
let aroundPoint = new DC.AroundPoint(viewer, '120.121, 31.12')
aroundPoint.start()
```

### creation

- **_constructor(viewer,position,[options])_**

  构造函数

  - 参数
    - `{Viewer} viewer`：3D 场景
    - `{Position|String|Array} position`：点位
    - `{Object} options`：options
  - 返回值 `aroundPoint`

```json
//options（optional）
{
  "heading": 0, //偏移角度
  "pitch": 0, //翻转角度
  "range": 0, //距离
  "duration": 0, //间隔，单位：秒,当此值大于0时，callback才会生效
  "callback": null, //完成回调函数
  "context": null //回调函数执行上下文
}
```

## DC.AroundView

> 相机环绕，继承于[Animation](#animation)

### example

```js
let aroundView = new DC.AroundView(viewer)
aroundView.start()
```

### creation

- **_constructor(viewer,[options])_**

  构造函数

  - 参数
    - `{Viewer} viewer`：3D 场景
    - `{Object} options`：options
  - 返回值 `aroundView`

```json
//options（optional）
{
  "heading": 0, //偏移角度
  "pitch": 0, //俯仰角度
  "roll": 0, //翻转角度
  "duration": 0, //间隔，单位：秒，当此值大于0时，callback才会生效
  "callback": null, //完成回调函数
  "context": null //回调函数执行上下文
}
```

## DC.CircleScan

> 扫描圈，继承于[Animation](#animation)

### example

```js
let circleScan = new DC.CircleScan(viewer, '120, 20', 200)
circleScan.start()
```

### creation

- **_constructor(viewer,position,radius,options)_**

  构造函数

  - 参数
    - `{Viewer} viewer`：场景
    - `{DC.Position} position`：位置
    - `{Number} radius`：半径
    - `{Object} options`：属性
  - 返回值 `circleScan`

```json
// 属性参数（optional）
{
  "color": DC.Color.BLUE, // 颜色
  "speed": 5 // 速度
}
```

## DC.Flying

> 定点巡航，继承于[Animation](#animation)

### example

```js
let flying = new DC.Flying(viewer)
flying.positions = ['121.234,21.212,0,-29', '121.435,21.212,0,-29']
flying.start()
```

### creation

- **_constructor(viewer,[options])_**

  构造函数

  - 参数
    - `{Viewer} viewer`：场景
    - `{Object} options`：options
  - 返回值 `flying`

```json
// 属性参数（optional）
{
  "loop": false, //是否循环,
  "dwellTime": 3, //驻留时间
  "callback": null //回调函数
}
```

### properties

- `{Array} positions`：点位
- `{Array} durations`：每个点位的飞行间隔时间，当数组长度为 1 时，每个间隔时间相同，如果不为 1 时，长度必须和点位长度相等

### methods

- **_start()_**

  开始动画

  - 返回值 `this`

- **_pause()_**

  暂停

  - 返回值 `this`

- **_restore()_**

  继续

  - 返回值 `this`

## DC.GlobeRotate

> 地球自转，继承于[Animation](#animation)

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

  构造函数

  - 参数
    - `{DC.Viewer} viewer`：3D 场景
    - `{Object} options`：options
  - 返回值 `globeRotate`

```json
//options（optional）
{
  "speed": 12 * 1000, //速度
  "duration": 0, //持续时间,当此值大于0时，callback才会生效
  "callback": null, //执行完成的回调函数
  "context": null //回调函数执行上下文
}
```

## DC.RadarScan

> 雷达扫描，继承于[Animation](#animation)

### example

```js
let radarScan = new DC.RadarScan(viewer, '120, 20', 200)
radarScan.start()
```

### creation

- **_constructor(viewer,position,radius,options)_**

  构造函数

  - 参数
    - `{Viewer} viewer`：场景
    - `{DC.Position} position`：位置
    - `{Number} radius`：半径
    - `{Object} options`：属性
  - 返回值 `radarScan`

```json
// 属性参数（optional）
{
  "color": DC.Color.BLUE, // 颜色
  "speed": 5 // 速度
}
```

## DC.RoamingController

> 漫游控制

### example

```js
let rc = new DC.RoamingController(viewer)
```

### creation

- **_constructor(viewer)_**

  构造函数

  - 参数
    - `{Viewer} viewer`：3D 场景
  - 返回值 `roamingController`

### methods

- **_addPath(path)_**

  添加路径

  - 参数
    - `{RoamingPath} path`：路径
  - 返回值 `this`

- **_addPaths(paths)_**

  添加路径数组

  - 参数
    - `{Array<RoamingPath>} paths`：路径数组
  - 返回值 `this`

- **_removePath(path)_**

  移除路径

  - 参数
    - `{RoamingPath} path`：路径
  - 返回值 `path`

- **_getPath(id)_**

  根据唯一标识获取路径

  - 参数
    - `{String} id`：唯一标识
  - 返回值 `path`

- **_getPaths()_**

  获取所有路径

  - 返回值 `array`

- **_activate(path, viewOption)_**

  激活漫游

  - 参数
    - `{RoamingPath} path`：路径
    - `{String} viewOption`：漫游参数
  - 返回值 `this`

```json
// 漫游参数（可选）
{
  "pitch": 0, // 俯仰角
  "range": 1000 // 距离
}
```

- **_deactivate()_**

  结束漫游

  - 返回值 `this`

- **_clear()_**

  移除所有路径

  - 返回值 `this`

## DC.RoamingPath

> 漫游路径

### example

```js
let path = new DC.RoamingPath('120.121,32.1213;121.132,32.1213', 20)
rc.addPath(path)
```

### creation

- **_constructor(positions, duration, [pathMode])_**

  构造函数

  - 参数
    - `{String|Array<Position|Number|String|Object>} positions`：坐标串
    - `{Number} duration`：间隔时间，单位：秒
    - `{String} pathMode`：路径模式：speed(匀速) / time(等时)
  - 返回值 `roamingPath`

### properties

- `{String} pathId`：唯一标识 **_`readonly`_**
- `{String} id`：业务唯一标识
- `{String|Array<Position|Number|String>} positions`：坐标串
- `{Number} duration`：间隔时间，单位：秒
- `{String} pathMode`：路径模式：speed(匀速) / time(等时)
- `{String} state`：状态 **_`readonly`_**

## DC.KeyboardRoaming

> 键盘漫游

### example

```js
let kr = new DC.KeyboardRoaming(viewer)
kr.enable = true
```

### creation

- **_constructor(viewer)_**

  构造函数

  - 参数
    - `{Viewer} viewer`：3D 场景
  - 返回值 `keyboardRoaming`

### properties

- `{Boolean} enable`：是否启用
- `{Number} moveRate`：移动变化率：100
- `{Number} rotateRate`：旋转变化率：0.01

## DC.TrackController

> 历史轨迹控制

### example

```js
let tc = new DC.TrackController(viewer)
```

### creation

- **_constructor(viewer)_**

  构造函数

  - 参数
    - `{Viewer} viewer`：3D 场景
  - 返回值 `trackController`

### methods

- **_addTrack(track)_**

  添加轨迹

  - 参数
    - `{Track} track`：轨迹
  - 返回值 `this`

- **_addTracks(tracks)_**

  添加轨迹数组

  - 参数
    - `{Array<Track>} tracks`：轨迹数组
  - 返回值 `this`

- **_removeTrack(track)_**

  移除轨迹

  - 参数
    - `{Track} track`：轨迹
  - 返回值 `path`

- **_getTrack(id)_**

  根据业务唯一标识获取轨迹

  - 参数
    - `{String} id`：业务唯一标识
  - 返回值 `track`

- **_getTracks()_**

  获取所有轨迹

  - 返回值 `array`

- **_play()_**

  播放

  - 返回值 `this`

- **_pause()_**

  暂停

  - 返回值 `this`

- **_restore()_**

  继续播放

  - 返回值 `this`

- **_viewTrack(track, viewOption)_**

  跟踪某一条路径

  - 参数
    - `{Track} track`：路径
    - `{String} viewOption`：配置信息
  - 返回值 `this`

```json
// 属性参数（可选）
{
  "mode": null, // 视角模式：DC.TrackViewMode
  "pitch": 0, // 俯仰角，第一视角有效
  "range": 1000 // 距离
}
```

- **_releaseTrack(track)_**

  取消跟踪某一条轨迹

  - 参数
    - `{Track} track`：路径
  - 返回值 `this`

- **_clear()_**

  移除所有路径

  - 返回值 `this`

## DC.Track

> 轨迹

### example

```js
let tc = new DC.TrackController(viewer)
let track = new DC.Track('120.121,32.1213;121.132,32.1213', 20)
tc.addTrack(track)
```

### creation

- **_constructor(positions, duration, [callback], [options])_**

  构造函数

  - 参数
    - `{String|Array<Position|Number|String|Object>} positions`：坐标串
    - `{Number} duration`：间隔时间，单位：秒
    - `{Function} callback`：每一个点位到达回调函数，参数有：position(位置信息),isLast(是否为最后的点位)
    - `{Object} options`： 配置参数
  - 返回值 `track`

```json
//配置参数（可选）
{
  "clampToGround": false, // 是否贴地
  "clampToTileset": false, // 是否贴物
  "interpolationType": "Linear", // 插值类型：Linear、Hermite、Lagrange
  "interpolationDegree": 2, // 插值度数
  "endDelayTime": 0.5,// 结束时间延长时间，单位:秒，
  "headingOffset":0,//旋转偏移
}
```

### properties

- `{String} trackId`：唯一标识 **_`readonly`_**
- `{String} id`：业务唯一标识
- `{String|Array<Position|Number|String|Object>} positions`：坐标串
- `{Number} duration`：间隔时间，单位：秒
- `{Date} startTime`：开始时间，设置后会独立于控制器的开始时间
- `{String} state`：状态 **_`readonly`_**

### methods

- **_addPosition(position,duration)_**

  添加点位

  - 参数
    - `{Position|Array|String|Object} position`：点位
    - `{Number} duration`：间隔，单位：秒
  - 返回值 `this`

- **_setModel(modelUrl,style)_**

  设置模型

  - 参数
    - `{String} modelPath`：模型路径
    - `{Object} style`：样式，详情参考：[DC.Model](../overlay/#dc-model)
  - 返回值 `this`

- **_setBillboard(icon,style)_**

  设置图标

  - 参数
    - `{String} icon`：图标路径
    - `{Object} style`：样式，参考：[DC.Billboard](../overlay/#dc-billboard)
  - 返回值 `this`

- **_setLabel(text,style)_**

  设置文本

  - 参数
    - `{String} text`：文本
    - `{Object} style`：样式，参考：[DC.Label](../overlay/#dc-label)
  - 返回值 `this`

- **_setPath(visible,style)_**

  设置路径

  - 参数
    - `{Boolean}} visible`：是否可见
    - `{Object} style`：样式，参考：[DC.Polyline](../overlay/#dc-polyline)
  - 返回值 `this`
