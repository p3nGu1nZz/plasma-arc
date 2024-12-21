// scripts/processors/RemoveDuplicateFunctions.js

import Processor from '../utility/Processor.js';

class RemoveDuplicateFunctions extends Processor {
    constructor() {
        super('removeDuplicateFunctions', /function\s+(\w+)\s*\(/g, (match, p1, offset, string) => {
            const functionDeclarations = new Set();
            if (functionDeclarations.has(p1)) {
                return '';
            }
            functionDeclarations.add(p1);
            return match;
        });
    }
}

export default RemoveDuplicateFunctions;
