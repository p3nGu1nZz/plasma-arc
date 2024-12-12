// wgpu-timing.js

export function initializeTiming(state) {
    state.timing.fixedDeltaTime = 1 / 60;
    state.timing.maxFrameTime = 0.25;
    state.timing.targetFps = 60;
    state.timing.frameDuration = 1000 / 60;
    state.timing.lastTime = performance.now();
    state.timing.accumulator = 0;
    state.timing.currentTime = 0;
    state.timing.frameTime = 0;
    state.timing.deltaTime = 0;
    state.timing.time = 0;
}
