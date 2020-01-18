//This file is automatically rebuilt by the Cesium build process.
export default "uniform sampler2D u_floatTexture;\n\
\n\
void main()\n\
{\n\
    float actual = texture2D(u_floatTexture, vec2(0.5, 0.5)).r;\n\
    float expected = 123456.0;\n\
    gl_FragColor = vec4(abs(actual - expected), 0.0, 0.0, 1.0);\n\
}\n\
";
