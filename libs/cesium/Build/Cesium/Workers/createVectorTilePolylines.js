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
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./WebGLConstants-4c11ee5f","./AttributeCompression-fbcb3321","./IndexDatatype-486e7786","./createTaskProcessorWorker"],function(a,e,W,B,r,z,H,n){"use strict";var O=32767,Y=new B.Cartographic,Z=new B.Cartesian3;var j=new B.Rectangle,q=new B.Ellipsoid,J=new B.Cartesian3,K={min:void 0,max:void 0};var Q=new B.Cartesian3,V=new B.Cartesian3,X=new B.Cartesian3,$=new B.Cartesian3,aa=new B.Cartesian3;return n(function(a,e){var r=new Uint16Array(a.positions),n=new Uint16Array(a.widths),t=new Uint32Array(a.counts),i=new Uint16Array(a.batchIds);!function(a){a=new Float64Array(a);var e=0;K.min=a[e++],K.max=a[e++],B.Rectangle.unpack(a,e,j),e+=B.Rectangle.packedLength,B.Ellipsoid.unpack(a,e,q),e+=B.Ellipsoid.packedLength,B.Cartesian3.unpack(a,e,J)}(a.packedBuffer);var s,u=q,c=J,o=function(a,e,r,n,t){var i=a.length/3,s=a.subarray(0,i),u=a.subarray(i,2*i),c=a.subarray(2*i,3*i);z.AttributeCompression.zigZagDeltaDecode(s,u,c);for(var o=new Float32Array(a.length),f=0;f<i;++f){var p=s[f],C=u[f],d=c[f],b=W.CesiumMath.lerp(e.west,e.east,p/O),l=W.CesiumMath.lerp(e.south,e.north,C/O),w=W.CesiumMath.lerp(r,n,d/O),h=B.Cartographic.fromRadians(b,l,w,Y),y=t.cartographicToCartesian(h,Z);B.Cartesian3.pack(y,o,3*f)}return o}(r,j,K.min,K.max,u),f=o.length/3,p=4*f-4,C=new Float32Array(3*p),d=new Float32Array(3*p),b=new Float32Array(3*p),l=new Float32Array(2*p),w=new Uint16Array(p),h=0,y=0,k=0,v=0,A=t.length;for(s=0;s<A;++s){for(var g=t[s],m=n[s],x=i[s],E=0;E<g;++E){var D;if(0===E){var I=B.Cartesian3.unpack(o,3*v,Q),T=B.Cartesian3.unpack(o,3*(v+1),V);D=B.Cartesian3.subtract(I,T,X),B.Cartesian3.add(I,D,D)}else D=B.Cartesian3.unpack(o,3*(v+E-1),X);var U,F=B.Cartesian3.unpack(o,3*(v+E),$);if(E===g-1){var N=B.Cartesian3.unpack(o,3*(v+g-1),Q),R=B.Cartesian3.unpack(o,3*(v+g-2),V);U=B.Cartesian3.subtract(N,R,aa),B.Cartesian3.add(N,U,U)}else U=B.Cartesian3.unpack(o,3*(v+E+1),aa);B.Cartesian3.subtract(D,c,D),B.Cartesian3.subtract(F,c,F),B.Cartesian3.subtract(U,c,U);for(var M=E===g-1?2:4,P=0===E?2:0;P<M;++P){B.Cartesian3.pack(F,C,h),B.Cartesian3.pack(D,d,h),B.Cartesian3.pack(U,b,h),h+=3;var L=P-2<0?-1:1;l[y++]=P%2*2-1,l[y++]=L*m,w[k++]=x}}v+=g}var S=H.IndexDatatype.createTypedArray(p,6*f-6),_=0,G=0;for(A=f-1,s=0;s<A;++s)S[G++]=_,S[G++]=_+2,S[G++]=_+1,S[G++]=_+1,S[G++]=_+2,S[G++]=_+3,_+=4;return e.push(C.buffer,d.buffer,b.buffer),e.push(l.buffer,w.buffer,S.buffer),{indexDatatype:2===S.BYTES_PER_ELEMENT?H.IndexDatatype.UNSIGNED_SHORT:H.IndexDatatype.UNSIGNED_INT,currentPositions:C.buffer,previousPositions:d.buffer,nextPositions:b.buffer,expandAndWidth:l.buffer,batchIds:w.buffer,indices:S.buffer}})});
