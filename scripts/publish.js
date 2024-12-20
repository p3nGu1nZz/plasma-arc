/**
 * @file scripts/publish.js
 * @description Publishes build artifacts to Hugging Face using the CLI.
 * @version 1.0.0
 * @license MIT
 * @author: K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * 
 * Imports:
 * - path: Node.js path module for handling file paths.
 * - { exec } from 'child_process': For executing shell commands.
 * - dotenv: For environment variable management.
 * - chalk: For color-coded logging.
 * - pretty-error: For improved error stack traces.
 * - { Pipeline, Pipe } from './utility/pipeline.js': Custom utility classes for managing pipeline tasks.
 */

import path from 'path';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { Pipeline, Pipe } from './utility/pipeline.js';

// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Initialize PrettyError
const pe = new PrettyError();

// Constants
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const TOKEN = process.env.HF_TOKEN;
const PROJECT = process.env.HF_PROJECT;
const ORG = process.env.HF_ORG;

const pipeline = new Pipeline();

pipeline.add(new Pipe('publish', () => {
    const command = `huggingface-cli upload ${BUILD_DIR} -t ${TOKEN} -p ${ORG}/${PROJECT}`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(chalk.red(`Error: ${err.message}`));
            console.error(pe.render(err));
            process.exit(1);  // Gracefully exit on error
        }
        if (stderr) {
            console.error(chalk.red(`Stderr: ${stderr}`));
            console.error(pe.render(new Error(stderr)));
            process.exit(1);  // Gracefully exit on stderr
        }
        console.log(chalk.green(`Stdout: ${stdout}`));
    });
}));

pipeline.add(new Pipe('log', () => {
    console.log(chalk.blue(`Publishing done for project: ${PROJECT}`));
    console.log();
}));

pipeline.run();
