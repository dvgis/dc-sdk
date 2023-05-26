uniform vec4 color;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec2 center = st - vec2(0.5,0.5);
  float length = length(center) / 0.5;
  float time = 1. - abs(czm_frameNumber / 360. - 0.5);
  float param = 1. - step(length, 0.6); //大于0.6模糊，rate = 0.6
  float scale = param * length; // 0.6< length 返回0，反之返回1.
  float alpha = param * (1.0 - abs(scale - 0.8) / 0.2); // 0.8 < length 返回0，反之返回1.
  float param1 = step(length, 0.7); //小于0.5模糊
  float scale1 = param1 * length; // 0.6< length 返回0，反之返回1.
  alpha += param1 * (1.0 - abs(scale1 - 0.35) / 0.35); // 0.8 < length 返回0，反之返回1.
  material.diffuse = color.rgb * vec3(color.a);
  material.alpha = pow(alpha, 4.0);
  return material;
}
