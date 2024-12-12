// wgpu-buffer.js

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
