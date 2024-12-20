/**
 * @file wgpu-shaders.js
 * @description This module provides functions to fetch and initialize shader code for the WebGPU-based simulation.
 *              It handles the retrieval of shader code from a specified URL or embedded string and sets it up for use in the simulation.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 */

function getEmbeddedString(source) {
    if (source.startsWith('`') && source.endsWith('`')) {
        return source.slice(1, -1);
    }
    return null;
}

export async function fetchShaderCode(source) {
    if (typeof source !== 'string') {
        throw new Error('Invalid shader source type');
    }
    if (typeof shaders !== 'undefined' && source in shaders) {
        return shaders[source];
    }
    const embeddedString = getEmbeddedString(source);
    if (embeddedString !== null) {
        return embeddedString;
    }
    const response = await fetch(source);
    return await response.text();
}

export async function InitializeShaders(state) {
    state.webgpu.shaderCode = await fetchShaderCode('shaders.wgsl');
}
