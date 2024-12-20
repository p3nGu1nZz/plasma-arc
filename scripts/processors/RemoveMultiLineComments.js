// scripts/processors/RemoveMultiLineComments.js

class RemoveMultiLineComments {
    constructor() {
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
