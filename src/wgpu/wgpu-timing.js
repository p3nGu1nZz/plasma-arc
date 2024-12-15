/**
 * @file wgpu-timing.js
 * @description This module provides functions to initialize timing configurations for the WebGPU-based simulation.
 *              It sets up timing parameters such as fixed delta time, frame duration, and frame time accumulation.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Functions:
 * - initializeTiming(state): Initializes timing parameters for the simulation.
 */

// Initializes timing parameters for the simulation
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
