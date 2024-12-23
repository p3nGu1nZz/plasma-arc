/**
 * @file src/wgpu/wgpu-adapter.js
 * @description Provides an Adapter class to manage WebGPU adapter interactions.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

export class Adapter {
    constructor() {
        this.adapter = null;
    }

    async _requestAdapter() {
        this.adapter = await navigator.gpu.requestAdapter();
    }

    getAdapter() {
        return this.adapter;
    }

    static async createAdapter(state) {
        const adapterInstance = new Adapter();
        await adapterInstance._requestAdapter();
        state.webgpu.adapter = adapterInstance.getAdapter();
    }
}
