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
 * - glob: For pattern matching files.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import PrettyError from 'pretty-error';
import { sync as globSync } from 'glob';
import { Files } from './files.js';

// Initialize PrettyError
const pe = new PrettyError();

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INCLUDE = process.env.INCLUDE_PATTERNS.split(',');
const EXCLUDE = process.env.EXCLUDE_PATTERNS.split(',');

class Compiler {
    static async compile(src, dest, options = {}) {
        let outputLines = [];
        let count = 0;

        try {
            const files = globSync(`${src}/**/*`, { ignore: EXCLUDE });
            files.forEach((filePath) => {
                if (Files.include(filePath, INCLUDE) && !Files.exclude(filePath, EXCLUDE)) {
                    const data = fs.readFileSync(filePath, 'utf-8');
                    outputLines.push(data);
                    count++;
                    console.log(chalk.magenta(`Add: ${Files.shorten(filePath)}`));
                }
            });

            if (count === 0) {
                const msg = 'No JS files found to compile.';
                console.error(chalk.red(`Error: Compilation failed because ${msg} at ${__dirname}\n`));
                process.exit(1);
            }

            let finalCode = outputLines.join('\n');

            // Generate source maps if the option is set
            if (options.sourceMaps) {
                const sourceMap = await Files.generateSourceMap(finalCode, src);
                finalCode += `\n//# sourceMappingURL=${path.basename(dest)}.map`;
                const sourceMapPath = `${dest}.map`;
                fs.writeFileSync(sourceMapPath, sourceMap);
                console.log(chalk.green(`Source map generated at: ${Files.shorten(sourceMapPath)}`));
            }

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
