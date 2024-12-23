/**
 * @file wgpu-state.js
 * @description Initializes the state object for the WebGPU-based simulation.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

export async function createState(config, canvas, dependencies) {
    const uniformValues = new Float32Array(config.floatsInUniformBuffer);
    const matrix = new Float32Array(config.matrixSize);
    const vertexSize = config.floatsPerVertex * config.vertexMultiplier;
    const lastTime = performance.now();

    return {
        render: {
            zNear: config.render.zNear,
            zFar: config.render.zFar,
            options: { ...config.render.options }
        },
        webgpu: {
            adapter: null,
            device: null,
            context: null,
            presentationFormat: null,
            pipeline: null,
            vertexBuffer: null,
            indexBuffer: null,
            uniformBuffer: null,
            texture: null,
            sampler: null,
            bindGroup: null,
            shaderCode: null,
            vertexSize,
            glyphCanvas: null
        },
        matrices: {
            uniformValues,
            matrix,
        },
        glyphs: {
            numGlyphs: 0,
            width: 0,
            height: 0,
        },
        canvas,
        timing: {
            time: 0,
            fixedDeltaTime: config.timing.fixedDeltaTime,
            maxFrameTime: config.timing.maxFrameTime,
            targetFps: config.timing.targetFps,
            frameDuration: config.timing.frameDuration,
            accumulator: 0,
            deltaTime: 0,
            currentTime: 0,
            frameTime: 0,
            lastTime,
        },
        dependencies
    };
}
