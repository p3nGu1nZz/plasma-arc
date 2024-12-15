/**
 * @file constants.js
 * @description Defines constant values and settings for the WebGPU-based simulation, including canvas creation,
 *              context setup, color arrays, and render pass descriptors.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Constants:
 * - CANVAS: The main canvas element for rendering.
 * - CTX: The 2D rendering context for the canvas.
 * - COLORS: Array of color values used in the simulation.
 * - RENDER_PASS_DESCRIPTOR: Configuration for the canvas render pass.
 */

export const CANVAS = document.createElement('canvas');
export const CTX = CANVAS.getContext('2d');

export const COLORS = [
    [1, 1, 0, 1],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [0, 0.5, 1, 1]
];

export const RENDER_PASS_DESCRIPTOR = {
    label: 'canvas render pass',
    colorAttachments: [{
        clearValue: [0.3, 0.3, 0.3, 1],
        loadOp: 'clear',
        storeOp: 'store',
    }],
};
