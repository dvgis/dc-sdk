/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-e6e3e713', './Check-1df6b9a0', './Math-c5f6c994', './Cartesian2-1d7364fa', './Transforms-943e8463', './RuntimeError-717c34db', './WebGLConstants-7f7d68ac', './ComponentDatatype-2b8834a4', './GeometryAttribute-3a303898', './GeometryAttributes-6cf4559b', './AttributeCompression-d68d64ef', './GeometryPipeline-2d6c52b2', './EncodedCartesian3-d723731d', './IndexDatatype-e2961542', './IntersectionTests-c05f88ce', './Plane-2e419ea5', './GeometryOffsetAttribute-2677f2ec', './VertexFormat-3b318cdc', './EllipseGeometryLibrary-4fb46d5e', './GeometryInstance-9c21278b', './EllipseGeometry-d044dd63'], function (when, Check, _Math, Cartesian2, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, GeometryOffsetAttribute, VertexFormat, EllipseGeometryLibrary, GeometryInstance, EllipseGeometry) { 'use strict';

    function createEllipseGeometry(ellipseGeometry, offset) {
            if (when.defined(offset)) {
                ellipseGeometry = EllipseGeometry.EllipseGeometry.unpack(ellipseGeometry, offset);
            }
            ellipseGeometry._center = Cartesian2.Cartesian3.clone(ellipseGeometry._center);
            ellipseGeometry._ellipsoid = Cartesian2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
            return EllipseGeometry.EllipseGeometry.createGeometry(ellipseGeometry);
        }

    return createEllipseGeometry;

});
