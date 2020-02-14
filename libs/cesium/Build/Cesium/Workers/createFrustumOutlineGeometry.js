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
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b","./Plane-466db411","./VertexFormat-7996cb24","./FrustumGeometry-c9257195"],function(s,e,t,p,r,d,n,a,f,g,_,i,u,k){"use strict";var m=0,o=1;function h(e){var t,r,n=e.frustum,a=e.orientation,i=e.origin,u=s.defaultValue(e._drawNearPlane,!0);n instanceof k.PerspectiveFrustum?(t=m,r=k.PerspectiveFrustum.packedLength):n instanceof k.OrthographicFrustum&&(t=o,r=k.OrthographicFrustum.packedLength),this._frustumType=t,this._frustum=n.clone(),this._origin=p.Cartesian3.clone(i),this._orientation=d.Quaternion.clone(a),this._drawNearPlane=u,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+r+p.Cartesian3.packedLength+d.Quaternion.packedLength}h.pack=function(e,t,r){r=s.defaultValue(r,0);var n=e._frustumType,a=e._frustum;return(t[r++]=n)===m?(k.PerspectiveFrustum.pack(a,t,r),r+=k.PerspectiveFrustum.packedLength):(k.OrthographicFrustum.pack(a,t,r),r+=k.OrthographicFrustum.packedLength),p.Cartesian3.pack(e._origin,t,r),r+=p.Cartesian3.packedLength,d.Quaternion.pack(e._orientation,t,r),t[r+=d.Quaternion.packedLength]=e._drawNearPlane?1:0,t};var l=new k.PerspectiveFrustum,y=new k.OrthographicFrustum,v=new d.Quaternion,F=new p.Cartesian3;return h.unpack=function(e,t,r){t=s.defaultValue(t,0);var n,a=e[t++];a===m?(n=k.PerspectiveFrustum.unpack(e,t,l),t+=k.PerspectiveFrustum.packedLength):(n=k.OrthographicFrustum.unpack(e,t,y),t+=k.OrthographicFrustum.packedLength);var i=p.Cartesian3.unpack(e,t,F);t+=p.Cartesian3.packedLength;var u=d.Quaternion.unpack(e,t,v),o=1===e[t+=d.Quaternion.packedLength];if(!s.defined(r))return new h({frustum:n,origin:i,orientation:u,_drawNearPlane:o});var c=a===r._frustumType?r._frustum:void 0;return r._frustum=n.clone(c),r._frustumType=a,r._origin=p.Cartesian3.clone(i,r._origin),r._orientation=d.Quaternion.clone(u,r._orientation),r._drawNearPlane=o,r},h.createGeometry=function(e){var t=e._frustumType,r=e._frustum,n=e._origin,a=e._orientation,i=e._drawNearPlane,u=new Float64Array(24);k.FrustumGeometry._computeNearFarPlanes(n,a,t,r,u);for(var o,c,s=new _.GeometryAttributes({position:new g.GeometryAttribute({componentDatatype:f.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u})}),p=i?2:1,m=new Uint16Array(8*(1+p)),h=i?0:1;h<2;++h)c=4*h,m[o=i?8*h:0]=c,m[o+1]=c+1,m[o+2]=c+1,m[o+3]=c+2,m[o+4]=c+2,m[o+5]=c+3,m[o+6]=c+3,m[o+7]=c;for(h=0;h<2;++h)c=4*h,m[o=8*(p+h)]=c,m[o+1]=c+4,m[o+2]=c+1,m[o+3]=c+5,m[o+4]=c+2,m[o+5]=c+6,m[o+6]=c+3,m[o+7]=c+7;return new g.Geometry({attributes:s,indices:m,primitiveType:g.PrimitiveType.LINES,boundingSphere:d.BoundingSphere.fromVertices(u)})},function(e,t){return s.defined(t)&&(e=h.unpack(e,t)),h.createGeometry(e)}});
