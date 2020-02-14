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
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b","./AttributeCompression-fe1560e2","./GeometryPipeline-587f449d","./EncodedCartesian3-97ac8d01","./IndexDatatype-8575c917","./IntersectionTests-12255a09","./Plane-466db411","./GeometryInstance-2a7fafaf","./arrayRemoveDuplicates-c6db543d","./EllipsoidTangentPlane-70069c84","./OrientedBoundingBox-5e4e94f2","./CoplanarPolygonGeometryLibrary-f0318965","./ArcType-318ba758","./EllipsoidRhumbLine-9e95354f","./PolygonPipeline-5e2e1765","./PolygonGeometryLibrary-fa262d54"],function(a,e,t,c,r,p,n,o,s,u,d,i,m,y,f,l,g,h,b,P,G,v,L,C,T,E){"use strict";function k(e){for(var t=e.length,r=new Float64Array(3*t),n=f.IndexDatatype.createTypedArray(t,2*t),o=0,a=0,i=0;i<t;i++){var y=e[i];r[o++]=y.x,r[o++]=y.y,r[o++]=y.z,n[a++]=i,n[a++]=(i+1)%t}var l=new d.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r})});return new u.Geometry({attributes:l,indices:n,primitiveType:u.PrimitiveType.LINES})}function H(e){var t=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=E.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+1}H.fromPositions=function(e){return new H({polygonHierarchy:{positions:(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).positions}})},H.pack=function(e,t,r){return r=a.defaultValue(r,0),t[r=E.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r)]=e.packedLength,t};var w={polygonHierarchy:{}};return H.unpack=function(e,t,r){t=a.defaultValue(t,0);var n=E.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=n.startingIndex,delete n.startingIndex;var o=e[t];return a.defined(r)||(r=new H(w)),r._polygonHierarchy=n,r.packedLength=o,r},H.createGeometry=function(e){var t=e._polygonHierarchy,r=t.positions;if(!((r=b.arrayRemoveDuplicates(r,c.Cartesian3.equalsEpsilon,!0)).length<3)&&v.CoplanarPolygonGeometryLibrary.validOutline(r)){var n=E.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t,!1);if(0!==n.length){for(var o=[],a=0;a<n.length;a++){var i=new h.GeometryInstance({geometry:k(n[a])});o.push(i)}var y=m.GeometryPipeline.combineInstances(o)[0],l=p.BoundingSphere.fromPoints(t.positions);return new u.Geometry({attributes:y.attributes,indices:y.indices,primitiveType:y.primitiveType,boundingSphere:l})}}},function(e,t){return a.defined(t)&&(e=H.unpack(e,t)),e._ellipsoid=c.Ellipsoid.clone(e._ellipsoid),H.createGeometry(e)}});
