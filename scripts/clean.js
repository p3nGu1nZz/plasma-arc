/**
 * @file scripts/clean.js
 * @description Cleans build and space directories by deleting files and directories.
 * @version 1.0.0
 * @license MIT
 * author: K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * 
 * Imports:
 * - path: Node.js path module for handling file paths.
 * - fileURLToPath: Utility for converting file URL to path.
 * - dotenv: For environment variable management.
 * - chalk: For color-coded logging.
 * - pretty-error: For improved error stack traces.
 * - Pipeline, Pipe: Custom utility classes for managing pipeline tasks.
 * - Files: Custom utility class for file and directory operations.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { Pipeline, Pipe } from './utility/pipeline.js';
import { Files } from './utility/files.js';

// Initialize PrettyError
const pe = new PrettyError();

// Load environment variables from .env file
dotenv.config();

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const SPACE_DIR = path.join(BUILD_DIR, 'space');
const OUT_DIR = path.join(BUILD_DIR, 'out');
const DIRS = [OUT_DIR, SPACE_DIR];

let dirCount = 0;
let fileCount = 0;

const pipeline = new Pipeline();

pipeline.add(new Pipe('clean', () => {
    DIRS.forEach((dir) => {
        try {
            if (Files.exists(dir)) {
                Files.read(dir).forEach((file) => {
                    const curPath = path.join(dir, file);
                    if (Files.isDir(curPath)) {
                        Files.read(curPath).forEach((subfile) => {
                            const subPath = path.join(curPath, subfile);
                            if (Files.isDir(subPath)) {
                                Files.remove(subPath);
                                dirCount++;
                            } else {
                                Files.unlink(subPath);
                                fileCount++;
                            }
                        });
                        Files.remove(curPath);
                        dirCount++;
                    } else {
                        Files.unlink(curPath);
                        fileCount++;
                    }
                });
            }
        } catch (err) {
            console.error(chalk.red(`Error cleaning dir: ${err}`));
            console.error(pe.render(err));
            process.exit(1); // Gracefully exit on error
        }
    });
}));

pipeline.add(new Pipe('delete', () => {
    if (Files.exists(BUILD_DIR)) {
        try {
            Files.remove(BUILD_DIR);
            dirCount++;
        } catch (err) {
            console.error(chalk.red(`Error deleting build dir: ${err}`));
            console.error(pe.render(err));
            process.exit(1); // Gracefully exit on error
        }
    }
}));

pipeline.add(new Pipe('log', () => {
    console.log();
    console.log(chalk.blue(`Total dirs deleted: ${dirCount}`));
    console.log(chalk.blue(`Total files deleted: ${fileCount}`));
    console.log();
}));

pipeline.run();
