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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./AttributeCompression-5601f533","./GeometryPipeline-6fb2c91a","./EncodedCartesian3-4813be74","./IndexDatatype-2bcfc06b","./IntersectionTests-59cef209","./Plane-b1ca737b","./GeometryInstance-bf890adc","./arrayRemoveDuplicates-33a93436","./EllipsoidTangentPlane-8dc9a637","./OrientedBoundingBox-656f9e92","./CoplanarPolygonGeometryLibrary-00849ee5","./ArcType-e0f1982f","./EllipsoidRhumbLine-d5a5f3d0","./PolygonPipeline-75c02603","./PolygonGeometryLibrary-8c051756"],function(a,e,t,i,r,c,n,p,o,y,s,u,l,d,f,m,b,g,h,P,G,v,L,C,T,E,k,H,w){"use strict";function A(e){for(var t=e.length,r=new Float64Array(3*t),n=g.IndexDatatype.createTypedArray(t,2*t),o=0,a=0,i=0;i<t;i++){var y=e[i];r[o++]=y.x,r[o++]=y.y,r[o++]=y.z,n[a++]=i,n[a++]=(i+1)%t}var l=new d.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r})});return new u.Geometry({attributes:l,indices:n,primitiveType:u.PrimitiveType.LINES})}function I(e){var t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=w.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+1}I.fromPositions=function(e){return new I({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},I.pack=function(e,t,r){return r=i.defaultValue(r,0),t[r=w.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r)]=e.packedLength,t};var _={polygonHierarchy:{}};return I.unpack=function(e,t,r){t=i.defaultValue(t,0);var n=w.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=n.startingIndex,delete n.startingIndex;var o=e[t];return a.defined(r)||(r=new I(_)),r._polygonHierarchy=n,r.packedLength=o,r},I.createGeometry=function(e){var t=e._polygonHierarchy,r=t.positions;if(!((r=v.arrayRemoveDuplicates(r,c.Cartesian3.equalsEpsilon,!0)).length<3)&&T.CoplanarPolygonGeometryLibrary.validOutline(r)){var n=w.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t,!1);if(0!==n.length){for(var o=[],a=0;a<n.length;a++){var i=new G.GeometryInstance({geometry:A(n[a])});o.push(i)}var y=m.GeometryPipeline.combineInstances(o)[0],l=p.BoundingSphere.fromPoints(t.positions);return new u.Geometry({attributes:y.attributes,indices:y.indices,primitiveType:y.primitiveType,boundingSphere:l})}}},function(e,t){return a.defined(t)&&(e=I.unpack(e,t)),e._ellipsoid=c.Ellipsoid.clone(e._ellipsoid),I.createGeometry(e)}});
