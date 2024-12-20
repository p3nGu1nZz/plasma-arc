// scripts/utility/compiler.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import PrettyError from 'pretty-error';
import { sync as globSync } from 'glob';
import { Files } from './files.js';

const pe = new PrettyError();

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
                    let data = fs.readFileSync(filePath, 'utf-8');

                    if (options.removeComments) {
                        data = data.replace(/\/\/.*$/gm, '');
                    }

                    outputLines.push(data);
                    count++;
                    console.log(chalk.green(`Include: ${Files.shorten(filePath)}`));
                }
            });

            if (count === 0) {
                console.error(chalk.red(`Error: Compilation failed because no JS files found to compile at ${__dirname}\n`));
                process.exit(1);
            }

            let finalCode = outputLines.join('\n');

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
