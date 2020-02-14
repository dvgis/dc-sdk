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
define(["exports","./when-0488ac89","./Math-8a4c9da1","./Cartesian2-cc1e6450","./EllipsoidTangentPlane-70069c84","./PolygonPipeline-5e2e1765","./PolylinePipeline-1e8e81a9"],function(e,C,A,w,E,O,M){"use strict";var i={};var b=new w.Cartographic,L=new w.Cartographic;var F=new Array(2),H=new Array(2),T={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};i.computePositions=function(e,i,t,n,r,o){var a=function(e,i,t,n){var r=i.length;if(!(r<2)){var o=C.defined(n),a=C.defined(t),l=!0,h=new Array(r),s=new Array(r),g=new Array(r),p=i[0];h[0]=p;var P=e.cartesianToCartographic(p,b);a&&(P.height=t[0]),l=l&&P.height<=0,s[0]=P.height,g[0]=o?n[0]:0;for(var c,d,u=1,v=1;v<r;++v){var y=i[v],m=e.cartesianToCartographic(y,L);a&&(m.height=t[v]),l=l&&m.height<=0,c=P,d=m,A.CesiumMath.equalsEpsilon(c.latitude,d.latitude,A.CesiumMath.EPSILON14)&&A.CesiumMath.equalsEpsilon(c.longitude,d.longitude,A.CesiumMath.EPSILON14)?P.height<m.height&&(s[u-1]=m.height):(h[u]=y,s[u]=m.height,g[u]=o?n[v]:0,w.Cartographic.clone(m,P),++u)}if(!(l||u<2))return h.length=u,s.length=u,g.length=u,{positions:h,topHeights:s,bottomHeights:g}}}(e,i,t,n);if(C.defined(a)){if(i=a.positions,t=a.topHeights,n=a.bottomHeights,3<=i.length){var l=E.EllipsoidTangentPlane.fromPoints(i,e).projectPointsOntoPlane(i);O.PolygonPipeline.computeWindingOrder2D(l)===O.WindingOrder.CLOCKWISE&&(i.reverse(),t.reverse(),n.reverse())}var h,s,g=i.length,p=g-2,P=A.CesiumMath.chordLength(r,e.maximumRadius),c=T;if(c.minDistance=P,c.ellipsoid=e,o){var d,u=0;for(d=0;d<g-1;d++)u+=M.PolylinePipeline.numberOfPoints(i[d],i[d+1],P)+1;h=new Float64Array(3*u),s=new Float64Array(3*u);var v=F,y=H;c.positions=v,c.height=y;var m=0;for(d=0;d<g-1;d++){v[0]=i[d],v[1]=i[d+1],y[0]=t[d],y[1]=t[d+1];var f=M.PolylinePipeline.generateArc(c);h.set(f,m),y[0]=n[d],y[1]=n[d+1],s.set(M.PolylinePipeline.generateArc(c),m),m+=f.length}}else c.positions=i,c.height=t,h=new Float64Array(M.PolylinePipeline.generateArc(c)),c.height=n,s=new Float64Array(M.PolylinePipeline.generateArc(c));return{bottomPositions:s,topPositions:h,numCorners:p}}},e.WallGeometryLibrary=i});
