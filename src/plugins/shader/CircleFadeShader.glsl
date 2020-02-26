uniform vec4 color;
uniform float duration;

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  material.diffuse = 1.5 * color.rgb;
  vec2 st = materialInput.st;
  float dis = distance(st, vec2(0.5, 0.5));
  float per = fract(czm_frameNumber / duration);
  if(dis > per * 0.5){
   discard;
  }else {
    material.alpha = color.a  * dis / per / 2.0;
  }
  return material;
}
