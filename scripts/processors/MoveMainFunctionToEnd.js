// scripts/processors/MoveMainFunctionToEnd.js

import Processor from '../utility/Processor.js';
import chalk from 'chalk';

class MoveMainFunctionToEnd extends Processor {
    constructor() {
        super('MoveMainFunctionToEnd');
    }

    process(content) {
        const mainFunctionRegex = /\(function\s*\(\)\s*\{[\s\S]*?\}\)\s*\(\);\s*$/;

        const match = content.match(mainFunctionRegex);
        if (match) {
            const mainFunction = match[0];
            content = content.replace(mainFunctionRegex, '').trim();
            content += `\n\n${mainFunction}`;
            console.log(chalk.green('Moved main function to the end of the content'));
        }

        return content;
    }
}

export default MoveMainFunctionToEnd;
