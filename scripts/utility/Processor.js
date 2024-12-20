// scripts/utility/Processor.js

import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class Processor {
    static processors = [];

    static addProcessor(name, regex, replacement) {
        Processor.processors.push({ name, regex, replacement });
    }

    static process(content) {
        try {
            let result = content;
            Processor.processors.forEach(({ regex, replacement }) => {
                result = result.replace(regex, replacement);
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
