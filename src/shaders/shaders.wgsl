/**
 * @file shader.wgsl
 * @description Vertex and fragment shaders for the Plasma Arc Project. These shaders handle the transformation of
 *              vertices and the sampling of textures to produce the final rendered image.
 * @version 1.0.0
 * @license MIT
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * 
 * Vertex Shader:
 * - Transforms vertex positions using a uniform matrix
 * - Passes texture coordinates and colors to the fragment shader
 * 
 * Fragment Shader:
 * - Samples textures using provided coordinates and combines with vertex colors
 */

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
