/**
 * @file wgpu-buffer.js
 * @description This module provides functions to create and manage buffers for the WebGPU-based simulation,
 *              including the creation of vertex and index buffers and the generation of indices.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Functions:
 * - CreateBuffers(state, config): Creates and initializes the vertex and index buffers.
 * - GenerateIndices(maxGlyphs): Generates the index data for the buffers.
 */

// Creates and initializes the vertex and index buffers
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

// Generates the index data for the buffers
export function GenerateIndices(maxGlyphs) {
    return Array.from({ length: maxGlyphs * 6 }, (_, i) => {
        const ndx = Math.floor(i / 6) * 4;
        return (i % 6 < 3 ? [ndx, ndx + 1, ndx + 2] : [ndx + 2, ndx + 1, ndx + 3])[i % 3];
    });
}
