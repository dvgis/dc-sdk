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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./IndexDatatype-2bcfc06b","./GeometryOffsetAttribute-fa4e7a11","./EllipseGeometryLibrary-4fbaad23","./EllipseOutlineGeometry-27485bb8"],function(l,e,i,r,t,n,s,a,o,u,d,c,m,p,f,y,G,_){"use strict";function b(e){var i=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).radius,t={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new _.EllipseOutlineGeometry(t),this._workerName="createCircleOutlineGeometry"}b.packedLength=_.EllipseOutlineGeometry.packedLength,b.pack=function(e,i,t){return _.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,t)};var h=new _.EllipseOutlineGeometry({center:new n.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),E={center:new n.Cartesian3,radius:void 0,ellipsoid:n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return b.unpack=function(e,i,t){var r=_.EllipseOutlineGeometry.unpack(e,i,h);return E.center=n.Cartesian3.clone(r._center,E.center),E.ellipsoid=n.Ellipsoid.clone(r._ellipsoid,E.ellipsoid),E.height=r._height,E.extrudedHeight=r._extrudedHeight,E.granularity=r._granularity,E.numberOfVerticalLines=r._numberOfVerticalLines,l.defined(t)?(E.semiMajorAxis=r._semiMajorAxis,E.semiMinorAxis=r._semiMinorAxis,t._ellipseGeometry=new _.EllipseOutlineGeometry(E),t):(E.radius=r._semiMajorAxis,new b(E))},b.createGeometry=function(e){return _.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(e,i){return l.defined(i)&&(e=b.unpack(e,i)),e._ellipseGeometry._center=n.Cartesian3.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=n.Ellipsoid.clone(e._ellipseGeometry._ellipsoid),b.createGeometry(e)}});
