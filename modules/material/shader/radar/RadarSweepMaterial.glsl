uniform vec4 color;
uniform float speed;

#define PI 3.14159265359

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec2 scrPt = st * 2.0 - 1.0;
  float time = czm_frameNumber * speed / 1000.0 ;
  vec3 col = vec3(0.0);
  mat2 rot;
  float theta = -time * 1.0 * PI - 2.2;
  float cosTheta, sinTheta;
  cosTheta = cos(theta);
  sinTheta = sin(theta);
  rot[0][0] = cosTheta;
  rot[0][1] = -sinTheta;
  rot[1][0] = sinTheta;
  rot[1][1] = cosTheta;
  vec2 scrPtRot = rot * scrPt;
  float angle = 1.0 - (atan(scrPtRot.y, scrPtRot.x) / 6.2831 + 0.5);
  float falloff = 1.0 - length(scrPtRot);
  float ringSpacing = 0.23;
  if(mod(length(scrPtRot), ringSpacing) < 0.015 && length(scrPtRot) / ringSpacing < 5.0) {
    col += vec3(0, 0.5, 0);
  }
  col += vec3(0, 0.8, 0) * step(mod(length(scrPtRot), ringSpacing), 0.01) * step(length(scrPtRot), 1.0);
  material.alpha =pow(length(col + vec3(.5)),5.0);
  material.diffuse =  (0.5 +  pow(angle, 2.0) * falloff ) *   color.rgb    ;
  return material;
}
