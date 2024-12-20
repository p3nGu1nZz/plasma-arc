// pipes/utility/Pipe.js

import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class Pipe {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }

    async execute() {
        console.log(chalk.green(`Execute: ${this.name}`));
        try {
            await this.action();
        } catch (err) {
            console.error(chalk.red(`Error in ${this.name}: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }
}

export { Pipe };