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
define(['exports', './defined-2a4f2d00'], function (exports, defined) { 'use strict';

    /**
         * Freezes an object, using Object.freeze if available, otherwise returns
         * the object unchanged.  This function should be used in setup code to prevent
         * errors from completely halting JavaScript execution in legacy browsers.
         *
         * @private
         *
         * @exports freezeObject
         */
        var freezeObject = Object.freeze;
        if (!defined.defined(freezeObject)) {
            freezeObject = function(o) {
                return o;
            };
        }
    var freezeObject$1 = freezeObject;

    exports.freezeObject = freezeObject$1;

});
