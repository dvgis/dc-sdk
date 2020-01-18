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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./AttributeCompression-5601f533","./GeometryPipeline-6fb2c91a","./EncodedCartesian3-4813be74","./IndexDatatype-2bcfc06b","./IntersectionTests-59cef209","./Plane-b1ca737b","./GeometryOffsetAttribute-fa4e7a11","./VertexFormat-e2e35139","./EllipseGeometryLibrary-4fbaad23","./GeometryInstance-bf890adc","./EllipseGeometry-143739c0"],function(o,e,t,r,i,a,n,l,s,d,m,c,u,p,y,f,_,h,G,x,g,b,v,E,w){"use strict";function A(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).radius,i={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new w.EllipseGeometry(i),this._workerName="createCircleGeometry"}A.packedLength=w.EllipseGeometry.packedLength,A.pack=function(e,t,i){return w.EllipseGeometry.pack(e._ellipseGeometry,t,i)};var C=new w.EllipseGeometry({center:new a.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),M={center:new a.Cartesian3,radius:void 0,ellipsoid:a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new b.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return A.unpack=function(e,t,i){var r=w.EllipseGeometry.unpack(e,t,C);return M.center=a.Cartesian3.clone(r._center,M.center),M.ellipsoid=a.Ellipsoid.clone(r._ellipsoid,M.ellipsoid),M.height=r._height,M.extrudedHeight=r._extrudedHeight,M.granularity=r._granularity,M.vertexFormat=b.VertexFormat.clone(r._vertexFormat,M.vertexFormat),M.stRotation=r._stRotation,M.shadowVolume=r._shadowVolume,o.defined(i)?(M.semiMajorAxis=r._semiMajorAxis,M.semiMinorAxis=r._semiMinorAxis,i._ellipseGeometry=new w.EllipseGeometry(M),i):(M.radius=r._semiMajorAxis,new A(M))},A.createGeometry=function(e){return w.EllipseGeometry.createGeometry(e._ellipseGeometry)},A.createShadowVolume=function(e,t,i){var r=e._ellipseGeometry._granularity,o=e._ellipseGeometry._ellipsoid,a=t(r,o),n=i(r,o);return new A({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:o,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:a,height:n,vertexFormat:b.VertexFormat.POSITION_ONLY,shadowVolume:!0})},n.defineProperties(A.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(e,t){return o.defined(t)&&(e=A.unpack(e,t)),e._ellipseGeometry._center=a.Cartesian3.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=a.Ellipsoid.clone(e._ellipseGeometry._ellipsoid),A.createGeometry(e)}});
