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
        this.logStart();
        try {
            await this.action();
        } catch (err) {
            this.handleLeak(err);
        }
    }

    logStart() {
        console.log(chalk.green(`Flowing: ${this.name}`));
    }

    handleLeak(err) {
        console.error(`  ${chalk.red(`Leak detected during ${this.name}: ${err.message}`)}`);
        console.error(Pipe.pe.render(err));
        throw err;
    }
}

export default Pipe;
