// wgpu-text.js

export function generateGlyphVerticesForText(text, colors, config, glyphCanvas) {
    const vertexData = new Float32Array(config.maxGlyphs * config.floatsPerVertex * config.vertsPerGlyph);
    const glyphUVWidth = config.glyphWidth / glyphCanvas.width;
    const glyphUVHeight = config.glyphHeight / glyphCanvas.height;
    let offset = 0, x0 = 0, y0 = 0, x1 = 1, y1 = 1, width = 0;
    let colorNdx = 0;

    const addVertex = (x, y, u, v, color) => {
        vertexData.set([x, y, u, v, ...color], offset);
        offset += 8;
    };

    for (let i = 0; i < text.length; ++i) {
        const c = text.charCodeAt(i);
        if (c >= 33) {
            const cIndex = c - 33;
            const glyphX = cIndex % config.glyphsAcrossTexture;
            const glyphY = Math.floor(cIndex / config.glyphsAcrossTexture);
            const u0 = glyphX * config.glyphWidth / glyphCanvas.width;
            const v1 = glyphY * config.glyphHeight / glyphCanvas.height;
            const u1 = u0 + glyphUVWidth;
            const v0 = v1 + glyphUVHeight;
            width = Math.max(x1, width);
            addVertex(x0, y0, u0, v0, colors[colorNdx]);
            addVertex(x1, y0, u1, v0, colors[colorNdx]);
            addVertex(x0, y1, u0, v1, colors[colorNdx]);
            addVertex(x1, y1, u1, v1, colors[colorNdx]);
        } else {
            colorNdx = (colorNdx + 1) % colors.length;
            if (c === 10) { // Newline
                x0 = 0; x1 = 1; y0--; y1 = y0 + 1;
                continue;
            }
        }
        x0 += 0.55; x1 = x0 + 1;
    }
    return { vertexData, numGlyphs: offset / config.floatsPerVertex, width, height: y1 };
}
