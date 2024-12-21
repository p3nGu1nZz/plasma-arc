// scripts/pipes/build/EmbedShaders.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import path from 'path';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import dotenv from 'dotenv';

dotenv.config();
    
const pe = new PrettyError();

class EmbedShaders extends Pipe {
    constructor(outDir, spaceDir, moduleName) {
        super('embedShaders', () => {
            const shadersFile = path.join(outDir, process.env.SHADERS_FILE);
            const destFile = path.join(spaceDir, moduleName);

            if (Files.exists(shadersFile)) {
                try {
                    const shaderCode = Files.read(shadersFile);
                    const existingContent = Files.read(destFile);
                    const finalContent = shaderCode + existingContent;

                    Files.write(destFile, finalContent);
                    console.log(chalk.magenta(`Embedded shaders into: ${Files.shorten(destFile)}`));
                } catch (err) {
                    console.error(chalk.red(`Error embedding shaders: ${err}`));
                    console.error(pe.render(err));
                    throw err;
                }
            } else {
                throw new Error(`Shaders file not found: ${Files.shorten(shadersFile)}`);
            }
        });
    }
}

export default EmbedShaders;
