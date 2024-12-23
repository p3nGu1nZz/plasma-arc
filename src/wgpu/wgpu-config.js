/**
 * @file src/wgpu/wgpu-config.js
 * @description Configuration settings for the WebGPU-based simulation.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

export const CONFIG = {
    glyphsAcrossTexture: 16,
    glyphWidth: 32,
    glyphHeight: 40,
    maxGlyphs: 100,
    vertsPerGlyph: 6,
    floatsPerVertex: 8,
    uniformBufferSize: 64,
    floatsInUniformBuffer: 16,
    matrixSize: 16,
    vertexMultiplier: 4,
    canvas: {
        width: 512,
        height: 256
    },
    context: {
        font: '32px monospace',
        textBaseline: 'middle',
        textAlign: 'center',
        fillStyle: 'white'
    },
    render: {
        zNear: 0.001,
        zFar: 50
    },
    timing: {
        fixedDeltaTime: 1 / 60,
        maxFrameTime: 0.25,
        targetFps: 60,
        frameDuration: 1000 / 60
    },
    maxFPS: 60,
    dependencies: {
        mat4: 'https://webgpufundamentals.org/3rdparty/wgpu-matrix.module.js'
    }
};
