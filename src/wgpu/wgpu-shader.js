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

export async function fetchShaderCode(source) {
    try {
        switch (true) {
            case typeof source !== 'string':
                throw new Error('Invalid shader source type');

            case typeof global.SHADERS !== 'undefined' && source in global.SHADERS:
                let shaderCode = global.SHADERS[source];
                if (shaderCode.startsWith('`') && shaderCode.endsWith('`')) {
                    shaderCode = shaderCode.slice(1, -1).trim();
                }
                return shaderCode;

            default:
                const response = await fetch(source);
                shaderCode = await response.text();
                global.SHADERS[source] = `\`${shaderCode}\``;
                return shaderCode;
        }
    } catch (err) {
        throw new Error(`Error fetching shader code: ${err.message}`);
    }
}

export async function InitializeShaders(state) {
    state.webgpu.shaderCode = await fetchShaderCode('shaders.wgsl');
}
