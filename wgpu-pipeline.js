// wgpu-pipeline.js

export async function createPipeline(device, presentationFormat, vertexSize, shaderCode) {
    const module = device.createShaderModule({
        label: 'textured quad shaders',
        code: shaderCode,
    });

    const pipeline = device.createRenderPipeline({
        label: 'textured quad pipeline',
        layout: 'auto',
        vertex: {
            module,
            entryPoint: 'vs',
            buffers: [
                {
                    arrayStride: vertexSize,
                    attributes: [
                        { shaderLocation: 0, offset: 0, format: 'float32x2' },  // pos
                        { shaderLocation: 1, offset: 8, format: 'float32x2' },  // tex
                        { shaderLocation: 2, offset: 16, format: 'float32x4' }  // col
                    ],
                },
            ],
        },
        fragment: {
            module,
            entryPoint: 'fs',
            targets: [{
                format: presentationFormat,
                blend: {
                    color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                    alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' }
                },
            }],
        },
    });

    return pipeline;
}
