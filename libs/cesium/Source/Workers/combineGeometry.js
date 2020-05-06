/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-ef0df1c5', './Check-eef37841', './Math-9bc506ad', './Cartesian2-e248b6a8', './Transforms-f7ab23c1', './RuntimeError-0a1a187a', './WebGLConstants-50edbdfc', './ComponentDatatype-5633ad88', './GeometryAttribute-aed2cdaf', './GeometryAttributes-cb2382b3', './AttributeCompression-7fe95165', './GeometryPipeline-0dde740d', './EncodedCartesian3-eda74fa8', './IndexDatatype-1715c2a7', './IntersectionTests-86344c58', './Plane-a866d2d6', './PrimitivePipeline-17017592', './WebMercatorProjection-3125aebd', './createTaskProcessorWorker'], function (when, Check, _Math, Cartesian2, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, PrimitivePipeline, WebMercatorProjection, createTaskProcessorWorker) { 'use strict';

  function combineGeometry(packedParameters, transferableObjects) {
    var parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(
      packedParameters
    );
    var results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters);
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(
      results,
      transferableObjects
    );
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry);

  return combineGeometry$1;

});
