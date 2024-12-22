// scripts/pipes/build/CompileWGSL.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';
import Processor from '../../utility/Processor.js';
import RemoveSingleLineComments from '../../processors/RemoveSingleLineComments.js';
import RemoveMultiLineComments from '../../processors/RemoveMultiLineComments.js';
import RemoveDuplicateNewLines from '../../processors/RemoveDuplicateNewLines.js';

dotenv.config();

class CompileWGSL extends Pipe {
    constructor(srcDirs, outDir, counters) {
        super('compileWGSL', () => {
            const shadersSrcDir = srcDirs.find(dir => Files.exists(path.join(dir, 'shaders')));
            const shadersDestFile = path.join(outDir, process.env.SHADERS_FILE);

            if (!shadersSrcDir) {
                throw new Error('No shaders directory found in source directories');
            }

            const shadersSrcPath = path.join(shadersSrcDir, 'shaders');

            if (Files.exists(shadersSrcPath)) {
                try {
                    this.processShaders(shadersSrcPath, shadersDestFile, counters);
                } catch (err) {
                    this.handleLeak(err);
                }
            } else {
                throw new Error(`Shaders source not found: ${Files.shorten(shadersSrcPath)}`);
            }
        });
    }

    processShaders(shadersSrcPath, shadersDestFile, counters) {
        const shaderFiles = Files.read(shadersSrcPath);
        if (shaderFiles.length === 0) {
            throw new Error(`No shaders found in: ${Files.shorten(shadersSrcPath)}`);
        }

        const processor = new Processor();
        processor.addProcessor(new RemoveSingleLineComments());
        processor.addProcessor(new RemoveMultiLineComments());
        processor.addProcessor(new RemoveDuplicateNewLines());

        const shaderCodeEntries = shaderFiles.map((shader, index) => {
            const shaderPath = path.join(shadersSrcPath, shader);
            let content = Files.read(shaderPath);

            content = processor.process(content);

            console.log(chalk.cyan(`Processed shader: ${Files.shorten(shaderPath)}`));
            counters.fileCount++;
            return `"${shader}": \`\n${content}\``;
        });

        const shaderCode = `global.SHADERS = {\n${shaderCodeEntries.join(',\n')}};\n\n`;
        Files.write(shadersDestFile, shaderCode);
        console.log(chalk.magenta(`Processed shaders written to: ${Files.shorten(shadersDestFile)}`));
    }
}

export default CompileWGSL;
