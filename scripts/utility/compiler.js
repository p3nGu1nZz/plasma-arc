// scripts/utility/Compiler.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { sync as globSync } from 'glob';
import Files from './Files.js';
import Processor from './Processor.js';
import RemoveSingleLineComments from '../processors/RemoveSingleLineComments.js';
import RemoveMultiLineComments from '../processors/RemoveMultiLineComments.js';
import RemoveLocalImports from '../processors/RemoveLocalImports.js';

dotenv.config();

class Compiler {
    static pe = new PrettyError();
    static __filename = fileURLToPath(import.meta.url);
    static __dirname = path.dirname(Compiler.__filename);
    static INCLUDE = process.env.INCLUDE_PATTERNS.split(',');
    static EXCLUDE = process.env.EXCLUDE_PATTERNS.split(',');

    static async compile(src, dest, options = {}) {
        let outputLines = [];
        let count = 0;

        const processor = new Processor();

        if (options.removeComments) {
            processor.addProcessor(new RemoveSingleLineComments());
            processor.addProcessor(new RemoveMultiLineComments());
        }
        processor.addProcessor(new RemoveLocalImports());

        try {
            const files = globSync(`${src}/**/*`, { ignore: Compiler.EXCLUDE });
            files.forEach((filePath) => {
                if (Files.include(filePath, Compiler.INCLUDE) && !Files.exclude(filePath, Compiler.EXCLUDE)) {
                    let data = Files.read(filePath);

                    data = processor.process(data);

                    outputLines.push(data);
                    count++;
                    console.log(chalk.green(`Include: ${Files.shorten(filePath)}`));
                }
            });

            if (count === 0) {
                console.error(chalk.red(`Error: Compilation failed because no JS files found to compile at ${Compiler.__dirname}\n`));
                process.exit(1);
            }

            let finalCode = outputLines.join('\n');
            Files.write(dest, finalCode);
            console.log(chalk.magenta(`Compiled ${count} JS files into: ${Files.shorten(dest)}`));
        } catch (err) {
            console.error(chalk.red(`Error: Compilation failed`));
            console.error(Compiler.pe.render(err));
            process.exit(1);
        }
    }
}

export default Compiler;
