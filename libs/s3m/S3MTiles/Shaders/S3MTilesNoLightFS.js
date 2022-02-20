export default `
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif

#ifdef TexCoord
    uniform sampler2D uTexture;
    uniform float uTexture0Width;
    varying vec4 vTexCoord;
    varying vec4 vTexCoordTransform;
    varying vec4 vTexMatrix;
#endif

#ifdef VertexColor
    varying vec4 vColor;
#endif

#ifdef TexCoord
    void calculateMipLevel(in vec2 inTexCoord, in float vecTile, in float fMaxMip, inout float mipLevel)
    {
        vec2 dx = dFdx(inTexCoord * vecTile);
        vec2 dy = dFdy(inTexCoord * vecTile);
        float dotX = dot(dx, dx);
        float dotY = dot(dy, dy);
        float dMax = max(dotX, dotY);
        float dMin = min(dotX, dotY);
        float offset = (dMax - dMin) / (dMax + dMin);
        offset = clamp(offset, 0.0, 1.0);
        float d = dMax * (1.0 - offset) + dMin * offset;
        mipLevel = 0.5 * log2(d);
        mipLevel = clamp(mipLevel, 0.0, fMaxMip - 1.62);
    }

    void calculateTexCoord(in vec3 inTexCoord, in float scale, in float XTran, in float YTran, in float fTile, in float mipLevel, inout vec2 outTexCoord)
    {
        if(inTexCoord.z < -9000.0)
        {
            outTexCoord = inTexCoord.xy;
        }
        else
        {
            vec2 fTexCoord = fract(inTexCoord.xy);
            float offset = 1.0 * pow(2.0, mipLevel) / fTile;
            fTexCoord = clamp(fTexCoord, offset, 1.0 - offset);
            outTexCoord.x = (fTexCoord.x + XTran) * scale;
            outTexCoord.y = (fTexCoord.y + YTran) * scale;
        }
    }
    
    vec4 getTexColorForS3M(sampler2D curTexture, vec3 oriTexCoord, float texTileWidth, float fMaxMipLev, float fTexCoordScale, vec2 vecTexCoordTranslate)
    {
        vec4 color = vec4(1.0);
        float mipLevel = 0.0;
    #ifdef GL_OES_standard_derivatives
        calculateMipLevel(oriTexCoord.xy, texTileWidth, fMaxMipLev, mipLevel);
    #endif
        vec2 realTexCoord;
        calculateTexCoord(oriTexCoord, fTexCoordScale, vecTexCoordTranslate.x, vecTexCoordTranslate.y, texTileWidth, mipLevel, realTexCoord);
        if(oriTexCoord.z < -9000.0)
        {
            color = texture2D(curTexture, realTexCoord.xy);
        }
        else
        {
            #ifdef GL_EXT_shader_texture_lod
                color = texture2DLodEXT(curTexture, realTexCoord.xy, mipLevel);
            #else
                color = texture2D(curTexture, realTexCoord.xy, mipLevel);
            #endif
        }
        return color;
    }

    vec4 getTextureColor()
    {
        if(vTexMatrix.z < 0.0)
        {
            return vec4(1.0);
        }
        float texTileWidth0 = vTexMatrix.z * uTexture0Width;
        vec3 realTexCoord = vec3(vTexCoord.xy, vTexCoordTransform.x);
        return getTexColorForS3M(uTexture, realTexCoord, texTileWidth0, vTexMatrix.w, vTexMatrix.z, vTexMatrix.xy);
    }
#endif
    
    void main()
    {
        vec4 baseColorWithAlpha = vec4(1.0);
        
    #ifdef VertexColor
        vec4 baseColorWithAlpha = vColor;
    #endif
    
    #ifdef TexCoord
        baseColorWithAlpha *= getTextureColor();
    #endif  
      
        gl_FragColor = baseColorWithAlpha;
    }
`;