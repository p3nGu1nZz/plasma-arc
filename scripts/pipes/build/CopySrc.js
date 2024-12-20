// scripts/pipes/build/CopySrc.js

import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/files.js';
import path from 'path';
import fs from 'fs';
import { sync as globSync } from 'glob';
import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class CopySrc extends Pipe {
    constructor(sourceDirs, outDir, includePatterns, excludePatterns) {
        super('copySrc', () => {
            try {
                console.log(chalk.blue(`Source directories to process: ${sourceDirs.join(', ')}`));

                sourceDirs.forEach((srcDir) => {
                    console.log(chalk.blue(`Processing directory: ${srcDir}`));
                    
                    const filesInDir = fs.readdirSync(srcDir);
                    console.log(chalk.blue(`Files in directory ${srcDir}: ${filesInDir.join(', ')}`));

                    const pattern = `${srcDir.replace(/\\/g, "/")}/**/*`;
                    console.log(chalk.blue(`Using glob pattern: ${pattern}`));

                    const files = globSync(pattern, { ignore: excludePatterns });
                    console.log(chalk.blue(`Files found with glob: ${files.length}`));

                    if (!files.length) {
                        console.warn(chalk.yellow(`No files found in ${srcDir}`));
                    } else {
                        console.log(chalk.green(`Copying files from ${srcDir}`));
                    }

                    files.forEach((filePath) => {
                        const relativePath = path.relative(srcDir, filePath);
                        const destPath = path.join(outDir, relativePath);

                        if (fs.statSync(filePath).isFile()) {
                            Files.copy(filePath, destPath);
                        }
                    });
                });
            } catch (err) {
                console.error(chalk.red(`Error copying src: ${err}`));
                console.error(pe.render(err));
                throw err;
            }
        });
    }
}

export { CopySrc };
