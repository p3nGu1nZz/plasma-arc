// scripts/pipes/build/CopySrc.js

import path from 'path';
import chalk from 'chalk';
import { sync as globSync } from 'glob';
import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';

class CopySrc extends Pipe {
    constructor(srcDirs, outDir, spaceDir, excludePatterns = [], counters) {
        super('copySrc', () => {
            try {
                this.srcDirs = srcDirs;
                this.outDir = outDir;
                this.spaceDir = spaceDir;
                this.excludePatterns = excludePatterns.concat([`${process.env.SHADERS_DIR}/**`]);
                this.counters = counters;
                this.copyFiles();
            } catch (err) {
                this.handleLeak(err);
            }
        });
    }

    copyFiles() {
        this.srcDirs.forEach((srcDir) => {
            const filesInDir = Files.read(srcDir);
            console.log(chalk.cyan(`Files in directory ${srcDir}: ${filesInDir.join(', ')}`));

            const pattern = `${srcDir.replace(/\\/g, "/")}/**/*`;
            console.log(chalk.cyan(`Using glob pattern: ${pattern}`));

            const files = globSync(pattern, { ignore: this.excludePatterns });
            console.log(chalk.cyan(`Files found with glob: ${files.length}`));

            if (!files.length) {
                console.warn(chalk.yellow(`No files found in ${srcDir}`));
            } else {
                console.log(chalk.green(`Copying files from ${srcDir}`));
            }

            files.forEach((filePath) => {
                const relativePath = path.relative(srcDir, filePath);
                const outPath = path.join(this.outDir, relativePath);
                const spacePath = path.join(this.spaceDir, relativePath);

                if (Files.isFile(filePath)) {
                    const content = Files.read(filePath);
                    Files.write(outPath, content);
                    if (filePath.endsWith('.css')) {
                        Files.write(spacePath, content);
                    }
                    this.counters.fileCount++;
                }
            });
        });
    }
}

export default CopySrc;
