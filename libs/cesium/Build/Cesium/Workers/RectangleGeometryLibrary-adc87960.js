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
define(["exports","./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./Transforms-fa4f10bc","./GeometryAttribute-3345e440"],function(t,f,n,O,b,a,G){"use strict";var p=Math.cos,v=Math.sin,x=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i=n.radiiSquared,g=t.nwCorner,c=t.boundingRectangle,h=g.latitude-t.granYCos*r+e*t.granXSin,u=p(h),C=v(h),l=i.z*C,S=g.longitude+r*t.granYSin+e*t.granXCos,d=u*p(S),w=u*v(S),M=i.x*d,X=i.y*w,Y=x(M*d+X*w+l*C);if(o.x=M/Y,o.y=X/Y,o.z=l/Y,a){var m=t.stNwCorner;f.defined(m)?(h=m.latitude-t.stGranYCos*r+e*t.stGranXSin,S=m.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(S-t.stWest)*t.lonScalar,s.y=(h-t.stSouth)*t.latScalar):(s.x=(S-c.west)*t.lonScalar,s.y=(h-c.south)*t.latScalar)}}},R=new G.Matrix2,y=new b.Cartesian3,P=new b.Cartographic,W=new b.Cartesian3,_=new a.GeographicProjection;function T(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,c=a*i,h=Math.sin(n),u=r*h,C=a*h;y=_.project(t,y),y=b.Cartesian3.subtract(y,W,y);var l=G.Matrix2.fromRotation(n,R);y=G.Matrix2.multiplyByVector(l,y,y),y=b.Cartesian3.add(y,W,y),--o,--s;var S=(t=_.unproject(y,t)).latitude,d=S+o*C,w=S-g*s,M=S-g*s+o*C,X=Math.max(S,d,w,M),Y=Math.min(S,d,w,M),m=t.longitude,f=m+o*c,p=m+s*u,v=m+s*u+o*c;return{north:X,south:Y,east:Math.max(m,f,p,v),west:Math.min(m,f,p,v),granYCos:g,granYSin:u,granXCos:c,granXSin:C,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i,g,c,h,u,C=t.east,l=t.west,S=t.north,d=t.south,w=!1,M=!1;S===O.CesiumMath.PI_OVER_TWO&&(w=!0),d===-O.CesiumMath.PI_OVER_TWO&&(M=!0);var X=S-d;c=(u=C<l?O.CesiumMath.TWO_PI-l+C:C-l)/((i=Math.ceil(u/n)+1)-1),h=X/((g=Math.ceil(X/n)+1)-1);var Y=b.Rectangle.northwest(t,o),m=b.Rectangle.center(t,P);0===a&&0===r||(m.longitude<Y.longitude&&(m.longitude+=O.CesiumMath.TWO_PI),W=_.project(m,W));var f=h,p=c,v=b.Rectangle.clone(t,e),G={granYCos:f,granYSin:0,granXCos:p,granXSin:0,nwCorner:Y,boundingRectangle:v,width:i,height:g,northCap:w,southCap:M};if(0!==a){var x=T(Y,a,c,h,0,i,g);S=x.north,d=x.south,C=x.east,l=x.west,G.granYCos=x.granYCos,G.granYSin=x.granYSin,G.granXCos=x.granXCos,G.granXSin=x.granXSin,v.north=S,v.south=d,v.east=C,v.west=l}if(0!==r){a-=r;var R=b.Rectangle.northwest(v,s),y=T(R,a,c,h,0,i,g);G.stGranYCos=y.granYCos,G.stGranXCos=y.granXCos,G.stGranYSin=y.granYSin,G.stGranXSin=y.granXSin,G.stNwCorner=R,G.stWest=y.west,G.stSouth=y.south}return G},t.RectangleGeometryLibrary=r});
