in  vec2 v_textureCoordinates;
uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform float u_depthThreshold;


void main(void) {
  float depth = czm_readDepth(depthTexture, v_textureCoordinates);
  vec4 color = texture(colorTexture, v_textureCoordinates);
  if(depth < 1.0 - u_depthThreshold ){
    out_FragColor = color;
  }else {
    out_FragColor = vec4(1.,0.,0.,1.);
  }
}
