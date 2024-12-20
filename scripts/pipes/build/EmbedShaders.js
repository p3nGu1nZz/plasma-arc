// scripts/pipes/build/EmbedShaders.js

import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/Files.js';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class EmbedShaders extends Pipe {
    constructor(outDir, spaceDir, moduleName) {
        super('embedShaders', () => {
            const shadersDir = path.join(outDir, 'shaders');
            const destFile = path.join(spaceDir, moduleName);

            if (Files.exists(shadersDir)) {
                try {
                    const shaderFiles = Files.read(shadersDir);
                    let shaderCode = '';

                    shaderFiles.forEach((shader) => {
                        const shaderPath = path.join(shadersDir, shader);
                        const code = fs.readFileSync(shaderPath, 'utf-8');
                        shaderCode += `// ${shader}\n${code}\n\n`;
                    });

                    fs.appendFileSync(destFile, shaderCode);
                    console.log(chalk.cyan(`Embed: ${Files.shorten(destFile)}`));
                } catch (err) {
                    console.error(chalk.red(`Error embedding shader: ${err}`));
                    console.error(pe.render(err));
                    throw err;
                }
            } else {
                console.warn(chalk.yellow(`Shaders not found: ${Files.shorten(shadersDir)}`));
            }
        });
    }
}

export { EmbedShaders };
