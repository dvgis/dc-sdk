uniform vec4 color;
uniform float speed;

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st * 2.0 - 1.0;
  float t = czm_frameNumber * 10.0 / 1000.0 ;
  vec3 col = vec3(0.0);
  vec2 p = vec2(sin(t), cos(t));
  float d = length(st - dot(p, st) * p);
  if (dot(st, p) < 0.) {
    d = length(st);
  }

  col = .006 / d * color.rgb;

  if(distance(st,vec2(0)) >  0.99 ){
    col =color.rgb;
  }

  material.alpha  = pow(length(col),2.0);
  material.diffuse = col * 3.0 ;
  return material;
}
