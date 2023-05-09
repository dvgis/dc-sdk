uniform vec4 color;
uniform float speed;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st * 2.0 - 1.0;
  float time = fract(czm_frameNumber * speed / 1000.0);
  float r = length(st) * 1.2;
  float a = pow(r, 2.0);
  float b = sin(r * 0.8 - 1.6);
  float c = sin(r - 0.010);
  float s = sin(a - time * 2.0 + b) * c;
  float d = abs(1.0 / (s * 10.8)) - 0.01;
  material.alpha = pow(d,10.0) ;
  material.diffuse = color.rgb * d;
  return material;
}
