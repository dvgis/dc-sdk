/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./IndexDatatype-2bcfc06b","./GeometryOffsetAttribute-fa4e7a11","./VertexFormat-e2e35139","./EllipsoidGeometry-320b96ee"],function(a,e,t,i,r,o,n,s,c,d,l,m,f,u,p,y,G,b){"use strict";function k(e){var t=i.defaultValue(e.radius,1),r={radii:new o.Cartesian3(t,t,t),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,vertexFormat:e.vertexFormat};this._ellipsoidGeometry=new b.EllipsoidGeometry(r),this._workerName="createSphereGeometry"}k.packedLength=b.EllipsoidGeometry.packedLength,k.pack=function(e,t,r){return b.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};var v=new b.EllipsoidGeometry,x={radius:void 0,radii:new o.Cartesian3,vertexFormat:new G.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return k.unpack=function(e,t,r){var i=b.EllipsoidGeometry.unpack(e,t,v);return x.vertexFormat=G.VertexFormat.clone(i._vertexFormat,x.vertexFormat),x.stackPartitions=i._stackPartitions,x.slicePartitions=i._slicePartitions,a.defined(r)?(o.Cartesian3.clone(i._radii,x.radii),r._ellipsoidGeometry=new b.EllipsoidGeometry(x),r):(x.radius=i._radii.x,new k(x))},k.createGeometry=function(e){return b.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(e,t){return a.defined(t)&&(e=k.unpack(e,t)),k.createGeometry(e)}});
