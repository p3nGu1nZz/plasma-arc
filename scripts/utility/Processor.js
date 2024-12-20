import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class Processor {
    constructor() {
        this.processors = [];
    }

    addProcessor(processor) {
        this.processors.push(processor);
    }

    process(content) {
        try {
            let result = content;
            this.processors.forEach(processor => {
                result = processor.process(result);
            });
            return result;
        } catch (err) {
            console.error(chalk.red(`Error processing content: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }
}

export default Processor;
