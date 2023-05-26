uniform vec4 color;
uniform sampler2D image;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  float time = fract(czm_frameNumber / 90.) ;
  vec2 new_st = fract(st- vec2(time,time));
  vec4 colorImage = texture(image, new_st);
  vec3 diffuse = colorImage.rgb;
  float alpha = colorImage.a;
  diffuse *= color.rgb;
  alpha *= color.a;
  material.diffuse = diffuse;
  material.alpha = alpha * pow(1. - st.t,color.a);
  return material;
}
