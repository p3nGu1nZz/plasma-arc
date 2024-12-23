/**
 * @file wgpu-state.js
 * @description This module initializes the state object for the WebGPU-based simulation.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

export async function createState(config) {
    const dependencies = await _loadDependencies(config.dependencies);
    const canvas = _setupCanvas(config.canvas.width, config.canvas.height);

    return {
        render: {
            zNear: config.render.zNear,
            zFar: config.render.zFar
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
            vertexSize: config.floatsPerVertex * config.vertexMultiplier,
            glyphCanvas: null
        },
        matrices: {
            uniformValues: new Float32Array(config.floatsInUniformBuffer),
            matrix: new Float32Array(config.matrixSize),
        },
        glyphs: {
            numGlyphs: 0,
            width: 0,
            height: 0,
        },
        canvas: canvas,
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
            lastTime: performance.now(),
        },
        dependencies
    };
}

async function _loadDependencies(dependenciesConfig) {
    const dependencies = {};
    for (const [key, value] of Object.entries(dependenciesConfig)) {
        dependencies[key] = (await import(value))[key];
    }
    return dependencies;
}

function _setupCanvas(width, height) {
    const canvas = document.querySelector('canvas') || document.body.appendChild(document.createElement('canvas'));
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
