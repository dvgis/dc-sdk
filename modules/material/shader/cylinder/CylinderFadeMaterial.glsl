uniform vec4 color;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  float powerRatio = 1. / (fract(czm_frameNumber / 30.0) +  1.) ;
  float alpha = pow(1. - st.t,powerRatio);
  vec4 temp = vec4(color.rgb, alpha * color.a);
  material.diffuse = temp.rgb;
  material.alpha = temp.a;
  return material;
}
