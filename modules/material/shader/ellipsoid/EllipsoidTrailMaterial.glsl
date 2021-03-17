uniform vec4 color;
uniform float speed;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  float time = fract(czm_frameNumber * speed / 1000.0);
  float alpha = abs(smoothstep(0.5,1.,fract( -st.t - time)));
  alpha += .1;
  material.alpha = alpha;
  material.diffuse = color.rgb;
  return material;
}
