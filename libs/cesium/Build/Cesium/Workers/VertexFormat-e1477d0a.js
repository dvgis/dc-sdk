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
define(["exports","./when-a55a8a4c","./Check-bc1d37d9"],function(e,o,t){"use strict";function a(e){e=o.defaultValue(e,o.defaultValue.EMPTY_OBJECT),this.position=o.defaultValue(e.position,!1),this.normal=o.defaultValue(e.normal,!1),this.st=o.defaultValue(e.st,!1),this.bitangent=o.defaultValue(e.bitangent,!1),this.tangent=o.defaultValue(e.tangent,!1),this.color=o.defaultValue(e.color,!1)}a.POSITION_ONLY=Object.freeze(new a({position:!0})),a.POSITION_AND_NORMAL=Object.freeze(new a({position:!0,normal:!0})),a.POSITION_NORMAL_AND_ST=Object.freeze(new a({position:!0,normal:!0,st:!0})),a.POSITION_AND_ST=Object.freeze(new a({position:!0,st:!0})),a.POSITION_AND_COLOR=Object.freeze(new a({position:!0,color:!0})),a.ALL=Object.freeze(new a({position:!0,normal:!0,st:!0,tangent:!0,bitangent:!0})),a.DEFAULT=a.POSITION_NORMAL_AND_ST,a.packedLength=6,a.pack=function(e,t,n){return n=o.defaultValue(n,0),t[n++]=e.position?1:0,t[n++]=e.normal?1:0,t[n++]=e.st?1:0,t[n++]=e.tangent?1:0,t[n++]=e.bitangent?1:0,t[n]=e.color?1:0,t},a.unpack=function(e,t,n){return t=o.defaultValue(t,0),o.defined(n)||(n=new a),n.position=1===e[t++],n.normal=1===e[t++],n.st=1===e[t++],n.tangent=1===e[t++],n.bitangent=1===e[t++],n.color=1===e[t],n},a.clone=function(e,t){if(o.defined(e))return o.defined(t)||(t=new a),t.position=e.position,t.normal=e.normal,t.st=e.st,t.tangent=e.tangent,t.bitangent=e.bitangent,t.color=e.color,t},e.VertexFormat=a});
