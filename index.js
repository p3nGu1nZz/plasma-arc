import { mat4 } from 'https://webgpufundamentals.org/3rdparty/wgpu-matrix.module.js';
import { initializeWebGPU } from './wgpu-device.js';
import { createState } from './wgpu-state.js';
import { generateGlyphTextureAtlas, createTextureFromSource } from './wgpu-utility.js';
import { createPipeline } from './wgpu-pipeline.js';
import { fetchShaderCode } from './wgpu-shader.js';
import { GenerateVertexDataAndTexture } from './wgpu-texture.js'; 
import { generateGlyphVerticesForText } from './wgpu-text.js'; 
import { config } from './wgpu-config.js';
import { CANVAS, CTX, COLORS, RENDER_PASS_DESCRIPTOR } from './wgpu-constants.js';
import { CreateBuffers } from './wgpu-buffer.js';
import { initializeTiming } from './wgpu-timing.js';

// Canvas element for rendering
const canvas = document.querySelector('canvas');

// State initialization
const state = createState(config);
state.canvas = canvas;

async function Main() {
    const adapter = await navigator.gpu?.requestAdapter();
    const { device, context, presentationFormat } = await initializeWebGPU(navigator, adapter, state.canvas);
    if (!device) return;

    state.webgpu.device = device;
    state.webgpu.context = context;
    state.webgpu.presentationFormat = presentationFormat;

    // Initialize timing properties
    initializeTiming(state);

    // Initialize Resources
    await InitializeResources();

    // Start the game loop
    GameLoop();
}

async function InitializeResources() {
    const shaderCode = await fetchShaderCode('shaders.wgsl');
    const vertexSize = config.floatsPerVertex * 4;

    state.webgpu.pipeline = await createPipeline(state.webgpu.device, state.webgpu.presentationFormat, vertexSize, shaderCode);
    
    const glyphCanvas = generateGlyphTextureAtlas(CANVAS, CTX, config);
    document.body.appendChild(glyphCanvas);
    glyphCanvas.style.backgroundColor = '#222';

    CreateBuffers(state, config);

    GenerateVertexDataAndTexture(state, glyphCanvas, generateGlyphVerticesForText, COLORS, config, createTextureFromSource);
}

function GameLoop() {
    function Tick() {
        state.timing.currentTime = performance.now();
        state.timing.frameTime = (state.timing.currentTime - state.timing.lastTime) / 1000;
        state.timing.lastTime = state.timing.currentTime;

        state.timing.deltaTime = Math.min(state.timing.frameTime, state.timing.maxFrameTime);
        state.timing.accumulator += state.timing.deltaTime;

        while (state.timing.accumulator >= state.timing.fixedDeltaTime) {
            FixedUpdate(state.timing.fixedDeltaTime);
            state.timing.accumulator -= state.timing.fixedDeltaTime;
        }

        Render();

        setTimeout(Tick, state.timing.frameDuration);
    }

    Tick();
}

function FixedUpdate(deltaTime) {
    state.timing.time += deltaTime;
}

function Render() {
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

Main();
