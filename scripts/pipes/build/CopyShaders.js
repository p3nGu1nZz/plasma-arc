import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/Files.js';
import path from 'path';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import dotenv from 'dotenv';

dotenv.config();

const pe = new PrettyError();

class CopyShaders extends Pipe {
    constructor(srcDir, outDir) {
        super('copyShaders', () => {
            const destDir = path.join(outDir, 'shaders');

            if (Files.exists(srcDir)) {
                if (!Files.exists(destDir)) {
                    Files.create(destDir);
                }
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
                        console.log(chalk.green(`Successfully copied shader file: ${Files.shorten(destPath)}`));
                    } catch (err) {
                        console.error(chalk.red(`Error copying shader file: ${err.message}`));
                        console.error(pe.render(err));
                        throw err;
                    }
                });

                console.log(chalk.cyan(`Total shaders copied: ${shaderCount}`));
            } else {
                throw new Error(`Shaders not found: ${Files.shorten(srcDir)}`);
            }
        });
    }
}

export { CopyShaders };
