uniform vec4 color;
uniform float speed;

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  material.diffuse = 1.5 * color.rgb;
  vec2 st = materialInput.st;
  float dis = distance(st, vec2(0.5, 0.5));
  float per = fract(czm_frameNumber * speed / 1000.0);
  if(dis > per * 0.5){
    material.alpha = color.a;
  }else {
    discard;
  }
  return material;
}
