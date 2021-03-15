uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
varying vec2 v_textureCoordinates;
uniform vec3 centerWC;
uniform vec3 normalWC;
uniform float radius;
uniform vec4 color;
uniform float speed;

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

vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){
  vec3 v01 = point - planeOrigin;
  float d = dot(planeNormal, v01) ;
  return (point - planeNormal * d);
}

void main() {
  gl_FragColor = texture2D(colorTexture, v_textureCoordinates);
  float depth = getDepth();
  vec4 viewPos = toEye(v_textureCoordinates, depth);
  vec4 center = czm_view * vec4(centerWC,1);
  vec4 planeNormal = czm_view * vec4(normalWC,0);
  vec3 prjOnPlane = pointProjectOnPlane(planeNormal.xyz, center.xyz, viewPos.xyz);
  float dis = length(prjOnPlane.xyz - center.xyz);
  float time = fract(czm_frameNumber * speed / 1000.0);
  float temp = radius * time;
  if(dis < temp)  {
    float f = 1.0 - abs(temp - dis) / temp;
    f = pow(f, 4.0);
    gl_FragColor = mix(gl_FragColor, color, f);
  }
}
