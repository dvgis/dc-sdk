uniform sampler2D image;
uniform vec4 color;
uniform float speed;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  float time = fract(czm_frameNumber * speed / 1000.0);
  vec4 colorImage = texture2D(image,st);
  vec3 fragColor = color.rgb;
  if(st.t > 0.45 && st.t < 0.55 ) {
    fragColor = vec3(1.0);
  }
  if(color.a == 0.0){
    material.alpha = colorImage.a * 1.5 * fract(st.s - time);
    material.diffuse = colorImage.rgb;
  }else{
    material.alpha = colorImage.a * color.a * 1.5 * smoothstep(.0,1., fract(st.s - time));
    material.diffuse = max(fragColor.rgb * material.alpha , fragColor.rgb);
  }
  return material;
}
