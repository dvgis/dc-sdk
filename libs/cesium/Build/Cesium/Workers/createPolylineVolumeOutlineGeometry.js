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
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-c2c50230","./GeometryAttribute-f9641809","./GeometryAttributes-1c7ce91d","./IndexDatatype-486e7786","./IntersectionTests-3bb891b7","./Plane-a6a20716","./arrayRemoveDuplicates-9c727c83","./BoundingRectangle-e13a8907","./EllipsoidTangentPlane-7f2f6dd6","./EllipsoidRhumbLine-cddfa697","./PolygonPipeline-c12287cd","./PolylineVolumeGeometryLibrary-94a0865b","./EllipsoidGeodesic-4c7a7786","./PolylinePipeline-a7e2c020"],function(c,e,t,d,y,i,a,h,g,f,m,n,r,o,l,s,p,u,v,E,P){"use strict";function _(e){var i=(e=c.defaultValue(e,c.defaultValue.EMPTY_OBJECT)).polylinePositions,a=e.shapePositions;this._positions=i,this._shape=a,this._ellipsoid=d.Ellipsoid.clone(c.defaultValue(e.ellipsoid,d.Ellipsoid.WGS84)),this._cornerType=c.defaultValue(e.cornerType,v.CornerType.ROUNDED),this._granularity=c.defaultValue(e.granularity,t.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";var n=1+i.length*d.Cartesian3.packedLength;n+=1+a.length*d.Cartesian2.packedLength,this.packedLength=n+d.Ellipsoid.packedLength+2}_.pack=function(e,i,a){var n;a=c.defaultValue(a,0);var t=e._positions,r=t.length;for(i[a++]=r,n=0;n<r;++n,a+=d.Cartesian3.packedLength)d.Cartesian3.pack(t[n],i,a);var o=e._shape;for(r=o.length,i[a++]=r,n=0;n<r;++n,a+=d.Cartesian2.packedLength)d.Cartesian2.pack(o[n],i,a);return d.Ellipsoid.pack(e._ellipsoid,i,a),a+=d.Ellipsoid.packedLength,i[a++]=e._cornerType,i[a]=e._granularity,i};var k=d.Ellipsoid.clone(d.Ellipsoid.UNIT_SPHERE),C={polylinePositions:void 0,shapePositions:void 0,ellipsoid:k,height:void 0,cornerType:void 0,granularity:void 0};_.unpack=function(e,i,a){var n;i=c.defaultValue(i,0);var t=e[i++],r=new Array(t);for(n=0;n<t;++n,i+=d.Cartesian3.packedLength)r[n]=d.Cartesian3.unpack(e,i);t=e[i++];var o=new Array(t);for(n=0;n<t;++n,i+=d.Cartesian2.packedLength)o[n]=d.Cartesian2.unpack(e,i);var l=d.Ellipsoid.unpack(e,i,k);i+=d.Ellipsoid.packedLength;var s=e[i++],p=e[i];return c.defined(a)?(a._positions=r,a._shape=o,a._ellipsoid=d.Ellipsoid.clone(l,a._ellipsoid),a._cornerType=s,a._granularity=p,a):(C.polylinePositions=r,C.shapePositions=o,C.cornerType=s,C.granularity=p,new _(C))};var b=new l.BoundingRectangle;return _.createGeometry=function(e){var i=e._positions,a=o.arrayRemoveDuplicates(i,d.Cartesian3.equalsEpsilon),n=e._shape;if(n=v.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(n),!(a.length<2||n.length<3)){u.PolygonPipeline.computeWindingOrder2D(n)===u.WindingOrder.CLOCKWISE&&n.reverse();var t=l.BoundingRectangle.fromPoints(n,b);return function(e,i){var a=new f.GeometryAttributes;a.position=new g.GeometryAttribute({componentDatatype:h.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});var n,t,r=i.length,o=a.position.values.length/3,l=e.length/3/r,s=m.IndexDatatype.createTypedArray(o,2*r*(1+l)),p=0,c=(n=0)*r;for(t=0;t<r-1;t++)s[p++]=t+c,s[p++]=t+c+1;for(s[p++]=r-1+c,s[p++]=c,c=(n=l-1)*r,t=0;t<r-1;t++)s[p++]=t+c,s[p++]=t+c+1;for(s[p++]=r-1+c,s[p++]=c,n=0;n<l-1;n++){var d=r*n,u=d+r;for(t=0;t<r;t++)s[p++]=t+d,s[p++]=t+u}return new g.Geometry({attributes:a,indices:m.IndexDatatype.createTypedArray(o,s),boundingSphere:y.BoundingSphere.fromVertices(e),primitiveType:g.PrimitiveType.LINES})}(v.PolylineVolumeGeometryLibrary.computePositions(a,n,t,e,!1),n)}},function(e,i){return c.defined(i)&&(e=_.unpack(e,i)),e._ellipsoid=d.Ellipsoid.clone(e._ellipsoid),_.createGeometry(e)}});
