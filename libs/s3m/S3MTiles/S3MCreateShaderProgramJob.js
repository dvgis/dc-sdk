
const  { Cesium }  = DC.Namespace
import ProgramDefines from './Enum/ProgramDefines.js';
import VertexCompressOption from './Enum/VertexCompressOption.js';
import InstanceMode from './Enum/InstanceMode.js';

function S3MCreateShaderProgramJob(){
    this.model = undefined;
    this.context = undefined;
}

S3MCreateShaderProgramJob.prototype.set = function(context, model) {
    this.model = model;
    this.context = context;
};

function getExtension(gl, names) {
    let length = names.length;
    for (let i = 0; i < length; ++i) {
        let extension = gl.getExtension(names[i]);
        if (extension) {
            return extension;
        }
    }

    return undefined;
}

S3MCreateShaderProgramJob.prototype.execute = function(){
    const context = this.context;
    const model = this.model;
    const layer = model.layer;
    const vs = model.vs;
    const fs = model.fs;
    const attributeLocations = model.attributeLocations;
    const material = model.material;
    const vertexPackage = model.vertexPackage;
    let vsNew = model.batchTable ? model.batchTable.getVertexShaderCallback()(vs) : vs;

    if(context.texturelod === undefined){
        context.texturelod = Cesium.defaultValue(getExtension(context._gl, ['EXT_shader_texture_lod']), false);
    }

    let vp = new Cesium.ShaderSource({
        sources : [vsNew]
    });

    let fp = new Cesium.ShaderSource({
        sources : [fs]
    });

    if(Cesium.defined(attributeLocations['aNormal'])) {
        vp.defines.push(ProgramDefines.VertexNormal);
        fp.defines.push(ProgramDefines.VertexNormal);
    }

    if(Cesium.defined(attributeLocations['aColor'])) {
        vp.defines.push(ProgramDefines.VertexColor);
    }

    if(material && material.textures.length > 0) {
        vp.defines.push(ProgramDefines.COMPUTE_TEXCOORD);
        fp.defines.push(ProgramDefines.COMPUTE_TEXCOORD);
    }

    if(material && material.textures.length === 2) {
        vp.defines.push(ProgramDefines.TexCoord2);
        fp.defines.push(ProgramDefines.TexCoord2);
    }

    if(Cesium.defined(attributeLocations['aTexCoord0'])) {
        vp.defines.push('TexCoord');
        fp.defines.push('TexCoord');
    }

    if(vertexPackage.instanceIndex > -1){
        vp.defines.push(ProgramDefines.Instance);
    }

    if(vertexPackage.instanceMode === InstanceMode.BIM){
        vp.defines.push(ProgramDefines.InstanceBim);
    }

    if(Cesium.defined(vertexPackage.compressOptions)){
        let compressOptions = vertexPackage.compressOptions;
        if((compressOptions & VertexCompressOption.SVC_Vertex) === VertexCompressOption.SVC_Vertex){
            vp.defines.push(ProgramDefines.COMPRESS_VERTEX);
        }

        if((compressOptions & VertexCompressOption.SVC_Normal) === VertexCompressOption.SVC_Normal){
            vp.defines.push(ProgramDefines.COMPRESS_NORMAL);
        }

        if((compressOptions & VertexCompressOption.SVC_VertexColor) === VertexCompressOption.SVC_VertexColor){
            vp.defines.push(ProgramDefines.COMPRESS_COLOR);
        }

        if((compressOptions & VertexCompressOption.SVC_TexutreCoord) === VertexCompressOption.SVC_TexutreCoord){
            vp.defines.push(ProgramDefines.COMPRESS_TEXCOORD);
        }
    }

    if(Cesium.defined(model.arrIndexPackage) && model.arrIndexPackage.length > 0 && model.arrIndexPackage[0].primitiveType === 2){
        fp.defines.push(ProgramDefines.UseLineColor);
    }

    model.shaderProgram = Cesium.ShaderProgram.fromCache({
        context : context,
        vertexShaderSource : vp,
        fragmentShaderSource : fp,
        attributeLocations : attributeLocations
    });
};

export default S3MCreateShaderProgramJob;
