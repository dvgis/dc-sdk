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
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b","./AttributeCompression-fe1560e2","./GeometryPipeline-587f449d","./EncodedCartesian3-97ac8d01","./IndexDatatype-8575c917","./IntersectionTests-12255a09","./Plane-466db411","./GeometryOffsetAttribute-22febf92","./VertexFormat-7996cb24","./EllipseGeometryLibrary-ff71c40e","./GeometryInstance-2a7fafaf","./EllipseGeometry-e762155f"],function(o,e,t,a,i,r,n,s,l,m,d,c,u,p,y,_,h,G,f,x,g,v){"use strict";function E(e){var t=(e=o.defaultValue(e,o.defaultValue.EMPTY_OBJECT)).radius,i={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new v.EllipseGeometry(i),this._workerName="createCircleGeometry"}E.packedLength=v.EllipseGeometry.packedLength,E.pack=function(e,t,i){return v.EllipseGeometry.pack(e._ellipseGeometry,t,i)};var w=new v.EllipseGeometry({center:new a.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),A={center:new a.Cartesian3,radius:void 0,ellipsoid:a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new f.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return E.unpack=function(e,t,i){var r=v.EllipseGeometry.unpack(e,t,w);return A.center=a.Cartesian3.clone(r._center,A.center),A.ellipsoid=a.Ellipsoid.clone(r._ellipsoid,A.ellipsoid),A.height=r._height,A.extrudedHeight=r._extrudedHeight,A.granularity=r._granularity,A.vertexFormat=f.VertexFormat.clone(r._vertexFormat,A.vertexFormat),A.stRotation=r._stRotation,A.shadowVolume=r._shadowVolume,o.defined(i)?(A.semiMajorAxis=r._semiMajorAxis,A.semiMinorAxis=r._semiMinorAxis,i._ellipseGeometry=new v.EllipseGeometry(A),i):(A.radius=r._semiMajorAxis,new E(A))},E.createGeometry=function(e){return v.EllipseGeometry.createGeometry(e._ellipseGeometry)},E.createShadowVolume=function(e,t,i){var r=e._ellipseGeometry._granularity,o=e._ellipseGeometry._ellipsoid,a=t(r,o),n=i(r,o);return new E({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:o,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:a,height:n,vertexFormat:f.VertexFormat.POSITION_ONLY,shadowVolume:!0})},i.defineProperties(E.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(e,t){return o.defined(t)&&(e=E.unpack(e,t)),e._ellipseGeometry._center=a.Cartesian3.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=a.Ellipsoid.clone(e._ellipseGeometry._ellipsoid),E.createGeometry(e)}});
