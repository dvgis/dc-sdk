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
define(["./when-0488ac89"],function(i){"use strict";return function(s){var a;return function(e){var r=e.data,n=[],t={id:r.id,result:void 0,error:void 0};return i.when(function(e,r,n){try{return e(r,n)}catch(e){return i.when.reject(e)}}(s,r.parameters,n)).then(function(e){t.result=e}).otherwise(function(e){e instanceof Error?t.error={name:e.name,message:e.message,stack:e.stack}:t.error=e}).always(function(){i.defined(a)||(a=i.defaultValue(self.webkitPostMessage,self.postMessage)),r.canTransferArrayBuffer||(n.length=0);try{a(t,n)}catch(e){t.result=void 0,t.error="postMessage failed with error: "+function(e){var r,n=e.name,t=e.message;r=i.defined(n)&&i.defined(t)?n+": "+t:e.toString();var s=e.stack;return i.defined(s)&&(r+="\n"+s),r}(e)+"\n  with responseMessage: "+JSON.stringify(t),a(t)}})}}});
