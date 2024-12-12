// wgpu-devices.js

export async function initializeWebGPU(navigator, adapter, canvas) {
    const context = canvas.getContext('webgpu');
    const device = await adapter?.requestDevice();
    if (!device) {
        alert('need a browser that supports WebGPU');
        return { device: null, context: null, presentationFormat: null };
    }

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device,
        format: presentationFormat,
    });

    return { device, context, presentationFormat };
}