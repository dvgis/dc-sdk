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
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-c2c50230","./GeometryAttribute-f9641809","./GeometryAttributes-1c7ce91d","./IndexDatatype-486e7786","./GeometryOffsetAttribute-9ecab91f","./VertexFormat-e1477d0a","./EllipsoidGeometry-232477be"],function(a,e,t,o,r,i,n,s,c,d,l,m,u,p){"use strict";function y(e){var t=a.defaultValue(e.radius,1),r={radii:new o.Cartesian3(t,t,t),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,vertexFormat:e.vertexFormat};this._ellipsoidGeometry=new p.EllipsoidGeometry(r),this._workerName="createSphereGeometry"}y.packedLength=p.EllipsoidGeometry.packedLength,y.pack=function(e,t,r){return p.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};var G=new p.EllipsoidGeometry,f={radius:void 0,radii:new o.Cartesian3,vertexFormat:new u.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return y.unpack=function(e,t,r){var i=p.EllipsoidGeometry.unpack(e,t,G);return f.vertexFormat=u.VertexFormat.clone(i._vertexFormat,f.vertexFormat),f.stackPartitions=i._stackPartitions,f.slicePartitions=i._slicePartitions,a.defined(r)?(o.Cartesian3.clone(i._radii,f.radii),r._ellipsoidGeometry=new p.EllipsoidGeometry(f),r):(f.radius=i._radii.x,new y(f))},y.createGeometry=function(e){return p.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(e,t){return a.defined(t)&&(e=y.unpack(e,t)),y.createGeometry(e)}});
