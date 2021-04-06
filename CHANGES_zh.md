# Change Log

### 2.1.1 - 2021-04-06

#### Fixes 🔧

- 修复部分模块版本号不统一的问题

### 2.1.0 - 2021-04-03

#### Breaking Changes 📣

- 升级Cesium到1.80.0版本

#### Additions 🎉

- 添加GeoTools工具类，主要利用Turf进行覆盖物的相关计算

#### Fixes 🔧

- 修改HtmlLayer设置show的错误问题
- 完善accessToken的认证规则

### 2.0.0 - 2021-03-27

#### Breaking Changes 📣

- 重构整个框架代码，将代码模块化处理
- 整合之前分散的模块
- 重构了各个模块包中对DC的依赖
- 重新开发了用户手册
- 支持自定安装和整体安装的方式引入DC

#### Additions 🎉

- 添加token认证功能。认证通过可以使用一些分析、点位编辑功能
- 添加turf模块的支持，可以通过 `const {turf} = DC.Namespace` 获取 turf

#### Fixes 🔧

- 修改 location bar 时间延迟问题
- 修改雷达扫描材质设置速度无效的问题
