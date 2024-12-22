// scripts/processors/removeLocalImports.js

import Processor from '../utility/Processor.js';

class RemoveLocalImports extends Processor {
    constructor() {
        super('RemoveLocalImports');
        this.regex = /import\s+.*\s+from\s+['"](?!.*(http|https):\/\/).*['"];/g;
        this.replacement = '';
    }

    process(content) {
        return content.replace(this.regex, this.replacement);
    }
}

export default RemoveLocalImports;