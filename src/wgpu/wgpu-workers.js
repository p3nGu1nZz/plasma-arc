/**
 * @file src/wgpu/wgpu-workers.js
 * @description Contains the WgpuWorker class and utility functions for creating web workers.
 * @version 1.0.0
 * @license MIT
 * @author Kara Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @see {@link https://huggingface.co/spaces/p3nGu1nZz/plasma-arc|Hugging Face Space}
 */

export function createWorkerFromFunction(workerFunction) {
    const blob = new Blob([`(${workerFunction.toString()})()`], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}

export class WgpuWorker {
    constructor() {
        const workerFunction = function() {
            self.onmessage = function(event) {
                console.log('Message received from main thread', event.data);
                postMessage('Hello from worker');
            };
        };

        this.worker = createWorkerFromFunction(workerFunction);
        this.worker.postMessage('Initialize worker');

        this.worker.onmessage = (event) => {
            console.log('Message received from worker', event.data);
        };
    }
}
