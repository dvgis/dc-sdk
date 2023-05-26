uniform vec4 color;
uniform float speed;

vec3 circlePing(float r, float innerTail,  float frontierBorder, float timeResetSeconds,  float radarPingSpeed,  float fadeDistance){
  float t = fract(czm_frameNumber * speed / 1000.0);
  float time = mod(t, timeResetSeconds) * radarPingSpeed;
  float circle;
  circle += smoothstep(time - innerTail, time, r) * smoothstep(time + frontierBorder,time, r);
  circle *= smoothstep(fadeDistance, 0.0, r);
  return vec3(circle);
}

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st * 2.0  - 1.0 ;
  vec2 center = vec2(0.);
  float time = fract(czm_frameNumber * speed / 1000.0);
  vec3 flagColor;
  float r = length(st - center) / 4.;
  flagColor += circlePing(r, 0.25, 0.025, 4.0, 0.3, 1.0) * color.rgb;
  material.alpha = length(flagColor);
  material.diffuse = flagColor.rgb;
  return material;
}
