in  vec2 v_textureCoordinates;


uniform sampler2D colorTexture;
uniform sampler2D u_silhouetteTexture;
uniform sampler2D u_redTexture;
uniform vec4 u_color;

void main(void) {
  vec4 color = texture(colorTexture, v_textureCoordinates);
  vec4 silhouetteColor = texture(u_silhouetteTexture, v_textureCoordinates);
  vec4 redColor = texture(u_redTexture, v_textureCoordinates);

  if(redColor.r == 1.0 ){
    out_FragColor = mix(color, u_color, silhouetteColor.a);
  }else {
    out_FragColor = color;
  }
}
