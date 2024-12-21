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
            const shadersDestDir = path.join(outDir, 'shaders');
            const destFile = path.join(spaceDir, moduleName);

            if (Files.exists(shadersDestDir)) {
                try {
                    const shaderFiles = Files.read(shadersDestDir);
                    if (shaderFiles.length === 0) {
                        throw new Error(`No shaders found in: ${Files.shorten(shadersDestDir)}`);
                    }

                    let shaderCode = 'const shaders = {\n';

                    shaderFiles.forEach((shader) => {
                        const shaderPath = path.join(shadersDestDir, shader);
                        const code = Files.read(shaderPath);
                        shaderCode += `  "${shader}": \`\n${code}\n\`,\n`;
                        console.log(chalk.cyan(`Embed shader: ${Files.shorten(shaderPath)}`));
                    });

                    shaderCode += '};\n\n';

                    const existingContent = Files.read(destFile);
                    const finalContent = shaderCode + existingContent;
                    Files.write(destFile, finalContent);
                    console.log(chalk.magenta(`Embedded ${shaderFiles.length} shaders into: ${Files.shorten(destFile)}`));
                } catch (err) {
                    console.error(chalk.red(`Error embedding shader: ${err}`));
                    console.error(pe.render(err));
                    throw err;
                }
            } else {
                throw new Error(`Shaders not found: ${Files.shorten(shadersDestDir)}`);
            }
        });
    }
}

export default EmbedShaders;
