/**
 * @file src/index.js
 * @description Main entry point for the Plasma Arc Project.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

const CANVAS = document.createElement('canvas');
const CTX = CANVAS.getContext('2d');

import { config } from './wgpu-config.js';

import { createState } from './wgpu-state.js';
import { Adapter } from './wgpu-adapter.js';
import { initializeDevice } from './wgpu-device.js';
import { CreateBuffers } from './wgpu-buffer.js';
import { InitializePipeline } from './wgpu-pipeline.js';

import { createTextureFromSource, loadDependencies } from './wgpu-utility.js';
import { InitializeShaders } from './wgpu-shaders.js';
import { GenerateVertexDataAndTexture } from './wgpu-texture.js';
import { generateGlyphVerticesForText } from './wgpu-text.js';
import { createCanvas, setupCanvas } from './wgpu-canvas.js';

async function Main() {
    const canvas = setupCanvas(config);
    const deps = await loadDependencies(config.dependencies);
    const state = await createState(config, canvas, deps);

    await Adapter.createAdapter(state);
    await initializeDevice(state);
    await InitializeShaders(state);
    await InitializePipeline(state);
    await _initializeResources(state);

    _gameLoop(state);
}

async function _initializeResources(state) {
    createCanvas(state, CANVAS, CTX, config);
    CreateBuffers(state, config);
    GenerateVertexDataAndTexture(state, state.webgpu.glyphCanvas, generateGlyphVerticesForText, config.colors, config, createTextureFromSource);
}

function _fixedUpdate(state) {
    state.timing.time += state.timing.fixedDeltaTime;
}

function Render(state) {
    const { mat4 } = state.dependencies;
    const fov = 60 * Math.PI / 180;
    const aspect = state.canvas.clientWidth / state.canvas.clientHeight;
    const projectionMatrix = mat4.perspective(fov, aspect, state.render.zNear, state.render.zFar);
    const viewMatrix = mat4.lookAt([0, 0, 5], [0, 0, 0], [0, 1, 0]);
    const viewProjectionMatrix = mat4.multiply(projectionMatrix, viewMatrix);

    state.render.options.colorAttachments[0].view = state.webgpu.context.getCurrentTexture().createView();
    const encoder = state.webgpu.device.createCommandEncoder();
    const pass = encoder.beginRenderPass(state.render.options);

    pass.setPipeline(state.webgpu.pipeline);
    mat4.rotateY(viewProjectionMatrix, state.timing.time, state.matrices.matrix);
    mat4.translate(state.matrices.matrix, [-state.glyphs.width / 2, -state.glyphs.height / 2, 0], state.matrices.matrix);

    state.webgpu.device.queue.writeBuffer(state.webgpu.uniformBuffer, 0, state.matrices.uniformValues);

    pass.setBindGroup(0, state.webgpu.bindGroup);
    pass.setVertexBuffer(0, state.webgpu.vertexBuffer);
    pass.setIndexBuffer(state.webgpu.indexBuffer, 'uint32');
    pass.drawIndexed(state.glyphs.numGlyphs * 6);
    pass.end();

    state.webgpu.device.queue.submit([encoder.finish()]);
}

function _gameLoop(state) {
    function _tick(state) {
        state.timing.currentTime = performance.now();
        state.timing.frameTime = (state.timing.currentTime - state.timing.lastTime) / 1000;
        state.timing.lastTime = state.timing.currentTime;
        state.timing.deltaTime = Math.min(state.timing.frameTime, state.timing.maxFrameTime);
        state.timing.accumulator += state.timing.deltaTime;

        while (state.timing.accumulator >= state.timing.fixedDeltaTime) {
            _fixedUpdate(state);
            state.timing.accumulator -= state.timing.fixedDeltaTime;
        }

        Render(state);
        setTimeout(() => _tick(state), state.timing.frameDuration);
    }

    _tick(state);
}

// Start the simulation
Main();
