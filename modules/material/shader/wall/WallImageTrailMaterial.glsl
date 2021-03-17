uniform sampler2D image;
uniform vec4 color;
uniform float speed;
uniform vec2 repeat;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st * repeat;
  float time = fract(czm_frameNumber * speed / 1000.0);
  vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
  material.alpha =  colorImage.a * color.a ;
  material.diffuse = colorImage.rgb * color.rgb * 3.0 ;
  return material;
}
