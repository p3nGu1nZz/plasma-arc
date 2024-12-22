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
        console.log(chalk.green.bold(`Pipeline Opened`));
        console.log();
        try {
            for (const pipe of this.pipes) {
                console.log(chalk.green.bold(`Flowing: ${pipe.constructor.name}`));
                if (typeof pipe.flow === 'function') {
                    await pipe.flow();
                } else {
                    throw new Error(`Pipe ${pipe.constructor.name} does not have a flow function.`);
                }
                console.log();
            }
            this.empty();
        } catch (err) {
            this.drain(err);
        }
    }

    empty() {
        console.log(chalk.green.bold(`Pipeline Complete! Flowing Strong!`));
        console.log();
    }

    drain(err) {
        console.error(chalk.red(`Pipeline flow clogged: ${err.message}`));
        console.error(Pipeline.pe.render(err));
        this.closeValve();
    }

    closeValve() {
        console.log(chalk.red(`Closing the pipeline...`));
        process.exit(1);
    }
}

export default Pipeline;
