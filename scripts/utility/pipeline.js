// scripts/utility/Pipeline.js

import chalk from 'chalk';
import dotenv from 'dotenv';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

dotenv.config();

class Pipeline {
    constructor() {
        this.pipes = [];
    }

    add(pipe) {
        this.pipes.push(pipe);
    }

    async execute() {
        console.log(chalk.green(`Pipeline Start`));
        try {
            for (const pipe of this.pipes) {
                await pipe.execute();
            }
            console.log(chalk.green(`Pipeline Complete!`));
            console.log();
        } catch (err) {
            this.handleError(err);
        }
    }

    handleError(err) {
        console.error(chalk.red(`Pipeline execution failed: ${err.message}`));
        console.error(pe.render(err));
        this.exit();
    }

    exit() {
        console.log(chalk.red(`Pipeline exiting...`));
        process.exit(1);
    }
}

export default Pipeline;
