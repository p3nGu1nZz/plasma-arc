/**
 * @file wgpu-shaders.js
 * @description This module provides functions to fetch and initialize shader code for the WebGPU-based simulation.
 *              It handles the retrieval of shader code from a specified URL and sets it up for use in the simulation.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Functions:
 * - fetchShaderCode(url): Fetches shader code from the given URL.
 * - InitializeShaders(state): Initializes shaders by fetching the shader code.
 */

// Fetches shader code from the given URL
export async function fetchShaderCode(url) {
    const response = await fetch(url);
    return await response.text();
}

// Initializes shaders by fetching the shader code
export async function InitializeShaders(state) {
    state.webgpu.shaderCode = await fetchShaderCode('shaders.wgsl');
}
