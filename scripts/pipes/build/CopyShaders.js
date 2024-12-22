// scripts/pipes/build/CopyShaders.js

import path from 'path';
import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import chalk from 'chalk';

class CopyShaders extends Pipe {
    constructor(srcDir, outDir, counters) {
        super('copyShaders', () => {
            try {
                const destDir = path.join(outDir, 'shaders');
                if (Files.exists(srcDir)) {
                    this.copyShaders(srcDir, destDir, counters);
                } else {
                    throw new Error(`Shaders not found: ${Files.shorten(srcDir)}`);
                }
            } catch (err) {
                this.handleLeak(err);
            }
        });
    }

    copyShaders(srcDir, destDir, counters) {
        const shaderFiles = Files.read(srcDir);
        if (shaderFiles.length === 0) {
            throw new Error(`No shaders found in: ${Files.shorten(srcDir)}`);
        }
        let shaderCount = 0;

        shaderFiles.forEach(shader => {
            const srcPath = path.join(srcDir, shader);
            const destPath = path.join(destDir, shader);
            try {
                const data = Files.read(srcPath);
                Files.write(destPath, data);
                shaderCount++;
                counters.fileCount++;
                console.log(chalk.green(`Successfully copied shader file: ${Files.shorten(destPath)}`));
            } catch (err) {
                this.handleLeak(err);
            }
        });

        console.log(chalk.cyan(`Total shaders copied: ${shaderCount}`));
    }
}

export default CopyShaders;
