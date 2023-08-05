# 技术扩展

## WebGL

WebGL 是一种 JavaScript API，用于在不使用插件的情况下在任何兼容的网页浏览器中呈现交互式 2D 和 3D 图形。WebGL 完全集成到浏览器的所有网页标准中，可将影像处理和效果的 GPU 加速使用方式当做网页 Canvas 的一部分。WebGL 元素可以加入其他 HTML 元素之中并与网页或网页背景的其他部分混合。WebGL 程序由 JavaScript 编写的句柄和 OpenGL Shading Language（ **`GLSL`** ）编写的着色器代码组成。

## 三维数据格式

**`glb/gltf`**

GLTF 代表 Graphics Language Transmission Format（图形语言传输格式）。这种跨平台格式已成为 Web 上的 3D 对象标准。它由 OpenGL 和 Vulkan 背后的 3D 图形标准组织 Khronos 所定义，这使得 GLTF 基本上成为 3D 模型的 JPG 格式：Web 导出的通用标准。

**`OSGB`**

倾斜摄影三维模型数据的组织方式一般是二进制存贮的、带有嵌入式链接纹理数据（.jpg）的 OSGB 格式。Open Scene Gragh Binary 是 OSGB 的全称，这里的 Binary 是二进制的意思。此类数据文件碎、数量多、高级别金字塔文件大等特点难以形成高效、标准的网络发布方案，从而无法实现不同地域、不同部门之间数据共享。

**`3d-tiles`**

3D Tiles 是用于流式传输大规模异构 3D 地理空间数据集的开放规范。3D Tiles 数据可以通过 shp、osgb(倾斜摄影)、3dmax 等数据生成。

**`GeoJson`**

GeoJSON 是一种对各种地理数据结构进行编码的格式，基于 Javascript 对象表示法的地理空间信息数据交换格式。GeoJSON 对象可以表示几何、特征或者特征集合。GeoJSON 支持下面几何类型：点、线、面、多点、多线、多面和几何集合。GeoJSON 里的特征包含一个几何对象和其他属性，特征集合表示一系列特征。

**`kml/czml`**

KML/CZML 是一个 JSON 格式的数据,描述 time-dynamic（时间、动态）图形场景,它描述了线、点、广告牌(标记)、模型、和其他图形原语,并指定他们如何随时间变化。

:::tip
数据转换可借助于 [CesiumLab](http://www.cesiumlab.com) 或者其他一些转换工具。[查看大图](https://resource.dvgis.cn/assets/images/data_transform.png)
:::

<img src="https://resource.dvgis.cn/assets/images/data_transform.png" style="width:100%;height:500px">

## 三维坐标

**`世界坐标(Cartesian3)`**

笛卡尔坐标，以椭球中心为原点的空间直角坐标系中的一个点的坐标。

**`地理坐标(Cartographic)`**

地理坐标系，坐标原点在椭球的质心。

经度：参考椭球面上某点的大地子午面与本初子午面间的两面角。东正西负。

纬度 ：参考椭球面上某点的法线与赤道平面的夹角。北正南负。

**`地理坐标(Position)`**

地理坐标系，坐标原点在椭球的质心。`DC扩展`

经度：参考椭球面上某点的大地子午面与本初子午面间的两面角。东正西负。

纬度 ：参考椭球面上某点的法线与赤道平面的夹角。北正南负。

高度 ：和地球表面的距离

**`屏幕坐标(Cartesian2)`**

浏览器窗口坐标或者鼠标事件中 windowPosition

:::tip
框架中可以使用 `DC.T` 进行各类坐标的转换
:::

## 地理坐标系

`WGS84`

一种国际上采用的地心坐标系。坐标原点为地球质心，其地心空间直角坐标系的 Z 轴指向 BIH （国际时间服务机构）1984.O 定义的协议地球极（CTP)方向，X 轴指向 BIH 1984.0 的零子午面和 CTP 赤道的交点，Y 轴与 Z 轴、X 轴垂直构成右手坐标系，称为 1984 年世界大地坐标系统。

`CGCS2000`

2000 中国大地坐标系(China Geodetic Coordinate System 2000，CGCS2000)，又称之为 2000 国家大地坐标系，是中国新一代大地坐标系，21 世纪初已在中国正式实施。其与 `WGS84` 相差不大，国内天地图就是采用该坐标系。

`GCJ02`

GCJ-02 是由中国国家测绘局（G 表示 Guojia 国家，C 表示 Cehui 测绘，J 表示 Ju 局）制订的地理信息系统的坐标系统。它其实就是对真实坐标系统进行人为的加偏处理，按照特殊的算法，将真实的坐标加密成虚假的坐标，而这个加偏并不是线性的加偏，所以各地的偏移情况都会有所不同。而加密后的坐标也常被大家称为“火星坐标系统”。

`BD09`

BD09 经纬度投影属于百度坐标系，它是在标准经纬度的基础上进行 GCJ-02 加偏之后，再加上百度自身的加偏算法，也就是在标准经纬度的基础之上进行了两次加偏。

[参考](http://www.rivermap.cn/docs/show-1829.html)

:::tip
框架中可以使用 `DC.CoordTransform` 进行各类坐标系的转换
:::
****
