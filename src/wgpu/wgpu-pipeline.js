/**
 * @file wgpu-pipeline.js
 * @description This module provides functions to initialize the WebGPU render pipeline for the simulation.
 *              It defines the creation of the pipeline, including vertex and fragment shader modules and buffer configurations.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Functions:
 * - InitializePipeline(state): Initializes the render pipeline with vertex and fragment shaders.
 */

// Initializes the render pipeline with vertex and fragment shaders
export async function InitializePipeline(state) {
    state.webgpu.pipeline = state.webgpu.device.createRenderPipeline({
        label: 'textured quad pipeline',
        layout: 'auto',
        vertex: {
            module: state.webgpu.device.createShaderModule({
                label: 'textured quad shaders',
                code: state.webgpu.shaderCode,
            }),
            entryPoint: 'vs',
            buffers: [
                {
                    arrayStride: state.webgpu.vertexSize,
                    attributes: [
                        { shaderLocation: 0, offset: 0, format: 'float32x2' },  // pos
                        { shaderLocation: 1, offset: 8, format: 'float32x2' },  // tex
                        { shaderLocation: 2, offset: 16, format: 'float32x4' }  // col
                    ],
                },
            ],
        },
        fragment: {
            module: state.webgpu.device.createShaderModule({
                label: 'textured quad shaders',
                code: state.webgpu.shaderCode,
            }),
            entryPoint: 'fs',
            targets: [{
                format: state.webgpu.presentationFormat,
                blend: {
                    color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                    alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' }
                },
            }],
        },
    });
}
