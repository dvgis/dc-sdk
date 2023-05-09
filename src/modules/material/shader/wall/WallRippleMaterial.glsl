uniform vec4 color;
uniform float speed;
uniform float count;
czm_material czm_getMaterial(czm_materialInput materialInput)
{
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  float time = fract(czm_frameNumber * speed / 1000.0);
  float sin = sin((st.t - time) * 10.0 * count);
  float high = 0.92;
  float medium = 0.4;
  vec4 temp= vec4(0.);
  if(sin > high ){
    temp = vec4(mix(vec3(.8, 1., 1.), color.rgb, (1. - sin) / (1. - high)), 1.);
  }else if(sin > medium) {
    temp = vec4(color.rgb, mix(1., 0., 1.-(sin - medium) / (high - medium)));
  }else{
    temp = vec4(color.rgb,0);
  }
  vec3 fade = mix(color.rgb, vec3(0., 0., 0.), st.t);
  temp = mix(temp, vec4(fade, 1.), 0.85);
  material.diffuse = temp.rgb;
  material.alpha =  temp.a * (1.0 - st.t);
  return material;
}
