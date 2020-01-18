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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./AttributeCompression-5601f533","./GeometryPipeline-6fb2c91a","./EncodedCartesian3-4813be74","./IndexDatatype-2bcfc06b","./IntersectionTests-59cef209","./Plane-b1ca737b","./GeometryOffsetAttribute-fa4e7a11","./VertexFormat-e2e35139","./EllipseGeometryLibrary-4fbaad23","./GeometryInstance-bf890adc","./EllipseGeometry-143739c0"],function(r,e,t,a,n,i,f,o,c,s,b,l,d,m,p,u,y,G,C,E,A,_,h,I,P){"use strict";return function(e,t){return r.defined(t)&&(e=P.EllipseGeometry.unpack(e,t)),e._center=i.Cartesian3.clone(e._center),e._ellipsoid=i.Ellipsoid.clone(e._ellipsoid),P.EllipseGeometry.createGeometry(e)}});
