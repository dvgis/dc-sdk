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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./IndexDatatype-2bcfc06b","./IntersectionTests-59cef209","./Plane-b1ca737b","./arrayRemoveDuplicates-33a93436","./BoundingRectangle-dfcb2ccf","./EllipsoidTangentPlane-8dc9a637","./EllipsoidRhumbLine-d5a5f3d0","./PolygonPipeline-75c02603","./PolylineVolumeGeometryLibrary-dcbe9b14","./EllipsoidGeodesic-666ad0d2","./PolylinePipeline-90090425"],function(d,e,i,c,a,u,n,y,t,r,f,h,o,g,m,l,s,p,v,E,b,P,_,k,C){"use strict";function L(e){var i=(e=c.defaultValue(e,c.defaultValue.EMPTY_OBJECT)).polylinePositions,n=e.shapePositions;this._positions=i,this._shape=n,this._ellipsoid=u.Ellipsoid.clone(c.defaultValue(e.ellipsoid,u.Ellipsoid.WGS84)),this._cornerType=c.defaultValue(e.cornerType,_.CornerType.ROUNDED),this._granularity=c.defaultValue(e.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";var t=1+i.length*u.Cartesian3.packedLength;t+=1+n.length*u.Cartesian2.packedLength,this.packedLength=t+u.Ellipsoid.packedLength+2}L.pack=function(e,i,n){var t;n=c.defaultValue(n,0);var a=e._positions,r=a.length;for(i[n++]=r,t=0;t<r;++t,n+=u.Cartesian3.packedLength)u.Cartesian3.pack(a[t],i,n);var o=e._shape;for(r=o.length,i[n++]=r,t=0;t<r;++t,n+=u.Cartesian2.packedLength)u.Cartesian2.pack(o[t],i,n);return u.Ellipsoid.pack(e._ellipsoid,i,n),n+=u.Ellipsoid.packedLength,i[n++]=e._cornerType,i[n]=e._granularity,i};var T=u.Ellipsoid.clone(u.Ellipsoid.UNIT_SPHERE),D={polylinePositions:void 0,shapePositions:void 0,ellipsoid:T,height:void 0,cornerType:void 0,granularity:void 0};L.unpack=function(e,i,n){var t;i=c.defaultValue(i,0);var a=e[i++],r=new Array(a);for(t=0;t<a;++t,i+=u.Cartesian3.packedLength)r[t]=u.Cartesian3.unpack(e,i);a=e[i++];var o=new Array(a);for(t=0;t<a;++t,i+=u.Cartesian2.packedLength)o[t]=u.Cartesian2.unpack(e,i);var l=u.Ellipsoid.unpack(e,i,T);i+=u.Ellipsoid.packedLength;var s=e[i++],p=e[i];return d.defined(n)?(n._positions=r,n._shape=o,n._ellipsoid=u.Ellipsoid.clone(l,n._ellipsoid),n._cornerType=s,n._granularity=p,n):(D.polylinePositions=r,D.shapePositions=o,D.cornerType=s,D.granularity=p,new L(D))};var G=new v.BoundingRectangle;return L.createGeometry=function(e){var i=e._positions,n=p.arrayRemoveDuplicates(i,u.Cartesian3.equalsEpsilon),t=e._shape;if(t=_.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(t),!(n.length<2||t.length<3)){P.PolygonPipeline.computeWindingOrder2D(t)===P.WindingOrder.CLOCKWISE&&t.reverse();var a=v.BoundingRectangle.fromPoints(t,G);return function(e,i){var n=new g.GeometryAttributes;n.position=new h.GeometryAttribute({componentDatatype:f.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});var t,a,r=i.length,o=n.position.values.length/3,l=e.length/3/r,s=m.IndexDatatype.createTypedArray(o,2*r*(1+l)),p=0,d=(t=0)*r;for(a=0;a<r-1;a++)s[p++]=a+d,s[p++]=a+d+1;for(s[p++]=r-1+d,s[p++]=d,d=(t=l-1)*r,a=0;a<r-1;a++)s[p++]=a+d,s[p++]=a+d+1;for(s[p++]=r-1+d,s[p++]=d,t=0;t<l-1;t++){var c=r*t,u=c+r;for(a=0;a<r;a++)s[p++]=a+c,s[p++]=a+u}return new h.Geometry({attributes:n,indices:m.IndexDatatype.createTypedArray(o,s),boundingSphere:y.BoundingSphere.fromVertices(e),primitiveType:h.PrimitiveType.LINES})}(_.PolylineVolumeGeometryLibrary.computePositions(n,t,a,e,!1),t)}},function(e,i){return d.defined(i)&&(e=L.unpack(e,i)),e._ellipsoid=u.Ellipsoid.clone(e._ellipsoid),L.createGeometry(e)}});
