uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform vec4 fogByDistance;
uniform vec4 fogColor;
varying vec2 v_textureCoordinates;

float getDistance(sampler2D depthTexture, vec2 texCoords){
  float depth = czm_unpackDepth(texture2D(depthTexture, texCoords));
  if (depth == 0.0) {
    return czm_infinity;
  }
  vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
  return -eyeCoordinate.z / eyeCoordinate.w;
}


float interpolateByDistance(vec4 nearFarScalar, float distance){
  float startDistance = nearFarScalar.x;
  float startValue = nearFarScalar.y;
  float endDistance = nearFarScalar.z;
  float endValue = nearFarScalar.w;
  float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0);
  return mix(startValue, endValue, t);
}

vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor){
  return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a);
}

void main(void){
  float distance = getDistance(depthTexture, v_textureCoordinates);
  vec4 sceneColor = texture2D(colorTexture, v_textureCoordinates);
  float blendAmount = interpolateByDistance(fogByDistance, distance);
  vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount);
  gl_FragColor = alphaBlend(finalFogColor, sceneColor);
}
