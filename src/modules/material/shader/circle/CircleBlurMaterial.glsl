uniform vec4 color;
uniform float speed;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st ;
  vec2 center = vec2(0.5);
  float time = fract(czm_frameNumber * speed / 1000.0);
  float r = 0.5 + sin(time) / 3.0;
  float dis = distance(st, center);
  float a = 0.0;
  if(dis < r) {
    a = 1.0 - smoothstep(0.0, r, dis);
  }
  material.alpha = pow(a,10.0) ;
  material.diffuse = color.rgb * a * 3.0;
  return material;
}
