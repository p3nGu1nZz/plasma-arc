// scripts/processors/RemoveDuplicateNewLines.js

import Processor from '../utility/Processor.js';
import chalk from 'chalk';

class RemoveDuplicateNewLines extends Processor {
    constructor() {
        super('RemoveDuplicateNewLines');
    }

    process(content) {
        const originalLength = content.length;
        const lines = content.split(/(?:\r\n|\r|\n|\u2028|\u2029|\u0085)/);
        const originalLines = lines.length;

        const result = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() !== '' || (i > 0 && lines[i - 1].trim() !== '')) {
                result.push(lines[i]);
            }
        }

        const processedContent = result.join('\n');
        const processedLength = processedContent.length;
        const processedLines = result.length;
        const lengthDelta = originalLength - processedLength;
        const linesDelta = originalLines - processedLines;

        console.log(chalk.green(`Processed content length: ${processedLength} bytes (${lengthDelta} bytes removed)`));
        console.log(chalk.green(`Processed number of lines: ${processedLines} (${linesDelta} lines removed)`));

        return processedContent;
    }
}

export default RemoveDuplicateNewLines;
