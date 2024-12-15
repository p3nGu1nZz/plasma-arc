/**
 * @file index.js
 * @description Main entry point for the Plasma Arc Project. This script initializes and manages the WebGPU 
 *              simulation, including device setup, shaders, pipeline, resources, and game loop.
 * @version 1.0.0
 * @license MIT
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * 
 * Imports:
 * - mat4: Matrix operations from wgpu-matrix.module.js
 * - Constants and configurations from wgpu-constants.js and wgpu-config.js
 * - State management, device initialization, buffers, pipeline, and utility functions
 *   from their respective modules in the project.
 */

import { mat4 } from 'https://webgpufundamentals.org/3rdparty/wgpu-matrix.module.js';

import { CANVAS, CTX, COLORS, RENDER_PASS_DESCRIPTOR } from './wgpu-constants.js';
import { config } from './wgpu-config.js';

import { createState } from './wgpu-state.js';
import { initializeDevice } from './wgpu-device.js';
import { CreateBuffers } from './wgpu-buffer.js';
import { InitializePipeline } from './wgpu-pipeline.js';

import { generateGlyphTextureAtlas, createTextureFromSource } from './wgpu-utility.js';
import { InitializeShaders } from './wgpu-shader.js';
import { GenerateVertexDataAndTexture } from './wgpu-texture.js';
import { generateGlyphVerticesForText } from './wgpu-text.js';

// Main asynchronous function to initialize and run the simulation
(async () => {
    const state = createState(config);

    async function Main() {
        await InitializeAdapter(state);
        await InitializeCanvas(state);
        await initializeDevice(state);
        await InitializeShaders(state);
        await InitializePipeline(state);
        await InitializeResources(state);

        GameLoop(state);
    }

    async function InitializeAdapter(state) {
        state.webgpu.adapter = await navigator.gpu.requestAdapter();
    }

    async function InitializeCanvas(state) {
        state.canvas.width = config.canvas.width;
        state.canvas.height = config.canvas.height;
    }

    async function InitializeResources(state) {
        state.webgpu.glyphCanvas = generateGlyphTextureAtlas(CANVAS, CTX, config);
        document.body.appendChild(state.webgpu.glyphCanvas);
        state.webgpu.glyphCanvas.style.backgroundColor = '#222';

        CreateBuffers(state, config);
        GenerateVertexDataAndTexture(state, state.webgpu.glyphCanvas, generateGlyphVerticesForText, COLORS, config, createTextureFromSource);
    }

    function FixedUpdate(state) {
        state.timing.time += state.timing.fixedDeltaTime;
    }

    function Render(state) {
        const fov = 60 * Math.PI / 180;
        const aspect = state.canvas.clientWidth / state.canvas.clientHeight;
        const projectionMatrix = mat4.perspective(fov, aspect, config.render.zNear, config.render.zFar);
        const viewMatrix = mat4.lookAt([0, 0, 5], [0, 0, 0], [0, 1, 0]);
        const viewProjectionMatrix = mat4.multiply(projectionMatrix, viewMatrix);

        RENDER_PASS_DESCRIPTOR.colorAttachments[0].view = state.webgpu.context.getCurrentTexture().createView();
        const encoder = state.webgpu.device.createCommandEncoder();
        const pass = encoder.beginRenderPass(RENDER_PASS_DESCRIPTOR);

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

    function GameLoop(state) {
        function Tick(state) {
            state.timing.currentTime = performance.now();
            state.timing.frameTime = (state.timing.currentTime - state.timing.lastTime) / 1000;
            state.timing.lastTime = state.timing.currentTime;
            state.timing.deltaTime = Math.min(state.timing.frameTime, state.timing.maxFrameTime);
            state.timing.accumulator += state.timing.deltaTime;

            while (state.timing.accumulator >= state.timing.fixedDeltaTime) {
                FixedUpdate(state);
                state.timing.accumulator -= state.timing.fixedDeltaTime;
            }

            Render(state);
            setTimeout(() => Tick(state), state.timing.frameDuration);
        }

        Tick(state);
    }

    await Main();
})();
