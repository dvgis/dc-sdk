uniform sampler2D image;
uniform vec4 color;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec4 colorImage = texture2D(image,st);
  vec3 fragColor = color.rgb;
  material.alpha = colorImage.a * color.a * 3.;
  material.diffuse = max(fragColor.rgb  +  colorImage.rgb , fragColor.rgb);
  return material;
}
