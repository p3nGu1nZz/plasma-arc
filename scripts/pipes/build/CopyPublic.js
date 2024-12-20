// scripts/pipes/build/CopyPublic.js

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/Files.js';

const pe = new PrettyError();

class CopyPublic extends Pipe {
    constructor(publicDirs, spaceDir, publicFileTypes) {
        super('copyPublic', () => {
            try {
                console.log(chalk.blue(`Public directories: ${publicDirs.join(', ')}`));

                publicDirs.forEach((publicDir) => {
                    console.log(chalk.blue(`Processing public directory: ${publicDir}`));
                    const copyRecursiveSync = (src, dest) => {
                        const exists = fs.existsSync(src);
                        const stats = exists && fs.statSync(src);
                        const isDirectory = exists && stats.isDirectory();
                        if (isDirectory) {
                            if (!fs.existsSync(dest)) {
                                fs.mkdirSync(dest);
                                console.log(chalk.green(`Created directory: ${dest}`));
                            }
                            fs.readdirSync(src).forEach((childItemName) => {
                                copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
                            });
                        } else {
                            const isValidFile = publicFileTypes.some(type => src.endsWith(type.trim().substring(1)));
                            if (isValidFile) {
                                fs.copyFileSync(src, dest);
                                console.log(chalk.green(`Copied file: ${Files.shorten(src)} to ${Files.shorten(dest)}`));
                            } else {
                                console.log(chalk.yellow(`Skipped file: ${Files.shorten(src)}`));
                            }
                        }
                    };

                    copyRecursiveSync(publicDir, spaceDir);
                    console.log(chalk.cyan(`Finished copying: ${Files.shorten(publicDir)}`));
                });
            } catch (err) {
                console.error(chalk.red(`Error copying public: ${err}`));
                console.error(pe.render(err));
                throw err;
            }
        });
    }
}

export { CopyPublic };
