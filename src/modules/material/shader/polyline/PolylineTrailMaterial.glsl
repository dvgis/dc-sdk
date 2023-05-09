uniform vec4 color;
uniform float speed;

czm_material czm_getMaterial(czm_materialInput materialInput){
   czm_material material = czm_getDefaultMaterial(materialInput);
   vec2 st = materialInput.st;
   float time = fract(czm_frameNumber * speed / 1000.0);
   material.diffuse = color.rgb;
   material.alpha = color.a * fract(st.s-time);
   return material;
}
