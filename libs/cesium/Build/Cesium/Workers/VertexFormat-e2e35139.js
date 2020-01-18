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
define(["exports","./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af"],function(e,o,t,n,a){"use strict";function i(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),this.position=a.defaultValue(e.position,!1),this.normal=a.defaultValue(e.normal,!1),this.st=a.defaultValue(e.st,!1),this.bitangent=a.defaultValue(e.bitangent,!1),this.tangent=a.defaultValue(e.tangent,!1),this.color=a.defaultValue(e.color,!1)}i.POSITION_ONLY=n.freezeObject(new i({position:!0})),i.POSITION_AND_NORMAL=n.freezeObject(new i({position:!0,normal:!0})),i.POSITION_NORMAL_AND_ST=n.freezeObject(new i({position:!0,normal:!0,st:!0})),i.POSITION_AND_ST=n.freezeObject(new i({position:!0,st:!0})),i.POSITION_AND_COLOR=n.freezeObject(new i({position:!0,color:!0})),i.ALL=n.freezeObject(new i({position:!0,normal:!0,st:!0,tangent:!0,bitangent:!0})),i.DEFAULT=i.POSITION_NORMAL_AND_ST,i.packedLength=6,i.pack=function(e,t,n){return n=a.defaultValue(n,0),t[n++]=e.position?1:0,t[n++]=e.normal?1:0,t[n++]=e.st?1:0,t[n++]=e.tangent?1:0,t[n++]=e.bitangent?1:0,t[n]=e.color?1:0,t},i.unpack=function(e,t,n){return t=a.defaultValue(t,0),o.defined(n)||(n=new i),n.position=1===e[t++],n.normal=1===e[t++],n.st=1===e[t++],n.tangent=1===e[t++],n.bitangent=1===e[t++],n.color=1===e[t],n},i.clone=function(e,t){if(o.defined(e))return o.defined(t)||(t=new i),t.position=e.position,t.normal=e.normal,t.st=e.st,t.tangent=e.tangent,t.bitangent=e.bitangent,t.color=e.color,t},e.VertexFormat=i});
