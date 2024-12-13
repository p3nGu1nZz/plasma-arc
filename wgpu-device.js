// wgpu-device.js

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
