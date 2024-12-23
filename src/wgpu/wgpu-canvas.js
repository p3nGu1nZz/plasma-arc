/**
 * @file src/wgpu/wgpu-canvas.js
 * @description Contains utility functions for canvas creation and manipulation in the WebGPU-based simulation.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

// Creates and appends the glyph canvas to the document body
export function CreateCanvas(state, canvas, ctx, config) {
    const glyphCanvas = _generateGlyphTextureAtlas(canvas, ctx, config);
    glyphCanvas.style.backgroundColor = config.webgpu.glyphCanvas.style.backgroundColor;
    document.body.appendChild(glyphCanvas);
    state.webgpu.glyphCanvas = glyphCanvas;
    return glyphCanvas;
}

// Function for generating glyph texture atlas
function _generateGlyphTextureAtlas(canvas, ctx, config) {
    canvas.width = config.canvas.width;
    canvas.height = config.canvas.height;
    canvas.style.backgroundColor = config.webgpu.glyphCanvas.style.backgroundColor;
    ctx.font = config.context.font;
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
