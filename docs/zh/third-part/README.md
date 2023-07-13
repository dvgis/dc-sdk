---
sidebar: auto
---

# 第三方集成 🌎

在三维场景中添加第三方的地图库

## DC.ChartLayer

> 图表图层，继承于[Layer](../layer/#layer)

### example

```js
let chartLayer = new DC.ChartLayer('layer')
viewer.addLayer(chartLayer)
```

:::warning
图表图层依赖于 echarts 库，使用前请确保全局变量中能够获取到 echarts
:::

### creation

- **_constructor([id],[option])_**

  构造函数

  - 参数
    - `{String} id`：唯一标识
    - `{Object} option`：echarts 配置，详情参考：[echarts](https://www.echartsjs.com/zh/option.html#title)
  - 返回值 `chartLayer`

```json
// options，其他的参数参考 echarts
{
  "animation": false, // 必须要加
  "GLMap": {}, //地图
  "series": [
    {
      "coordinateSystem": "GLMap" // 坐标系统
    }
  ]
}
```

### methods

- **_setOption(option)_**

  设置点位

  - 参数
    - `{Object} option`：echarts 配置，详情参考：[echarts](https://www.echartsjs.com/zh/option.html#title)
  - 返回值 `this`

## DC.MapvDataSet

### example

```js
let geoCoordMap = {
  上海: [121.4648, 31.2891],
  东莞: [113.8953, 22.901],
  东营: [118.7073, 37.5513],
  中山: [113.4229, 22.478],
  临汾: [111.4783, 36.1615],
}
let data = []
for (let key in geoCoordMap) {
  let geoCoord = geoCoordMap[key]
  data.push({
    geometry: {
      type: 'Point',
      coordinates: [
        geoCoord[0] - 2 + Math.random() * 4,
        geoCoord[1] - 2 + Math.random() * 4,
      ],
    },
    count: 30 * Math.random(),
  })
}

let dataset = new DC.MapvDataSet(data)
```

### creation

- **_constructor(data)_**

  构造函数

  - 参数
    - `{Array<Object>} data`：数据数组，详情参考：[DataSet](https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md)
  - 返回值 `dataset`

```json
// 数据说明
{
  "geometry": {
    "type": "Point", // 类别，有：Point、Polygon、LineString
    "coordinates": [123, 23] // 坐标，线和面是二位数组
  },
  "count": 30, // 用于阈值计算
  "time": 100 * Math.random() // 步长 用于动画
}
```

## DC.MapvLayer

> 数据可视化图层，继承于[Layer](../layer/#layer)

### example

```js
let options = {
  fillStyle: 'rgba(55, 50, 250, 0.8)',
  shadowColor: 'rgba(255, 250, 50, 1)',
  shadowBlur: 20,
  size: 40,
  globalAlpha: 0.5,
  label: {
    show: true,
    fillStyle: 'white',
  },
  animation: {
    type: 'time',
    stepsRange: {
      start: 0,
      end: 100,
    },
    trails: 10,
    duration: 4,
  },
  gradient: {
    0.25: 'rgb(0,0,255)',
    0.55: 'rgb(0,255,0)',
    0.85: 'yellow',
    1.0: 'rgb(255,0,0)',
  },
  draw: 'grid',
}
let layer = new DC.MapvLayer('layer', options)
viewer.addLayer(layer)
```

### creation

- **_constructor(id,options)_**

  构造函数

  - 参数
    - `{String} id`：图层唯一标识
    - `{Object} options`：属性
  - 返回值 `mapvLayer`

```json
// 属性参数（可选）
{
  "fillStyle": "rgba(55, 50, 250, 0.8)", //颜色
  "shadowColor": "rgba(255, 250, 50, 1)", // 阴影颜色
  "shadowBlur": 20, // 阴影扩散
  "size": 40, // 点大小
  "globalAlpha": 0.5, //
  "globalCompositeOperation": "lighter",
  "label": {
    "show": true,
    "fillStyle": "white"
  }, // 文字
  "animation": {
    "type": "time",
    "stepsRange": {
      "start": 0,
      "end": 100
    },
    "trails": 10,
    "duration": 4
  }, //动画
  "lineWidth": 0.7, // 线宽
  "lineDash": [15], // 虚线
  "gradient": {
    0.25: "rgb(0,0,255)",
    0.55: "rgb(0,255,0)",
    0.85: "yellow",
    1.0: "rgb(255,0,0)"
  }, //渐变
  "draw": "grid" //展现方式 有：simple：简单、intensity：强度、honeycomb：蜂巢、grid：格子等
}
```

### methods

- **_setDataSet(dataset)_**

  设置点位

  - 参数
    - `{MapvDataSet} dataset`： 数据配置
  - 返回值 `this`
