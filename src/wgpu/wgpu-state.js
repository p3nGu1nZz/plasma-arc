/**
 * @file wgpu-state.js
 * @description This module provides a function to create and initialize the state object for the WebGPU-based simulation.
 *              The state object contains configurations for WebGPU, matrices, glyphs, canvas, and timing settings.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Functions:
 * - createState(config): Initializes and returns the state object with necessary configurations and settings.
 */

// Initializes and returns the state object with necessary configurations and settings
export function createState(config) {
    return {
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
        canvas: document.querySelector('canvas') || document.body.appendChild(document.createElement('canvas')),
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
        }
    };
}
