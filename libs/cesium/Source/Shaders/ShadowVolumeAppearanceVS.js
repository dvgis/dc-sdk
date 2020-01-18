//This file is automatically rebuilt by the Cesium build process.
export default "attribute vec3 position3DHigh;\n\
attribute vec3 position3DLow;\n\
attribute float batchId;\n\
\n\
#ifdef EXTRUDED_GEOMETRY\n\
attribute vec3 extrudeDirection;\n\
\n\
uniform float u_globeMinimumAltitude;\n\
#endif // EXTRUDED_GEOMETRY\n\
\n\
#ifdef PER_INSTANCE_COLOR\n\
varying vec4 v_color;\n\
#endif // PER_INSTANCE_COLOR\n\
\n\
#ifdef TEXTURE_COORDINATES\n\
#ifdef SPHERICAL\n\
varying vec4 v_sphericalExtents;\n\
#else // SPHERICAL\n\
varying vec2 v_inversePlaneExtents;\n\
varying vec4 v_westPlane;\n\
varying vec4 v_southPlane;\n\
#endif // SPHERICAL\n\
varying vec3 v_uvMinAndSphericalLongitudeRotation;\n\
varying vec3 v_uMaxAndInverseDistance;\n\
varying vec3 v_vMaxAndInverseDistance;\n\
#endif // TEXTURE_COORDINATES\n\
\n\
#if defined(TEXTURE_COORDINATES) && !defined(SPHERICAL) && defined(UINT8_PACKING)\n\
vec4 clampAndMagnitude(vec4 sd)\n\
{\n\
    vec4 d = sd;\n\
    d.x = czm_branchFreeTernary(sd.x < 128.0, d.x, (255.0 - sd.x));\n\
    d.x = floor(0.5 + d.x);\n\
    d.y = floor(0.5 + d.y);\n\
    d.z = floor(0.5 + d.z);\n\
    d.w = floor(0.5 + d.w);\n\
    return d;\n\
}\n\
\n\
float unpackLowLessThan100k(vec4 sd)\n\
{\n\
    vec4 d = clampAndMagnitude(sd);\n\
    return (1000.0 * d.x + 10.0 * d.y + 0.1 * d.z + 0.001 * d.w) * czm_branchFreeTernary(sd.x < 128.0, 1.0, -1.0);\n\
}\n\
\n\
vec3 southwest_LOW(vec4 x, vec4 y, vec4 z)\n\
{\n\
    vec3 value;\n\
    value.x = unpackLowLessThan100k(x);\n\
    value.y = unpackLowLessThan100k(y);\n\
    value.z = unpackLowLessThan100k(z);\n\
    return value;\n\
}\n\
\n\
float unpackHighMagLessThan100Million(vec4 sd)\n\
{\n\
    vec4 d = clampAndMagnitude(sd);\n\
    return (1000000.0 * d.x + 10000.0 * d.y + 100.0 * d.z + d.w) * czm_branchFreeTernary(sd.x < 128.0, 1.0, -1.0);\n\
}\n\
\n\
vec3 southwest_HIGH(vec4 x, vec4 y, vec4 z)\n\
{\n\
    vec3 value;\n\
    value.x = unpackHighMagLessThan100Million(x);\n\
    value.y = unpackHighMagLessThan100Million(y);\n\
    value.z = unpackHighMagLessThan100Million(z);\n\
    return value;\n\
}\n\
\n\
#ifdef COLUMBUS_VIEW_2D\n\
vec4 unpackPlanes2D_HIGH(vec4 x, vec4 y, vec4 z, vec4 w)\n\
{\n\
    vec4 value;\n\
    value.x = unpackHighMagLessThan100Million(x);\n\
    value.y = unpackHighMagLessThan100Million(y);\n\
    value.z = unpackHighMagLessThan100Million(z);\n\
    value.w = unpackHighMagLessThan100Million(w);\n\
    return value;\n\
}\n\
\n\
vec4 unpackPlanes2D_LOW(vec4 x, vec4 y, vec4 z, vec4 w)\n\
{\n\
    vec4 value;\n\
    value.x = unpackLowLessThan100k(x);\n\
    value.y = unpackLowLessThan100k(y);\n\
    value.z = unpackLowLessThan100k(z);\n\
    value.w = unpackLowLessThan100k(w);\n\
    return value;\n\
}\n\
\n\
#else\n\
float unpackLowLessThan1000k(vec4 sd)\n\
{\n\
    vec4 d = clampAndMagnitude(sd);\n\
    return (10000.0 * d.x + 100.0 * d.y + d.z + 0.01 * d.w) * czm_branchFreeTernary(sd.x < 128.0, 1.0, -1.0);\n\
}\n\
\n\
vec3 unpackExtent(vec4 x, vec4 y, vec4 z)\n\
{\n\
    vec3 value;\n\
    value.x = unpackLowLessThan1000k(x);\n\
    value.y = unpackLowLessThan1000k(y);\n\
    value.z = unpackLowLessThan1000k(z);\n\
    return value;\n\
}\n\
\n\
#endif\n\
#endif\n\
\n\
void main()\n\
{\n\
    vec4 position = czm_computePosition();\n\
\n\
#ifdef EXTRUDED_GEOMETRY\n\
    float delta = min(u_globeMinimumAltitude, czm_geometricToleranceOverMeter * length(position.xyz));\n\
    delta *= czm_sceneMode == czm_sceneMode3D ? 1.0 : 0.0;\n\
\n\
    //extrudeDirection is zero for the top layer\n\
    position = position + vec4(extrudeDirection * delta, 0.0);\n\
#endif\n\
\n\
#ifdef TEXTURE_COORDINATES\n\
#ifdef SPHERICAL\n\
    v_sphericalExtents = czm_batchTable_sphericalExtents(batchId);\n\
    v_uvMinAndSphericalLongitudeRotation.z = czm_batchTable_longitudeRotation(batchId);\n\
#else // SPHERICAL\n\
#ifdef COLUMBUS_VIEW_2D\n\
#ifdef UINT8_PACKING\n\
    vec4 planes2D_high = unpackPlanes2D_HIGH(czm_batchTable_planes2D_HIGH_x(batchId),\n\
        czm_batchTable_planes2D_HIGH_y(batchId),\n\
        czm_batchTable_planes2D_HIGH_z(batchId),\n\
        czm_batchTable_planes2D_HIGH_w(batchId));\n\
    vec4 planes2D_low = unpackPlanes2D_LOW(czm_batchTable_planes2D_LOW_x(batchId),\n\
        czm_batchTable_planes2D_LOW_y(batchId),\n\
        czm_batchTable_planes2D_LOW_z(batchId),\n\
        czm_batchTable_planes2D_LOW_w(batchId));\n\
#else // UINT8_PACKING\n\
    vec4 planes2D_high = czm_batchTable_planes2D_HIGH(batchId);\n\
    vec4 planes2D_low = czm_batchTable_planes2D_LOW(batchId);\n\
#endif // UINT8_PACKING\n\
\n\
    // If the primitive is split across the IDL (planes2D_high.x > planes2D_high.w):\n\
    // - If this vertex is on the east side of the IDL (position3DLow.y > 0.0, comparison with position3DHigh may produce artifacts)\n\
    // - existing \"east\" is on the wrong side of the world, far away (planes2D_high/low.w)\n\
    // - so set \"east\" as beyond the eastmost extent of the projection (idlSplitNewPlaneHiLow)\n\
    vec2 idlSplitNewPlaneHiLow = vec2(EAST_MOST_X_HIGH - (WEST_MOST_X_HIGH - planes2D_high.w), EAST_MOST_X_LOW - (WEST_MOST_X_LOW - planes2D_low.w));\n\
    bool idlSplit = planes2D_high.x > planes2D_high.w && position3DLow.y > 0.0;\n\
    planes2D_high.w = czm_branchFreeTernary(idlSplit, idlSplitNewPlaneHiLow.x, planes2D_high.w);\n\
    planes2D_low.w = czm_branchFreeTernary(idlSplit, idlSplitNewPlaneHiLow.y, planes2D_low.w);\n\
\n\
    // - else, if this vertex is on the west side of the IDL (position3DLow.y < 0.0)\n\
    // - existing \"west\" is on the wrong side of the world, far away (planes2D_high/low.x)\n\
    // - so set \"west\" as beyond the westmost extent of the projection (idlSplitNewPlaneHiLow)\n\
    idlSplit = planes2D_high.x > planes2D_high.w && position3DLow.y < 0.0;\n\
    idlSplitNewPlaneHiLow = vec2(WEST_MOST_X_HIGH - (EAST_MOST_X_HIGH - planes2D_high.x), WEST_MOST_X_LOW - (EAST_MOST_X_LOW - planes2D_low.x));\n\
    planes2D_high.x = czm_branchFreeTernary(idlSplit, idlSplitNewPlaneHiLow.x, planes2D_high.x);\n\
    planes2D_low.x = czm_branchFreeTernary(idlSplit, idlSplitNewPlaneHiLow.y, planes2D_low.x);\n\
\n\
    vec3 southWestCorner = (czm_modelViewRelativeToEye * czm_translateRelativeToEye(vec3(0.0, planes2D_high.xy), vec3(0.0, planes2D_low.xy))).xyz;\n\
    vec3 northWestCorner = (czm_modelViewRelativeToEye * czm_translateRelativeToEye(vec3(0.0, planes2D_high.x, planes2D_high.z), vec3(0.0, planes2D_low.x, planes2D_low.z))).xyz;\n\
    vec3 southEastCorner = (czm_modelViewRelativeToEye * czm_translateRelativeToEye(vec3(0.0, planes2D_high.w, planes2D_high.y), vec3(0.0, planes2D_low.w, planes2D_low.y))).xyz;\n\
#else // COLUMBUS_VIEW_2D\n\
    // 3D case has smaller \"plane extents,\" so planes encoded as a 64 bit position and 2 vec3s for distances/direction\n\
#ifdef UINT8_PACKING\n\
    vec3 low = southwest_LOW(czm_batchTable_southWest_LOW_x(batchId), czm_batchTable_southWest_LOW_y(batchId), czm_batchTable_southWest_LOW_z(batchId));\n\
    vec3 high = southwest_HIGH(czm_batchTable_southWest_HIGH_x(batchId), czm_batchTable_southWest_HIGH_y(batchId), czm_batchTable_southWest_HIGH_z(batchId));\n\
    vec3 southWestCorner = (czm_modelViewRelativeToEye * czm_translateRelativeToEye(high, low)).xyz;\n\
    vec3 northWestCorner = czm_normal * unpackExtent(\n\
        czm_batchTable_northward_x(batchId),\n\
        czm_batchTable_northward_y(batchId),\n\
        czm_batchTable_northward_z(batchId)) + southWestCorner;\n\
\n\
    vec3 southEastCorner = czm_normal * unpackExtent(\n\
        czm_batchTable_eastward_x(batchId),\n\
        czm_batchTable_eastward_y(batchId),\n\
        czm_batchTable_eastward_z(batchId)) + southWestCorner;\n\
#else // UINT8_PACKING\n\
    vec3 southWestCorner = (czm_modelViewRelativeToEye * czm_translateRelativeToEye(czm_batchTable_southWest_HIGH(batchId), czm_batchTable_southWest_LOW(batchId))).xyz;\n\
    vec3 northWestCorner = czm_normal * czm_batchTable_northward(batchId) + southWestCorner;\n\
    vec3 southEastCorner = czm_normal * czm_batchTable_eastward(batchId) + southWestCorner;\n\
#endif // UINT8_PACKING\n\
#endif // COLUMBUS_VIEW_2D\n\
\n\
    vec3 eastWard = southEastCorner - southWestCorner;\n\
    float eastExtent = length(eastWard);\n\
    eastWard /= eastExtent;\n\
\n\
    vec3 northWard = northWestCorner - southWestCorner;\n\
    float northExtent = length(northWard);\n\
    northWard /= northExtent;\n\
\n\
    v_westPlane = vec4(eastWard, -dot(eastWard, southWestCorner));\n\
    v_southPlane = vec4(northWard, -dot(northWard, southWestCorner));\n\
    v_inversePlaneExtents = vec2(1.0 / eastExtent, 1.0 / northExtent);\n\
#endif // SPHERICAL\n\
    vec4 uvMinAndExtents = czm_batchTable_uvMinAndExtents(batchId);\n\
    vec4 uMaxVmax = czm_batchTable_uMaxVmax(batchId);\n\
\n\
    v_uMaxAndInverseDistance = vec3(uMaxVmax.xy, uvMinAndExtents.z);\n\
    v_vMaxAndInverseDistance = vec3(uMaxVmax.zw, uvMinAndExtents.w);\n\
    v_uvMinAndSphericalLongitudeRotation.xy = uvMinAndExtents.xy;\n\
#endif // TEXTURE_COORDINATES\n\
\n\
#ifdef PER_INSTANCE_COLOR\n\
    v_color = czm_batchTable_color(batchId);\n\
#endif\n\
\n\
    gl_Position = czm_depthClampFarPlane(czm_modelViewProjectionRelativeToEye * position);\n\
}\n\
";
