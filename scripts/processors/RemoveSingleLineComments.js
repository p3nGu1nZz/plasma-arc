// scripts/processors/RemoveSingleLineComments.js

class RemoveSingleLineComments {
    constructor() {
        this.regex = /\/\/.*$/gm;
        this.replacement = '';
    }

    process(content) {
        return content.split('\n').map(line => {
            if (/^\s*import\s+\{.*['"](http|https):\/\//.test(line)) {
                return line;
            }
            return line.replace(this.regex, this.replacement);
        }).join('\n');
    }
}

export default RemoveSingleLineComments;
