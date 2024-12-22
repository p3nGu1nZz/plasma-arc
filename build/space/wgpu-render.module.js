const g_SHADERS = {
  "shaders.wgsl": ```wgsl


struct VSInput {
    @location(0) position: vec4f,
    @location(1) texcoord: vec2f,
    @location(2) color: vec4f,
};

struct VSOutput {
    @builtin(position) position: vec4f,
    @location(0) texcoord: vec2f,
    @location(1) color: vec4f,
};

struct Uniforms {
    matrix: mat4x4f,
};

@group(0) @binding(2) var<uniform> uni: Uniforms;

@vertex fn vs(vin: VSInput) -> VSOutput {
    var vsOutput: VSOutput;
    vsOutput.position = uni.matrix * vin.position;
    vsOutput.texcoord = vin.texcoord;
    vsOutput.color = vin.color;
    return vsOutput;
}

@group(0) @binding(0) var ourSampler: sampler;
@group(0) @binding(1) var ourTexture: texture_2d<f32>;

@fragment fn fs(fsInput: VSOutput) -> @location(0) vec4f {
    return textureSample(ourTexture, ourSampler, fsInput.texcoord) * fsInput.color;
}

```,
};



import { mat4 } from 'https://webgpufundamentals.org/3rdparty/wgpu-matrix.module.js';















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



export function generateGlyphTextureAtlas(canvas, ctx, config) {
    canvas.width = config.canvas.width;
    canvas.height = config.canvas.height;
    ctx.font = config.context.font
    ctx.textBaseline = config.context.textBaseline;
    ctx.textAlign = config.context.textAlign;
    ctx.fillStyle = config.context.fillStyle;
    for (let c = 33, x = 0, y = 0; c < 128; ++c) {
        ctx.fillText(String.fromCodePoint(c), x + config.glyphWidth / 2, y + config.glyphHeight / 2);
        x = (x + config.glyphWidth) % canvas.width;
        if (x === 0) y += config.glyphHeight;
    }
    return canvas;
}


export function createTextureFromSource(device, source, options = {}) {
    const texture = device.createTexture({
        format: 'rgba8unorm',
        size: [source.width, source.height],
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    device.queue.copyExternalImageToTexture(
        { source, flipY: options.flipY },
        { texture, premultipliedAlpha: true },
        { width: source.width, height: source.height }
    );

    return texture;
}



export function initializeTiming(state) {
    state.timing.fixedDeltaTime = 1 / 60;
    state.timing.maxFrameTime = 0.25;
    state.timing.targetFps = 60;
    state.timing.frameDuration = 1000 / 60;
    state.timing.lastTime = performance.now();
    state.timing.accumulator = 0;
    state.timing.currentTime = 0;
    state.timing.frameTime = 0;
    state.timing.deltaTime = 0;
    state.timing.time = 0;
}



export function GenerateVertexDataAndTexture(state, glyphCanvas, generateGlyphVerticesForText, COLORS, config, createTextureFromSource) {
    const glyphData = generateGlyphVerticesForText('Hello\nworld!\nText in\nWebGPU!', COLORS, config, glyphCanvas);
    state.webgpu.device.queue.writeBuffer(state.webgpu.vertexBuffer, 0, glyphData.vertexData);

    state.webgpu.texture = createTextureFromSource(state.webgpu.device, glyphCanvas, { mips: true });
    state.webgpu.sampler = state.webgpu.device.createSampler({
        minFilter: 'linear',
        magFilter: 'linear',
    });

    state.webgpu.uniformBuffer = state.webgpu.device.createBuffer({
        label: 'uniforms for quad',
        size: config.uniformBufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    state.matrices.matrix = state.matrices.uniformValues.subarray(0, 16);

    state.webgpu.bindGroup = state.webgpu.device.createBindGroup({
        layout: state.webgpu.pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: state.webgpu.sampler },
            { binding: 1, resource: state.webgpu.texture.createView() },
            { binding: 2, resource: { buffer: state.webgpu.uniformBuffer } },
        ],
    });

    state.glyphs.numGlyphs = glyphData.numGlyphs;
    state.glyphs.width = glyphData.width;
    state.glyphs.height = glyphData.height;
}



export function generateGlyphVerticesForText(text, colors, config, glyphCanvas) {
    const vertexData = new Float32Array(config.maxGlyphs * config.floatsPerVertex * config.vertsPerGlyph);
    const glyphUVWidth = config.glyphWidth / glyphCanvas.width;
    const glyphUVHeight = config.glyphHeight / glyphCanvas.height;
    let offset = 0, x0 = 0, y0 = 0, x1 = 1, y1 = 1, width = 0;
    let colorNdx = 0;

    const addVertex = (x, y, u, v, color) => {
        vertexData.set([x, y, u, v, ...color], offset);
        offset += 8;
    };

    for (let i = 0; i < text.length; ++i) {
        const c = text.charCodeAt(i);
        if (c >= 33) {
            const cIndex = c - 33;
            const glyphX = cIndex % config.glyphsAcrossTexture;
            const glyphY = Math.floor(cIndex / config.glyphsAcrossTexture);
            const u0 = glyphX * config.glyphWidth / glyphCanvas.width;
            const v1 = glyphY * config.glyphHeight / glyphCanvas.height;
            const u1 = u0 + glyphUVWidth;
            const v0 = v1 + glyphUVHeight;
            width = Math.max(x1, width);
            addVertex(x0, y0, u0, v0, colors[colorNdx]);
            addVertex(x1, y0, u1, v0, colors[colorNdx]);
            addVertex(x0, y1, u0, v1, colors[colorNdx]);
            addVertex(x1, y1, u1, v1, colors[colorNdx]);
        } else {
            colorNdx = (colorNdx + 1) % colors.length;
            if (c === 10) { 
                x0 = 0; x1 = 1; y0--; y1 = y0 + 1;
                continue;
            }
        }
        x0 += 0.55; x1 = x0 + 1;
    }
    return { vertexData, numGlyphs: offset / config.floatsPerVertex, width, height: y1 };
}



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


export async function fetchShaderCode(source) {
    try {
        switch (true) {
            case typeof source !== 'string':
                throw new Error('Invalid shader source type');

            case typeof g_SHADERS !== 'undefined' && source in g_SHADERS:
                let shaderCode = g_SHADERS[source];
                if (shaderCode.startsWith('```wgsl') && shaderCode.endsWith('```')) {
                    shaderCode = shaderCode.slice(7, -3).trim();
                }
                return shaderCode;

            default:
                const response = await fetch(source);
                shaderCode = await response.text();
                g_SHADERS[source] = `\`\`\`wgsl\n${shaderCode}\n\`\`\``;
                return shaderCode;
        }
    } catch (err) {
        throw new Error(`Error fetching shader code: ${err.message}`);
    }
}

export async function InitializeShaders(state) {
    state.webgpu.shaderCode = await fetchShaderCode('shaders.wgsl');
}



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
                        { shaderLocation: 0, offset: 0, format: 'float32x2' },  
                        { shaderLocation: 1, offset: 8, format: 'float32x2' },  
                        { shaderLocation: 2, offset: 16, format: 'float32x4' }  
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






export async function initializeDevice(state) {
    state.webgpu.context = state.canvas.getContext('webgpu');
    state.webgpu.device = await state.webgpu.adapter?.requestDevice();
    
    if (!state.webgpu.device) {
        alert('need a browser that supports WebGPU');
        state.webgpu.device = null;
        state.webgpu.context = null;
        state.webgpu.presentationFormat = null;
        return;
    }

    state.webgpu.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    state.webgpu.context.configure({
        device: state.webgpu.device,
        format: state.webgpu.presentationFormat,
    });
}


export const CANVAS = document.createElement('canvas');
export const CTX = CANVAS.getContext('2d');

export const COLORS = [
    [1, 1, 0, 1],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [0, 0.5, 1, 1]
];

export const RENDER_PASS_DESCRIPTOR = {
    label: 'canvas render pass',
    colorAttachments: [{
        clearValue: [0.3, 0.3, 0.3, 1],
        loadOp: 'clear',
        storeOp: 'store',
    }],
};


export const config = {
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
    maxFPS: 60
};



export function CreateBuffers(state, config) {
    const vertexBufferSize = config.maxGlyphs * config.vertsPerGlyph * config.floatsPerVertex * 4;
    state.webgpu.vertexBuffer = state.webgpu.device.createBuffer({
        label: 'vertices',
        size: vertexBufferSize,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    state.webgpu.indexBuffer = state.webgpu.device.createBuffer({
        label: 'indices',
        size: config.maxGlyphs * config.vertsPerGlyph * 4,
        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    });

    const indices = GenerateIndices(config.maxGlyphs);
    state.webgpu.device.queue.writeBuffer(state.webgpu.indexBuffer, 0, new Uint32Array(indices));
}


export function GenerateIndices(maxGlyphs) {
    return Array.from({ length: maxGlyphs * 6 }, (_, i) => {
        const ndx = Math.floor(i / 6) * 4;
        return (i % 6 < 3 ? [ndx, ndx + 1, ndx + 2] : [ndx + 2, ndx + 1, ndx + 3])[i % 3];
    });
}
