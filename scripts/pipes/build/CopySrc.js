// pipes/build/CopySrc.js

import path from 'path';
import chalk from 'chalk';
import { globSync } from 'glob';
import PrettyError from 'pretty-error';
import { Files } from '../../utility/Files.js';

const pe = new PrettyError();

class CopySrc {
    constructor(srcDirs, outDir, spaceDir, excludePatterns = []) {
        this.srcDirs = srcDirs;
        this.outDir = outDir;
        this.spaceDir = spaceDir;
        this.excludePatterns = excludePatterns.concat([`${process.env.SHADERS_DIR}/**`]);
    }

    execute() {
        try {
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
                    }
                });
            });
        } catch (err) {
            console.error(chalk.red(`Error copying src: ${err}`));
            console.error(pe.render(err));
            throw err;
        }
    }
}

export { CopySrc };