uniform vec4 color;

czm_material czm_getMaterial(czm_materialInput materialInput){
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec4 fragColor = color;
    fragColor = czm_gammaCorrect(fragColor);
    material.emission = fragColor.rgb;
    material.diffuse = fragColor.rgb;
    material.alpha = color.a;
    return material;
}
