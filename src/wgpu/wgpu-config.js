/**
 * @file wgpu-config.js
 * @description Configuration settings for the WebGPU-based simulation. This file defines various constants 
 *              and parameters used throughout the project, including canvas dimensions, rendering settings, 
 *              and timing configurations.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Configuration:
 * - Glyph settings: glyphsAcrossTexture, glyphWidth, glyphHeight, maxGlyphs, vertsPerGlyph, floatsPerVertex
 * - Canvas settings: width, height
 * - Context settings: font, textBaseline, textAlign, fillStyle
 * - Render settings: zNear, zFar
 * - Timing settings: fixedDeltaTime, maxFrameTime, targetFps, frameDuration
 */

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
