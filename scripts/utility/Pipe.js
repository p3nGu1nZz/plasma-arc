// pipes/utility/Pipe.js

import chalk from 'chalk';
import PrettyError from 'pretty-error';

class Pipe {
    static pe = new PrettyError();

    constructor(name, action) {
        this.name = name;
        this.action = action;
    }

    async flow() {
        console.log(chalk.green(`Flow: ${this.name}`));
        try {
            await this.action();
        } catch (err) {
            console.error(chalk.red(`Error in ${this.name}: ${err.message}`));
            console.error(Pipe.pe.render(err));
            throw err;
        }
    }
}

export default Pipe;
