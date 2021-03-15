 uniform sampler2D image;
 uniform float speed;
 uniform vec4 color;

czm_material czm_getMaterial(czm_materialInput materialInput){
   czm_material material = czm_getDefaultMaterial(materialInput);
   vec2 st = materialInput.st;
   float time = fract(czm_frameNumber * speed / 1000.0);
   vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));
   if(color.a == 0.0){
    material.alpha = colorImage.a;
    material.diffuse = colorImage.rgb;
   }else{
    material.alpha = colorImage.a * color.a;
    material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);
   }
   return material;
}
