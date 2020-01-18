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
define(["exports","./Math-7782f09e"],function(r,b){"use strict";var t={computePositions:function(r,t,e,a,i){var n,o=.5*r,s=-o,u=a+a,c=new Float64Array(3*(i?2*u:u)),f=0,h=0,y=i?3*u:0,M=i?3*(u+a):3*a;for(n=0;n<a;n++){var m=n/a*b.CesiumMath.TWO_PI,v=Math.cos(m),d=Math.sin(m),l=v*e,p=d*e,C=v*t,P=d*t;c[h+y]=l,c[h+y+1]=p,c[h+y+2]=s,c[h+M]=C,c[h+M+1]=P,c[h+M+2]=o,h+=3,i&&(c[f++]=l,c[f++]=p,c[f++]=s,c[f++]=C,c[f++]=P,c[f++]=o)}return c}};r.CylinderGeometryLibrary=t});
