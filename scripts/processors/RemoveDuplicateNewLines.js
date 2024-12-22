// scripts/processors/RemoveDuplicateNewLines.js

import Processor from '../utility/Processor.js';

class RemoveDuplicateNewLines extends Processor {
    constructor() {
        super('RemoveDuplicateNewLines');
        this.regex = /\n{2,}/g;
        this.replacement = '\n';
    }

    process(content) {
        return content.replace(this.regex, this.replacement);
    }
}

export default RemoveDuplicateNewLines;
