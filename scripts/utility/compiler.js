/**
 * @file scripts/utility/compiler.js
 * @description Manages the compilation process for JavaScript files.
 * @version 1.0.0
 * @license MIT
 * @author: K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * 
 * Imports:
 * - path: Node.js path module for handling file paths.
 * - dotenv: For environment variable management.
 * - chalk: For color-coded logging.
 * - fs: Node.js file system module for file operations.
 * - pretty-error: For improved error stack traces.
 * - { Files } from './files.js': For file and directory operations.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import PrettyError from 'pretty-error';
import { Files } from './files.js';

// Initialize PrettyError
const pe = new PrettyError();

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_DIRS = process.env.SOURCE_DIRS.split(',').map(dir => path.join(__dirname, `../${dir}`));
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const SPACE_DIR = path.join(BUILD_DIR, 'space');
const MODULE = process.env.MODULE_NAME;
const INCLUDE = process.env.INCLUDE_PATTERNS.split(',');
const EXCLUDE = process.env.EXCLUDE_PATTERNS.split(',');

class Compiler {
    static compile() {
        const srcJs = SOURCE_DIRS.filter(dir => dir.includes('src') && !dir.includes('public'));
        const dest = path.join(SPACE_DIR, MODULE);

        let inputLines = [];
        let outputLines = [];
        let count = 0;

        try {
            srcJs.forEach((dir) => {
                const files = fs.readdirSync(dir);
                files.forEach((file) => {
                    const filePath = path.join(dir, file);
                    const stats = fs.statSync(filePath);

                    if (stats.isDirectory()) {
                        const innerFiles = fs.readdirSync(filePath);
                        innerFiles.forEach(innerFile => {
                            const innerFilePath = path.join(filePath, innerFile);
                            const data = fs.readFileSync(innerFilePath, 'utf-8');
                            inputLines.push({ filePath: innerFilePath, data });
                            outputLines.push({ filePath: innerFilePath, data });
                        });
                    } else {
                        if (Files.exclude(filePath, EXCLUDE) || !Files.include(filePath, INCLUDE)) {
                            return;
                        }

                        if (file.endsWith('.js')) {
                            const data = fs.readFileSync(filePath, 'utf-8');
                            inputLines.push({ filePath, data });
                            outputLines.push({ filePath, data });
                            count++;
                            console.log(chalk.magenta(`Add: ${Files.shorten(filePath)}`));
                        }
                    }
                });
            });

            if (count === 0) {
                const msg = 'No JS files found to compile.';
                console.error(chalk.red(`Error: Compilation failed because ${msg} at ${__dirname}\n`));
                process.exit(1);
            }

            // Process outputLines here if needed
            
            const finalCode = outputLines.map(line => line.data).join('\n');

            // Ensure destination directory exists
            const destDir = path.dirname(dest);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            console.log('Writing to:', dest);
            fs.writeFileSync(dest, finalCode);

            console.log(chalk.magenta(`Compiled ${count} JS files into: ${Files.shorten(dest)}`));
        } catch (err) {
            console.error(chalk.red(`Error: Compilation failed`));
            console.error(pe.render(err));
            process.exit(1);
        }
    }
}

export default Compiler;
