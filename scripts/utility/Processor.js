// scripts/utility/Processor.js

import chalk from 'chalk';
import PrettyError from 'pretty-error';

class Processor {
    static pe = new PrettyError();

    constructor(name) {
        this.name = name || 'Unknown';
        this.processors = [];
    }

    addProcessor(processor) {
        this.processors.push(processor);
    }

    process(content) {
        try {
            let result = content;
            this.processors.forEach(processor => {
                console.log(chalk.blue(`Using processor: ${processor.name}`));
                result = processor.process(result);
            });
            return result;
        } catch (err) {
            console.error(chalk.red(`Error processing: ${err.message}`));
            console.error(Processor.pe.render(err));
            throw err;
        }
    }
}

export default Processor;
