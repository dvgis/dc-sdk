uniform vec4 color;
uniform float duration;

czm_material czm_getMaterial(czm_materialInput materialInput){
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    float t =fract(czm_frameNumber / duration);
    t *= 1.03;
    float alpha = smoothstep(t- 0.03, t, st.s) * step(-t, -st.s);
    alpha += 0.1;
    material.diffuse = color.rgb;
    material.alpha = alpha;
    return material;
}
