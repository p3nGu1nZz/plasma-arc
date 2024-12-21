// scripts/pipes/build/CompileWGSL.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import path from 'path';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import dotenv from 'dotenv';
import Processor from '../../utility/Processor.js'; 
import RemoveSingleLineComments from '../../processors/RemoveSingleLineComments.js';
import RemoveMultiLineComments from '../../processors/RemoveMultiLineComments.js';

dotenv.config();

const pe = new PrettyError();

class CompileWGSL extends Pipe {
    constructor(srcDirs, outDir) {
        super('compileWGSL', () => {
            const shadersSrcDir = srcDirs.find(dir => Files.exists(path.join(dir, 'shaders')));
            const shadersDestFile = path.join(outDir, process.env.SHADERS_FILE);

            if (!shadersSrcDir) {
                throw new Error('No shaders directory found in source directories');
            }

            const shadersSrcPath = path.join(shadersSrcDir, 'shaders');

            if (Files.exists(shadersSrcPath)) {
                try {
                    const shaderFiles = Files.read(shadersSrcPath);
                    if (shaderFiles.length === 0) {
                        throw new Error(`No shaders found in: ${Files.shorten(shadersSrcPath)}`);
                    }

                    let shaderCode = 'const g_SHADERS = {\n';

                    const processor = new Processor();
                    processor.addProcessor(new RemoveSingleLineComments());
                    processor.addProcessor(new RemoveMultiLineComments());

                    shaderFiles.forEach((shader) => {
                        const shaderPath = path.join(shadersSrcPath, shader);
                        let content = Files.read(shaderPath);

                        content = processor.process(content);

                        shaderCode += `  "${shader}": \`\`\`wgsl\n${content}\n\`\`\`,\n`;
                        console.log(chalk.cyan(`Processed shader: ${Files.shorten(shaderPath)}`));
                    });

                    shaderCode += '};\n\n';

                    Files.write(shadersDestFile, shaderCode);
                    console.log(chalk.magenta(`Processed shaders written to: ${Files.shorten(shadersDestFile)}`));
                } catch (err) {
                    console.error(chalk.red(`Error processing shaders: ${err}`));
                    console.error(pe.render(err));
                    throw err;
                }
            } else {
                throw new Error(`Shaders source not found: ${Files.shorten(shadersSrcPath)}`);
            }
        });
    }
}

export default CompileWGSL;
