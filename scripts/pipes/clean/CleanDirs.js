// scripts/pipes/clean/CleanDirs.js

import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/Files.js';
import path from 'path';
import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class CleanDirs extends Pipe {
    constructor(dirs, counters) {
        super('cleanDirs', () => {
            dirs.forEach((dir) => {
                try {
                    if (Files.exists(dir)) {
                        Files.read(dir).forEach((file) => {
                            const curPath = path.join(dir, file);
                            if (Files.isDir(curPath)) {
                                Files.read(curPath).forEach((subfile) => {
                                    const subPath = path.join(curPath, subfile);
                                    if (Files.isDir(subPath)) {
                                        Files.remove(subPath);
                                        counters.dirCount++;
                                    } else {
                                        Files.unlink(subPath);
                                        counters.fileCount++;
                                    }
                                });
                                Files.remove(curPath);
                                counters.dirCount++;
                            } else {
                                Files.unlink(curPath);
                                counters.fileCount++;
                            }
                        });
                    }
                } catch (err) {
                    console.error(chalk.red(`Error cleaning dir: ${err}`));
                    console.error(pe.render(err));
                    process.exit(1);
                }
            });
        });
    }
}

export { CleanDirs };
