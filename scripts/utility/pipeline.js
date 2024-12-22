// scripts/utility/Pipeline.js

import chalk from 'chalk';
import dotenv from 'dotenv';
import PrettyError from 'pretty-error';

dotenv.config();

class Pipeline {
    static pe = new PrettyError();

    constructor() {
        this.pipes = [];
    }

    connect(pipe) {
        this.pipes.push(pipe);
    }

    async flow() {
        console.log(chalk.green(`Pipeline Start`));
        try {
            for (const pipe of this.pipes) {
                if (typeof pipe.flow === 'function') {
                    await pipe.flow();
                    console.log('');
                } else {
                    throw new Error(`Pipe ${pipe.name} does not have a flow function.`);
                }
            }
            console.log(chalk.green(`Pipeline Complete!`));
        } catch (err) {
            this.drain(err);
        }
    }

    drain(err) {
        console.error(chalk.red(`Pipeline flow clogged: ${err.message}`));
        console.error(Pipeline.pe.render(err));
        this.close();
    }

    close() {
        console.log(chalk.red(`Pipeline closing...`));
        process.exit(1);
    }
}

export default Pipeline;
