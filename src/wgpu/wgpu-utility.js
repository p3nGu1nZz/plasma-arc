/**
 * @file wgpu-utility.js
 * @description This module provides utility functions for the WebGPU-based simulation, including generating
 *              glyph texture atlases and creating textures from various sources.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Functions:
 * - generateGlyphTextureAtlas(canvas, ctx, config): Generates a texture atlas for glyphs.
 * - createTextureFromSource(device, source, options): Creates a texture from the given source.
 */

// Generates a texture atlas for glyphs
export function generateGlyphTextureAtlas(canvas, ctx, config) {
    canvas.width = config.canvas.width;
    canvas.height = config.canvas.height;
    ctx.font = config.context.font
    ctx.textBaseline = config.context.textBaseline;
    ctx.textAlign = config.context.textAlign;
    ctx.fillStyle = config.context.fillStyle;
    for (let c = 33, x = 0, y = 0; c < 128; ++c) {
        ctx.fillText(String.fromCodePoint(c), x + config.glyphWidth / 2, y + config.glyphHeight / 2);
        x = (x + config.glyphWidth) % canvas.width;
        if (x === 0) y += config.glyphHeight;
    }
    return canvas;
}

// Creates a texture from the given source
export function createTextureFromSource(device, source, options = {}) {
    const texture = device.createTexture({
        format: 'rgba8unorm',
        size: [source.width, source.height],
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    device.queue.copyExternalImageToTexture(
        { source, flipY: options.flipY },
        { texture, premultipliedAlpha: true },
        { width: source.width, height: source.height }
    );

    return texture;
}
