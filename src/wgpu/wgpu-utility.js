/**
 * @file src/wgpu/wgpu-utility.js
 * @description Utility functions for generating glyph texture atlases and creating textures.
 * @version 1.0.0
 * @license MIT
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

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
