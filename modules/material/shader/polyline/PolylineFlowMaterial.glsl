uniform vec4 color;
uniform float speed;
uniform float percent;
uniform float gradient;

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  float t =fract(czm_frameNumber * speed / 1000.0);
  t *= (1.0 + percent);
  float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
  alpha += gradient;
  material.diffuse = color.rgb;
  material.alpha = alpha;
  return material;
}
