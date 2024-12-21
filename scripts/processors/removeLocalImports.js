// scripts/processors/removeLocalImports.js

import Processor from '../utility/Processor.js';

class RemoveLocalImports extends Processor {
    constructor() {
        super('removeLocalImports', /import\s+.*\s+from\s+['"]\.\/.*['"];/g, '');
    }
}

export default RemoveLocalImports;
