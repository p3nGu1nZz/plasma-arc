// scripts/pipes/clean/CleanDirs.js

import path from 'path';
import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';

class CleanDirs extends Pipe {
    constructor(dirs, counters) {
        super('cleanDirs', () => {
            dirs.forEach((dir) => {
                try {
                    if (Files.exists(dir)) {
                        this.cleanDirectory(dir, counters);
                    }
                } catch (err) {
                    this.handleLeak(err);
                }
            });
        });
    }

    cleanDirectory(dir, counters) {
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
}

export default CleanDirs;
