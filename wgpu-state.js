export function createState(config) {
    return {
        webgpu: {
            device: null,
            pipeline: null,
            vertexBuffer: null,
            indexBuffer: null,
            uniformBuffer: null,
            texture: null,
            sampler: null,
            bindGroup: null,
            context: null,
            presentationFormat: null,
        },
        matrices: {
            uniformValues: new Float32Array(config.uniformBufferSize / 4),
            matrix: new Float32Array(16),
        },
        glyphs: {
            numGlyphs: 0,
            width: 0,
            height: 0,
        },
        canvas: null,
        timing: {
            time: 0,
            fixedDeltaTime: 0,
            maxFrameTime: 0,
            targetFps: 0,
            frameDuration: 0,
            accumulator: 0,
            deltaTime: 0,
            currentTime: 0,
            frameTime: 0,
            lastTime: 0,
        }
    };
}
