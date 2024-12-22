// scripts/pipes/build/EmbedShaders.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

class EmbedShaders extends Pipe {
    constructor(outDir, spaceDir, moduleName) {
        super('embedShaders', () => {
            const shadersFile = path.join(outDir, process.env.SHADERS_FILE);
            const destFile = path.join(spaceDir, moduleName);

            if (Files.exists(shadersFile)) {
                try {
                    this.embedShaders(shadersFile, destFile);
                } catch (err) {
                    this.handleLeak(err);
                }
            } else {
                throw new Error(`Shaders file not found: ${Files.shorten(shadersFile)}`);
            }
        });
    }

    embedShaders(shadersFile, destFile) {
        const shaderCode = Files.read(shadersFile);
        const existingContent = Files.read(destFile);
        const finalContent = shaderCode + existingContent;
        Files.write(destFile, finalContent);
        console.log(chalk.magenta(`Embedded shaders into: ${Files.shorten(destFile)}`));
    }
}

export default EmbedShaders;
