// scripts/processors/RemoveExportFromDeclarations.js

import Processor from '../utility/Processor.js';
import chalk from 'chalk';

class RemoveExportFromDeclarations extends Processor {
    constructor(functionNames, constNames) {
        super('RemoveExportFromDeclarations');
        this.functionNames = functionNames;
        this.constNames = constNames;
    }

    process(content) {
        const functionRegex = /export\s+(async\s+)?function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g;
        const constRegex = /^export\s+const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/gm;

        const updatedContent = content.replace(functionRegex, (match, p1, p2) => {
            this.functionNames.push(p2);
            return `${p1 ? p1 : ''}function ${p2}(`;
        }).replace(constRegex, (match, p1) => {
            this.constNames.push(p1);
            return `const ${p1} =`;
        });

        console.log(chalk.green(`Processed function names: ${this.functionNames.join(', ')}`));
        console.log(chalk.green(`Processed const names: ${this.constNames.join(', ')}`));
        return updatedContent;
    }
}

export default RemoveExportFromDeclarations;
