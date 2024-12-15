/**
 * @file wgpu-device.js
 * @description This module provides functions to initialize the WebGPU device and context for the simulation.
 *              It handles device requests and configures the WebGPU context for rendering.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Functions:
 * - initializeDevice(state): Initializes the WebGPU device and context for the simulation.
 */

// Initializes the WebGPU device and context for the simulation
export async function initializeDevice(state) {
    state.webgpu.context = state.canvas.getContext('webgpu');
    state.webgpu.device = await state.webgpu.adapter?.requestDevice();
    
    if (!state.webgpu.device) {
        alert('need a browser that supports WebGPU');
        state.webgpu.device = null;
        state.webgpu.context = null;
        state.webgpu.presentationFormat = null;
        return;
    }

    state.webgpu.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    state.webgpu.context.configure({
        device: state.webgpu.device,
        format: state.webgpu.presentationFormat,
    });
}
