uniform vec4 color;
uniform float speed;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  float time = fract( czm_frameNumber  *  speed / 1000.0);
  vec2 st = materialInput.st;
  float scalar = smoothstep(0.0,1.0,time);
  material.diffuse = color.rgb * scalar;
  material.alpha = color.a * scalar ;
  return material;
}
