/* This file is automatically rebuilt by the Cesium build process. */
define(['exports'], function (exports) { 'use strict';

    /**
         * @exports defined
         *
         * @param {*} value The object.
         * @returns {Boolean} Returns true if the object is defined, returns false otherwise.
         *
         * @example
         * if (Cesium.defined(positions)) {
         *      doSomething();
         * } else {
         *      doSomethingElse();
         * }
         */
        function defined(value) {
            return value !== undefined && value !== null;
        }

    exports.defined = defined;

});
