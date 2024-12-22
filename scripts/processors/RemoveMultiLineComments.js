import Processor from '../utility/Processor.js';

class RemoveMultiLineComments extends Processor {
    constructor() {
        super();
        this.regex = /\/\*[\s\S]*?\*\//gm;
        this.replacement = '';
    }

    process(content) {
        return content.replace(this.regex, match => {
            if (/import\s+['"](http|https):\/\//.test(match)) {
                return match;
            }
            return this.replacement;
        });
    }
}

export default RemoveMultiLineComments;
