---
sidebar: auto
---

# Third Part 🌎

Adding a third-party map library to a 3D scene

## DC.ChartLayer

> Inherited from [Layer](../layer/#layer)

### example

```js
let chartLayer = new DC.ChartLayer('layer')
viewer.addLayer(chartLayer)
```

:::warning
The chart layer depends on the echarts library, please make sure that echarts is available in the global variables before using it.
:::

### creation

- **_constructor([id],[option])_**

  - parameters
    - `{String} id`
    - `{Object} option` [echarts](https://www.echartsjs.com/zh/option.html#title)
  - returns `chartLayer`

```json
// options
{
  "animation": false, //required
  "GLMap": {},
  "series": [
    {
      "coordinateSystem": "GLMap"
    }
  ]
}
```

### methods

- **_setOption(option)_**

  - parameters
    - `{Object} option` [echarts](https://www.echartsjs.com/zh/option.html#title)
  - returns `this`

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

  - parameters
    - `{Array<Object>} data` [DataSet](https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md)
  - returns `dataset`

```json
{
  "geometry": {
    "type": "Point",
    "coordinates": [123, 23]
  },
  "count": 30,
  "time": 100 * Math.random()
}
```

## DC.MapvLayer

> Inherited from [Layer](../layer/#layer)

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

- **_constructor(id,[options])_**

  - parameters
    - `{String} id`
    - `{Object} options`
  - returns `mapvLayer`

```json
// options(optional)
{
  "fillStyle": "rgba(55, 50, 250, 0.8)",
  "shadowColor": "rgba(255, 250, 50, 1)",
  "shadowBlur": 20,
  "size": 40,
  "globalAlpha": 0.5,
  "globalCompositeOperation": "lighter",
  "label": {
    "show": true,
    "fillStyle": "white"
  },
  "animation": {
    "type": "time",
    "stepsRange": {
      "start": 0,
      "end": 100
    },
    "trails": 10,
    "duration": 4
  },
  "lineWidth": 0.7,
  "lineDash": [15],
  "gradient": {
    0.25: "rgb(0,0,255)",
    0.55: "rgb(0,255,0)",
    0.85: "yellow",
    1.0: "rgb(255,0,0)"
  },
  "draw": "grid"
}
```

### methods

- **_setDataSet(dataset)_**

  - parameters
    - `{MapvDataSet} dataset`
  - returns `this`
