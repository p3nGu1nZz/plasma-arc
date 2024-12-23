/**
 * @file wgpu-device.js
 * @description This module provides a Device class to initialize the WebGPU device and context for the simulation.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

export class Device {
    constructor() {
        this.context = null;
        this.device = null;
        this.presentationFormat = null;
    }

    static async createDevice(state) {
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
}
