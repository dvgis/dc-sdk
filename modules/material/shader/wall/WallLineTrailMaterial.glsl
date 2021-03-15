uniform sampler2D image;
uniform float speed;
uniform vec4 color;
uniform vec2 repeat;

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  float perDis = 1.0 / repeat.y / 3.0  ;
  vec2 st = materialInput.st * repeat;
  float time = fract(czm_frameNumber * speed / 1000.0);
  vec4 colorImage = texture2D(image, vec2(st.s, fract(st.t - time)));
  material.alpha =  colorImage.a * smoothstep(.2 ,1. ,distance(st.t * perDis ,1. + perDis ));
  material.diffuse = max(color.rgb * material.alpha * 1.5, color.rgb);
  material.emission = max(color.rgb * material.alpha * 1.5, color.rgb);
  return material;
}
