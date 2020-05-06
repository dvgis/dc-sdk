/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-ef0df1c5', './Check-eef37841', './Math-9bc506ad', './Cartesian2-e248b6a8', './Transforms-f7ab23c1', './RuntimeError-0a1a187a', './WebGLConstants-50edbdfc', './ComponentDatatype-5633ad88', './GeometryAttribute-aed2cdaf', './GeometryAttributes-cb2382b3', './GeometryOffsetAttribute-5a168f5d', './VertexFormat-ab7523e7', './BoxGeometry-389094f6'], function (when, Check, _Math, Cartesian2, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, GeometryOffsetAttribute, VertexFormat, BoxGeometry) { 'use strict';

  function createBoxGeometry(boxGeometry, offset) {
    if (when.defined(offset)) {
      boxGeometry = BoxGeometry.BoxGeometry.unpack(boxGeometry, offset);
    }
    return BoxGeometry.BoxGeometry.createGeometry(boxGeometry);
  }

  return createBoxGeometry;

});
