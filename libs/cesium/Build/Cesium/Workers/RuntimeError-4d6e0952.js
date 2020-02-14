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
define(["exports","./when-0488ac89"],function(t,r){"use strict";function e(t){var r;this.name="RuntimeError",this.message=t;try{throw new Error}catch(t){r=t.stack}this.stack=r}r.defined(Object.create)&&((e.prototype=Object.create(Error.prototype)).constructor=e),e.prototype.toString=function(){var t=this.name+": "+this.message;return r.defined(this.stack)&&(t+="\n"+this.stack.toString()),t},t.RuntimeError=e});
