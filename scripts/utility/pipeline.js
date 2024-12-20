// scripts/utility/pipeline.js

import chalk from 'chalk';
import dotenv from 'dotenv';
import PrettyError from 'pretty-error';

// Initialize PrettyError
const pe = new PrettyError();

// Load environment variables from .env file
dotenv.config();

class Pipeline {
    constructor() {
        this.pipes = [];
    }

    add(pipe) {
        this.pipes.push(pipe);
    }

    run() {
        console.log(chalk.green(`Pipeline Start`));
        try {
            this.pipes.forEach((pipe) => pipe.run());
            console.log(chalk.green(`Pipeline Complete!`));
            console.log();
        } catch (err) {
            console.error(chalk.red(`Pipeline execution failed: ${err.message}`));
            console.error(pe.render(err));
            process.exit(1); // Gracefully exit on error
        }
    }
}

export { Pipeline };
