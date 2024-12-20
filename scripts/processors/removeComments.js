// scripts/processors/removeComments.js

const removeSingleLineComments = {
    name: 'removeSingleLineComments',
    regex: /(^|\s)\/\/(?!\shttps?:\/\/).*/g,
    replacement: ''
};

const removeMultiLineComments = {
    name: 'removeMultiLineComments',
    regex: /\/\*[^]*?\*\//g,
    replacement: ''
};

export { removeSingleLineComments, removeMultiLineComments };
