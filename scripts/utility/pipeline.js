/**
 * @file scripts/utility/pipeline.js
 * @description Utility class for managing a sequence of tasks (pipes) in a pipeline.
 * @version 1.0.0
 * @license MIT
 * @author: K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * 
 * Imports:
 * - chalk: For color-coded logging.
 * - dotenv: For environment variable management.
 * - pretty-error: For improved error stack traces.
 */

import chalk from 'chalk';
import dotenv from 'dotenv';
import PrettyError from 'pretty-error';

// Initialize PrettyError
const pe = new PrettyError();

// Load environment variables from .env file
dotenv.config();

class Pipe {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }

    run() {
        console.log(chalk.green(`Run: ${this.name}`));
        try {
            this.action();
        } catch (err) {
            console.error(chalk.red(`Error in ${this.name}: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }
}

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
            console.log(chalk.green(`Pipeline Complete`));
        } catch (err) {
            console.error(chalk.red(`Pipeline execution failed: ${err.message}`));
            console.error(pe.render(err));
            process.exit(1); // Gracefully exit on error
        }
    }
}

export { Pipeline, Pipe };
