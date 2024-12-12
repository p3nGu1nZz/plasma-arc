// constants.js

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
