// scripts/processors/GenerateNamedExports.js

import Processor from '../utility/Processor.js';
import chalk from 'chalk';

class GenerateNamedExports extends Processor {
    constructor(functionNames, constNames) {
        super('GenerateNamedExports');
        this.functionNames = functionNames;
        this.constNames = constNames;
    }

    process(content) {
        const allExports = [...this.functionNames, ...this.constNames];
        const exportStatements = `export { ${allExports.join(', ')} };`;

        const updatedContent = `${content}\n\n${exportStatements}`;
        console.log(chalk.green(`Generated export statement: ${exportStatements}`));
        return updatedContent;
    }
}

export default GenerateNamedExports;
