uniform vec4 color;
uniform float speed;

#define PI 3.14159265359

vec2 rotate2D (vec2 _st, float _angle) {
  _st =  mat2(cos(_angle),-sin(_angle),  sin(_angle),cos(_angle)) * _st;
  return _st;
}

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st * 2.0 - 1.0;
  st *= 1.6;
  float time = czm_frameNumber * speed / 1000.0;
  float r = length(st);
  float w = .3;
  st = rotate2D(st,(r*PI*6.-time*2.));
  float a = smoothstep(-w,.2,st.x) * smoothstep(w,.2,st.x);
  float b = abs(1./(sin(pow(r,2.)*2.-time*1.3)*6.))*.4;
  material.alpha = a * b ;
  material.diffuse = color.rgb * a * b  * 3.0;
  return material;
}
