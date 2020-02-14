/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-76089d4c', './Check-5cd4f88e', './Math-4da9b357', './Cartesian2-88a9081c', './defineProperties-7057a760', './Transforms-7fc36d34', './RuntimeError-bd79d86c', './WebGLConstants-e4e9c6cc', './ComponentDatatype-7dd74ff6', './GeometryAttribute-21a3ec3f', './GeometryAttributes-36724c9f', './AttributeCompression-3a5fff57', './GeometryPipeline-29d12af3', './EncodedCartesian3-e0dcfcb4', './IndexDatatype-7c4ae249', './IntersectionTests-fc908a59', './Plane-f6fa0f8f', './PrimitivePipeline-27de0734', './WebMercatorProjection-b2b73805', './createTaskProcessorWorker'], function (when, Check, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, PrimitivePipeline, WebMercatorProjection, createTaskProcessorWorker) { 'use strict';

    /* global require */

        var moduleCache = {};

        function getModule(moduleName) {
            var module = moduleCache[moduleName];
            if (!when.defined(module)) {
                if (typeof exports === 'object') {
                    // Use CommonJS-style require.
                    moduleCache[module] = module = require('Workers/' + moduleName);
                } else {
                    // Use AMD-style require.
                    // in web workers, require is synchronous
                    require(['Workers/' + moduleName], function(f) {
                        module = f;
                        moduleCache[module] = f;
                    });
                }
            }
            return module;
        }

        function createGeometry(parameters, transferableObjects) {
            var subTasks = parameters.subTasks;
            var length = subTasks.length;
            var resultsOrPromises = new Array(length);

            for (var i = 0; i < length; i++) {
                var task = subTasks[i];
                var geometry = task.geometry;
                var moduleName = task.moduleName;

                if (when.defined(moduleName)) {
                    var createFunction = getModule(moduleName);
                    resultsOrPromises[i] = createFunction(geometry, task.offset);
                } else {
                    //Already created geometry
                    resultsOrPromises[i] = geometry;
                }
            }

            return when.when.all(resultsOrPromises, function(results) {
                return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(results, transferableObjects);
            });
        }
    var createGeometry$1 = createTaskProcessorWorker(createGeometry);

    return createGeometry$1;

});
