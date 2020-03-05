/**
 * Cesium - https://github.com/CesiumGS/cesium
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
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-c2c50230","./GeometryAttribute-f9641809","./GeometryAttributes-1c7ce91d","./AttributeCompression-fbcb3321","./GeometryPipeline-24d3be03","./EncodedCartesian3-11d9c783","./IndexDatatype-486e7786","./IntersectionTests-3bb891b7","./Plane-a6a20716","./GeometryOffsetAttribute-9ecab91f","./VertexFormat-e1477d0a","./EllipseGeometryLibrary-fa954a7f","./GeometryInstance-08f0b75f","./EllipseGeometry-5bbb43be"],function(o,e,t,a,i,r,n,s,l,d,m,c,u,p,y,_,h,G,x,f,g){"use strict";function b(e){var t=(e=o.defaultValue(e,o.defaultValue.EMPTY_OBJECT)).radius,i={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new g.EllipseGeometry(i),this._workerName="createCircleGeometry"}b.packedLength=g.EllipseGeometry.packedLength,b.pack=function(e,t,i){return g.EllipseGeometry.pack(e._ellipseGeometry,t,i)};var v=new g.EllipseGeometry({center:new a.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),E={center:new a.Cartesian3,radius:void 0,ellipsoid:a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new G.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return b.unpack=function(e,t,i){var r=g.EllipseGeometry.unpack(e,t,v);return E.center=a.Cartesian3.clone(r._center,E.center),E.ellipsoid=a.Ellipsoid.clone(r._ellipsoid,E.ellipsoid),E.height=r._height,E.extrudedHeight=r._extrudedHeight,E.granularity=r._granularity,E.vertexFormat=G.VertexFormat.clone(r._vertexFormat,E.vertexFormat),E.stRotation=r._stRotation,E.shadowVolume=r._shadowVolume,o.defined(i)?(E.semiMajorAxis=r._semiMajorAxis,E.semiMinorAxis=r._semiMinorAxis,i._ellipseGeometry=new g.EllipseGeometry(E),i):(E.radius=r._semiMajorAxis,new b(E))},b.createGeometry=function(e){return g.EllipseGeometry.createGeometry(e._ellipseGeometry)},b.createShadowVolume=function(e,t,i){var r=e._ellipseGeometry._granularity,o=e._ellipseGeometry._ellipsoid,a=t(r,o),n=i(r,o);return new b({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:o,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:a,height:n,vertexFormat:G.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(b.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(e,t){return o.defined(t)&&(e=b.unpack(e,t)),e._ellipseGeometry._center=a.Cartesian3.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=a.Ellipsoid.clone(e._ellipseGeometry._ellipsoid),b.createGeometry(e)}});
