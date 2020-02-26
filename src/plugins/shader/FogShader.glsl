uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform float trength;
uniform vec4 fogcolor;
varying vec2 v_textureCoordinates;

void main(void){
  vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);
  float depth = czm_readDepth(depthTexture, v_textureCoordinates);
  vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);
  float f=trength*(depthcolor.r-0.3)/0.2;
  if(f<0.0) {
    f=0.0;
  }else if(f>1.0){
    f=1.0;
  }
  gl_FragColor = mix(origcolor,fogcolor,f);
}
