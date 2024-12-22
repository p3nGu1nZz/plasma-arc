// scripts/pipes/build/CopyPublic.js

import path from 'path';
import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';

class CopyPublic extends Pipe {
    constructor(publicDirs, spaceDir, publicFileTypes, counters) {
        super('copyPublic', () => {
            try {
                this.copyPublicFiles(publicDirs, spaceDir, publicFileTypes, counters);
            } catch (err) {
                this.handleLeak(err);
            }
        });
    }

    copyPublicFiles(publicDirs, spaceDir, publicFileTypes, counters) {
        console.log(chalk.cyan(`Public directories: ${publicDirs.join(', ')}`));

        publicDirs.forEach((publicDir) => {
            console.log(chalk.cyan(`Processing public directory: ${publicDir}`));
            this.copyRecursiveSync(publicDir, spaceDir, publicFileTypes, counters);
            console.log(chalk.cyan(`Finished copying: ${Files.shorten(publicDir)}`));
        });
    }

    copyRecursiveSync(src, dest, publicFileTypes, counters) {
        if (Files.isDir(src)) {
            Files.read(src).forEach((childItemName) => {
                this.copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), publicFileTypes, counters);
            });
            counters.dirCount++;
        } else {
            const isValidFile = publicFileTypes.some(type => src.endsWith(type.trim().substring(1)));
            if (isValidFile) {
                Files.write(dest, Files.read(src));
                counters.fileCount++;
            } else {
                console.log(chalk.yellow(`Skipped file: ${Files.shorten(src)}`));
            }
        }
    }
}

export default CopyPublic;
