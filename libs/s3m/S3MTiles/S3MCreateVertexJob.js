
const  { Cesium }  = DC.Namespace

function S3MCreateVertexJob(){
    this.context = undefined;
    this.model = undefined;
    this.index = undefined;
}

S3MCreateVertexJob.prototype.set = function(context, model, index) {
    this.context = context;
    this.model = model;
    this.index = index;
};

S3MCreateVertexJob.prototype.execute = function(){
    let context = this.context;
    let index = this.index;
    let vertexPackage = this.model.vertexPackage;
    let attr = vertexPackage.vertexAttributes[index];
    if(!Cesium.defined(attr)){
        throw new Cesium.DeveloperError('attribute is null');
    }

    if(vertexPackage.instanceIndex !== -1 && !Cesium.defined(this.model.instanceBuffer)){
        if(!Cesium.defined(vertexPackage.instanceBuffer)){
            throw new Cesium.DeveloperError('instance buffer is null');
        }

        this.model.instanceBuffer = Cesium.Buffer.createVertexBuffer({
            context : context,
            typedArray : vertexPackage.instanceBuffer,
            usage : Cesium.BufferUsage.STATIC_DRAW
        });

    }

    if(attr.instanceDivisor === 1 && !Cesium.defined(attr.typedArray)){
        attr.vertexBuffer = this.model.instanceBuffer;
        return ;
    }

    if(!Cesium.defined(attr.vertexBuffer)){
        attr.vertexBuffer = Cesium.Buffer.createVertexBuffer({
            context : context,
            typedArray : attr.typedArray,
            usage : Cesium.BufferUsage.STATIC_DRAW
        });

        attr.typedArray = null;
        delete attr.typedArray;
    }
};

export default S3MCreateVertexJob;
