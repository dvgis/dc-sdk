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
define(["exports","./Math-73a8bd13"],function(r,P){"use strict";var t={computePositions:function(r,t,a,e,i){var n,o=.5*r,s=-o,u=e+e,c=new Float64Array(3*(i?2*u:u)),f=0,h=0,y=i?3*u:0,M=i?3*(u+e):3*e;for(n=0;n<e;n++){var d=n/e*P.CesiumMath.TWO_PI,m=Math.cos(d),v=Math.sin(d),b=m*a,l=v*a,p=m*t,C=v*t;c[h+y]=b,c[h+y+1]=l,c[h+y+2]=s,c[h+M]=p,c[h+M+1]=C,c[h+M+2]=o,h+=3,i&&(c[f++]=b,c[f++]=l,c[f++]=s,c[f++]=p,c[f++]=C,c[f++]=o)}return c}};r.CylinderGeometryLibrary=t});
