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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./WebGLConstants-90dbfe2f","./when-1faa3867","./AttributeCompression-5601f533","./IndexDatatype-2bcfc06b","./createTaskProcessorWorker"],function(a,e,r,t,W,z,n,i,s,B,O,f){"use strict";var j=32767,H=new z.Cartographic,V=new z.Cartesian3;var Y=new z.Rectangle,Z=new z.Ellipsoid,q=new z.Cartesian3,J={min:void 0,max:void 0};var K=new z.Cartesian3,Q=new z.Cartesian3,X=new z.Cartesian3,$=new z.Cartesian3,aa=new z.Cartesian3;return f(function(a,e){var r=new Uint16Array(a.positions),t=new Uint16Array(a.widths),n=new Uint32Array(a.counts),i=new Uint16Array(a.batchIds);!function(a){a=new Float64Array(a);var e=0;J.min=a[e++],J.max=a[e++],z.Rectangle.unpack(a,e,Y),e+=z.Rectangle.packedLength,z.Ellipsoid.unpack(a,e,Z),e+=z.Ellipsoid.packedLength,z.Cartesian3.unpack(a,e,q)}(a.packedBuffer);var s,f=Z,u=q,c=function(a,e,r,t,n){var i=a.length/3,s=a.subarray(0,i),f=a.subarray(i,2*i),u=a.subarray(2*i,3*i);B.AttributeCompression.zigZagDeltaDecode(s,f,u);for(var c=new Float32Array(a.length),o=0;o<i;++o){var p=s[o],C=f[o],d=u[o],b=W.CesiumMath.lerp(e.west,e.east,p/j),l=W.CesiumMath.lerp(e.south,e.north,C/j),w=W.CesiumMath.lerp(r,t,d/j),h=z.Cartographic.fromRadians(b,l,w,H),y=n.cartographicToCartesian(h,V);z.Cartesian3.pack(y,c,3*o)}return c}(r,Y,J.min,J.max,f),o=c.length/3,p=4*o-4,C=new Float32Array(3*p),d=new Float32Array(3*p),b=new Float32Array(3*p),l=new Float32Array(2*p),w=new Uint16Array(p),h=0,y=0,k=0,v=0,A=n.length;for(s=0;s<A;++s){for(var g=n[s],m=t[s],x=i[s],E=0;E<g;++E){var D;if(0===E){var I=z.Cartesian3.unpack(c,3*v,K),T=z.Cartesian3.unpack(c,3*(v+1),Q);D=z.Cartesian3.subtract(I,T,X),z.Cartesian3.add(I,D,D)}else D=z.Cartesian3.unpack(c,3*(v+E-1),X);var U,F=z.Cartesian3.unpack(c,3*(v+E),$);if(E===g-1){var N=z.Cartesian3.unpack(c,3*(v+g-1),K),P=z.Cartesian3.unpack(c,3*(v+g-2),Q);U=z.Cartesian3.subtract(N,P,aa),z.Cartesian3.add(N,U,U)}else U=z.Cartesian3.unpack(c,3*(v+E+1),aa);z.Cartesian3.subtract(D,u,D),z.Cartesian3.subtract(F,u,F),z.Cartesian3.subtract(U,u,U);for(var R=E===g-1?2:4,M=0===E?2:0;M<R;++M){z.Cartesian3.pack(F,C,h),z.Cartesian3.pack(D,d,h),z.Cartesian3.pack(U,b,h),h+=3;var L=M-2<0?-1:1;l[y++]=M%2*2-1,l[y++]=L*m,w[k++]=x}}v+=g}var S=O.IndexDatatype.createTypedArray(p,6*o-6),_=0,G=0;for(A=o-1,s=0;s<A;++s)S[G++]=_,S[G++]=_+2,S[G++]=_+1,S[G++]=_+1,S[G++]=_+2,S[G++]=_+3,_+=4;return e.push(C.buffer,d.buffer,b.buffer),e.push(l.buffer,w.buffer,S.buffer),{indexDatatype:2===S.BYTES_PER_ELEMENT?O.IndexDatatype.UNSIGNED_SHORT:O.IndexDatatype.UNSIGNED_INT,currentPositions:C.buffer,previousPositions:d.buffer,nextPositions:b.buffer,expandAndWidth:l.buffer,batchIds:w.buffer,indices:S.buffer}})});
