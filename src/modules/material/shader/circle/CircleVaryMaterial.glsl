uniform vec4 color;
uniform float speed;

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st  * 2.0 - 1.0;
  float time =czm_frameNumber * speed / 1000.0;
  float radius = length(st);
  float angle = atan(st.y/st.x);
  float radius1 = sin(time * 2.0) + sin(40.0*angle+time)*0.01;
  float radius2 = cos(time * 3.0);
  vec3 fragColor = 0.2 + 0.5 * cos( time + color.rgb + vec3(0,2,4));
  float inten1 = 1.0 - sqrt(abs(radius1 - radius));
  float inten2 = 1.0 - sqrt(abs(radius2 - radius));
  material.alpha = pow(inten1 + inten2 , 5.0) ;
  material.diffuse = fragColor * (inten1 + inten2);
  return material;
}
