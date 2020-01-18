/* This file is automatically rebuilt by the Cesium build process. */
define(['./defined-26bd4a03', './Check-da037458', './freezeObject-2d83f591', './defaultValue-f2e68450', './Math-fa6e45cb', './Cartesian2-2a723276', './defineProperties-6f7a50f2', './Transforms-a312718d', './RuntimeError-ad75c885', './WebGLConstants-497deb20', './ComponentDatatype-69643096', './GeometryAttribute-bb8a556c', './when-ee12a2cb', './GeometryAttributes-eecc9f43', './IndexDatatype-3de60176', './GeometryOffsetAttribute-cb30cd97', './EllipseGeometryLibrary-c3a822fb', './EllipseOutlineGeometry-ac58dafa'], function (defined, Check, freezeObject, defaultValue, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, when, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, EllipseGeometryLibrary, EllipseOutlineGeometry) { 'use strict';

    /**
         * A description of the outline of a circle on the ellipsoid.
         *
         * @alias CircleOutlineGeometry
         * @constructor
         *
         * @param {Object} options Object with the following properties:
         * @param {Cartesian3} options.center The circle's center point in the fixed frame.
         * @param {Number} options.radius The radius in meters.
         * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid the circle will be on.
         * @param {Number} [options.height=0.0] The distance in meters between the circle and the ellipsoid surface.
         * @param {Number} [options.granularity=0.02] The angular distance between points on the circle in radians.
         * @param {Number} [options.extrudedHeight=0.0] The distance in meters between the circle's extruded face and the ellipsoid surface.
         * @param {Number} [options.numberOfVerticalLines=16] Number of lines to draw between the top and bottom of an extruded circle.
         *
         * @exception {DeveloperError} radius must be greater than zero.
         * @exception {DeveloperError} granularity must be greater than zero.
         *
         * @see CircleOutlineGeometry.createGeometry
         * @see Packable
         *
         * @example
         * // Create a circle.
         * var circle = new Cesium.CircleOutlineGeometry({
         *   center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
         *   radius : 100000.0
         * });
         * var geometry = Cesium.CircleOutlineGeometry.createGeometry(circle);
         */
        function CircleOutlineGeometry(options) {
            options = defaultValue.defaultValue(options, defaultValue.defaultValue.EMPTY_OBJECT);
            var radius = options.radius;

            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.number('radius', radius);
            //>>includeEnd('debug');

            var ellipseGeometryOptions = {
                center : options.center,
                semiMajorAxis : radius,
                semiMinorAxis : radius,
                ellipsoid : options.ellipsoid,
                height : options.height,
                extrudedHeight : options.extrudedHeight,
                granularity : options.granularity,
                numberOfVerticalLines : options.numberOfVerticalLines
            };
            this._ellipseGeometry = new EllipseOutlineGeometry.EllipseOutlineGeometry(ellipseGeometryOptions);
            this._workerName = 'createCircleOutlineGeometry';
        }

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        CircleOutlineGeometry.packedLength = EllipseOutlineGeometry.EllipseOutlineGeometry.packedLength;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {CircleOutlineGeometry} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        CircleOutlineGeometry.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            //>>includeEnd('debug');
            return EllipseOutlineGeometry.EllipseOutlineGeometry.pack(value._ellipseGeometry, array, startingIndex);
        };

        var scratchEllipseGeometry = new EllipseOutlineGeometry.EllipseOutlineGeometry({
            center : new Cartesian2.Cartesian3(),
            semiMajorAxis : 1.0,
            semiMinorAxis : 1.0
        });
        var scratchOptions = {
            center : new Cartesian2.Cartesian3(),
            radius : undefined,
            ellipsoid : Cartesian2.Ellipsoid.clone(Cartesian2.Ellipsoid.UNIT_SPHERE),
            height : undefined,
            extrudedHeight : undefined,
            granularity : undefined,
            numberOfVerticalLines : undefined,
            semiMajorAxis : undefined,
            semiMinorAxis : undefined
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {CircleOutlineGeometry} [result] The object into which to store the result.
         * @returns {CircleOutlineGeometry} The modified result parameter or a new CircleOutlineGeometry instance if one was not provided.
         */
        CircleOutlineGeometry.unpack = function(array, startingIndex, result) {
            var ellipseGeometry = EllipseOutlineGeometry.EllipseOutlineGeometry.unpack(array, startingIndex, scratchEllipseGeometry);
            scratchOptions.center = Cartesian2.Cartesian3.clone(ellipseGeometry._center, scratchOptions.center);
            scratchOptions.ellipsoid = Cartesian2.Ellipsoid.clone(ellipseGeometry._ellipsoid, scratchOptions.ellipsoid);
            scratchOptions.height = ellipseGeometry._height;
            scratchOptions.extrudedHeight = ellipseGeometry._extrudedHeight;
            scratchOptions.granularity = ellipseGeometry._granularity;
            scratchOptions.numberOfVerticalLines = ellipseGeometry._numberOfVerticalLines;

            if (!defined.defined(result)) {
                scratchOptions.radius = ellipseGeometry._semiMajorAxis;
                return new CircleOutlineGeometry(scratchOptions);
            }

            scratchOptions.semiMajorAxis = ellipseGeometry._semiMajorAxis;
            scratchOptions.semiMinorAxis = ellipseGeometry._semiMinorAxis;
            result._ellipseGeometry = new EllipseOutlineGeometry.EllipseOutlineGeometry(scratchOptions);
            return result;
        };

        /**
         * Computes the geometric representation of an outline of a circle on an ellipsoid, including its vertices, indices, and a bounding sphere.
         *
         * @param {CircleOutlineGeometry} circleGeometry A description of the circle.
         * @returns {Geometry|undefined} The computed vertices and indices.
         */
        CircleOutlineGeometry.createGeometry = function(circleGeometry) {
            return EllipseOutlineGeometry.EllipseOutlineGeometry.createGeometry(circleGeometry._ellipseGeometry);
        };

    function createCircleOutlineGeometry(circleGeometry, offset) {
            if (defined.defined(offset)) {
                circleGeometry = CircleOutlineGeometry.unpack(circleGeometry, offset);
            }
            circleGeometry._ellipseGeometry._center = Cartesian2.Cartesian3.clone(circleGeometry._ellipseGeometry._center);
            circleGeometry._ellipseGeometry._ellipsoid = Cartesian2.Ellipsoid.clone(circleGeometry._ellipseGeometry._ellipsoid);
            return CircleOutlineGeometry.createGeometry(circleGeometry);
        }

    return createCircleOutlineGeometry;

});
