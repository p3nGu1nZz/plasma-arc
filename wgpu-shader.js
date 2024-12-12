// wgpu-shaders.js

export async function fetchShaderCode(url) {
    const response = await fetch(url);
    return await response.text();
}