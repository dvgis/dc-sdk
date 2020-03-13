uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform float trength;
uniform vec4 fogcolor;
varying vec2 v_textureCoordinates;

void main(void){
  vec4 origcolor = texture2D(colorTexture, v_textureCoordinates);
  vec4 depthcolor = texture2D(depthTexture, v_textureCoordinates);
  float f= clamp( trength * (depthcolor.r - 0.3 ) / 0.2, 0.0, 1.0);
  gl_FragColor = mix(origcolor,fogcolor,f);
}
