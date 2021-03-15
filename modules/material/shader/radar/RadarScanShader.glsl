uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
varying vec2 v_textureCoordinates;
uniform vec3 centerWC;
uniform vec3 planeNormalWC;
uniform vec3 lineNormalWC;
uniform float radius;
uniform vec4 color;

float getDepth(){
  float z_window = czm_unpackDepth(texture2D(depthTexture, v_textureCoordinates));
  z_window = czm_reverseLogDepth(z_window);
  float n_range = czm_depthRange.near;
  float f_range = czm_depthRange.far;
  return  (2.0 * z_window - n_range - f_range) / (f_range - n_range);
}

vec4 toEye(in vec2 uv, in float depth){
  vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));
  vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);
  posInCamera = posInCamera / posInCamera.w;
  return posInCamera;
}

bool isPointOnLineRight(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)
{
  vec3 v01 = testPt - ptOnLine;
  normalize(v01);
  vec3 temp = cross(v01, lineNormal);
  vec4 planeNormalEC = czm_view * vec4(planeNormalWC,0);
  float d = dot(temp, planeNormalEC.xyz);
  return d > 0.5;
}

vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)
{
  vec3 v01 = point -planeOrigin;
  float d = dot(planeNormal, v01) ;
  return (point - planeNormal * d);
}

float distancePointToLine(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)
{
  vec3 tempPt = pointProjectOnPlane(lineNormal, ptOnLine, testPt);
  return length(tempPt - ptOnLine);
}

void main() {
  gl_FragColor = texture2D(colorTexture, v_textureCoordinates);
  float depth = getDepth();
  vec4 viewPos = toEye(v_textureCoordinates, depth);
  vec4 centerEC = czm_view * vec4(centerWC,1);
  vec4 planeNormalEC = czm_view * vec4(planeNormalWC,0);
  vec4 lineNormalEC = czm_view * vec4(lineNormalWC,0);
  vec3 prjOnPlane = pointProjectOnPlane(planeNormalEC.xyz, centerEC.xyz, viewPos.xyz);
  float dis = length(prjOnPlane.xyz - centerEC.xyz);
  float diameter = radius * 2.0;
  if(dis < radius){
    float f0 = 1.0 -abs(radius - dis) / radius;
    f0 = pow(f0, 64.0);
    vec3 lineEndPt = vec3(centerEC.xyz) + vec3(lineNormalEC.xyz) * radius;
    float f = 0.0;
    if(isPointOnLineRight(centerEC.xyz, lineNormalEC.xyz, prjOnPlane.xyz)) {
      float dis1= length(prjOnPlane.xyz - lineEndPt);
      f = abs(diameter - dis1) / diameter;
      f = pow(f, 3.0);
    }
    gl_FragColor = mix(gl_FragColor, color, f + f0);
  }
}
