/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b","./IndexDatatype-8575c917","./GeometryOffsetAttribute-22febf92","./EllipseGeometryLibrary-ff71c40e","./EllipseOutlineGeometry-bfb43cb4"],function(n,e,i,l,t,r,s,o,a,u,c,d,m,p,y){"use strict";function f(e){var i=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).radius,t={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new y.EllipseOutlineGeometry(t),this._workerName="createCircleOutlineGeometry"}f.packedLength=y.EllipseOutlineGeometry.packedLength,f.pack=function(e,i,t){return y.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,t)};var G=new y.EllipseOutlineGeometry({center:new l.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),_={center:new l.Cartesian3,radius:void 0,ellipsoid:l.Ellipsoid.clone(l.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return f.unpack=function(e,i,t){var r=y.EllipseOutlineGeometry.unpack(e,i,G);return _.center=l.Cartesian3.clone(r._center,_.center),_.ellipsoid=l.Ellipsoid.clone(r._ellipsoid,_.ellipsoid),_.height=r._height,_.extrudedHeight=r._extrudedHeight,_.granularity=r._granularity,_.numberOfVerticalLines=r._numberOfVerticalLines,n.defined(t)?(_.semiMajorAxis=r._semiMajorAxis,_.semiMinorAxis=r._semiMinorAxis,t._ellipseGeometry=new y.EllipseOutlineGeometry(_),t):(_.radius=r._semiMajorAxis,new f(_))},f.createGeometry=function(e){return y.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(e,i){return n.defined(i)&&(e=f.unpack(e,i)),e._ellipseGeometry._center=l.Cartesian3.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=l.Ellipsoid.clone(e._ellipseGeometry._ellipsoid),f.createGeometry(e)}});
