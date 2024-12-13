// wgpu-shaders.js

export async function fetchShaderCode(url) {
    const response = await fetch(url);
    return await response.text();
}

export async function InitializeShaders(state) {
    state.webgpu.shaderCode = await fetchShaderCode('shaders.wgsl');
}
