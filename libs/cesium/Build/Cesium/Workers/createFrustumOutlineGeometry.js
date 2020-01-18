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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./Plane-b1ca737b","./VertexFormat-e2e35139","./FrustumGeometry-4af03899"],function(s,e,t,p,r,m,n,d,a,i,h,g,u,_,o,c,k){"use strict";var f=0,l=1;function y(e){var t,r,n=e.frustum,a=e.orientation,i=e.origin,u=p.defaultValue(e._drawNearPlane,!0);n instanceof k.PerspectiveFrustum?(t=f,r=k.PerspectiveFrustum.packedLength):n instanceof k.OrthographicFrustum&&(t=l,r=k.OrthographicFrustum.packedLength),this._frustumType=t,this._frustum=n.clone(),this._origin=m.Cartesian3.clone(i),this._orientation=d.Quaternion.clone(a),this._drawNearPlane=u,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+r+m.Cartesian3.packedLength+d.Quaternion.packedLength}y.pack=function(e,t,r){r=p.defaultValue(r,0);var n=e._frustumType,a=e._frustum;return(t[r++]=n)===f?(k.PerspectiveFrustum.pack(a,t,r),r+=k.PerspectiveFrustum.packedLength):(k.OrthographicFrustum.pack(a,t,r),r+=k.OrthographicFrustum.packedLength),m.Cartesian3.pack(e._origin,t,r),r+=m.Cartesian3.packedLength,d.Quaternion.pack(e._orientation,t,r),t[r+=d.Quaternion.packedLength]=e._drawNearPlane?1:0,t};var v=new k.PerspectiveFrustum,F=new k.OrthographicFrustum,w=new d.Quaternion,P=new m.Cartesian3;return y.unpack=function(e,t,r){t=p.defaultValue(t,0);var n,a=e[t++];a===f?(n=k.PerspectiveFrustum.unpack(e,t,v),t+=k.PerspectiveFrustum.packedLength):(n=k.OrthographicFrustum.unpack(e,t,F),t+=k.OrthographicFrustum.packedLength);var i=m.Cartesian3.unpack(e,t,P);t+=m.Cartesian3.packedLength;var u=d.Quaternion.unpack(e,t,w),o=1===e[t+=d.Quaternion.packedLength];if(!s.defined(r))return new y({frustum:n,origin:i,orientation:u,_drawNearPlane:o});var c=a===r._frustumType?r._frustum:void 0;return r._frustum=n.clone(c),r._frustumType=a,r._origin=m.Cartesian3.clone(i,r._origin),r._orientation=d.Quaternion.clone(u,r._orientation),r._drawNearPlane=o,r},y.createGeometry=function(e){var t=e._frustumType,r=e._frustum,n=e._origin,a=e._orientation,i=e._drawNearPlane,u=new Float64Array(24);k.FrustumGeometry._computeNearFarPlanes(n,a,t,r,u);for(var o,c,s=new _.GeometryAttributes({position:new g.GeometryAttribute({componentDatatype:h.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u})}),p=i?2:1,m=new Uint16Array(8*(1+p)),f=i?0:1;f<2;++f)c=4*f,m[o=i?8*f:0]=c,m[o+1]=c+1,m[o+2]=c+1,m[o+3]=c+2,m[o+4]=c+2,m[o+5]=c+3,m[o+6]=c+3,m[o+7]=c;for(f=0;f<2;++f)c=4*f,m[o=8*(p+f)]=c,m[o+1]=c+4,m[o+2]=c+1,m[o+3]=c+5,m[o+4]=c+2,m[o+5]=c+6,m[o+6]=c+3,m[o+7]=c+7;return new g.Geometry({attributes:s,indices:m,primitiveType:g.PrimitiveType.LINES,boundingSphere:d.BoundingSphere.fromVertices(u)})},function(e,t){return s.defined(t)&&(e=y.unpack(e,t)),y.createGeometry(e)}});
