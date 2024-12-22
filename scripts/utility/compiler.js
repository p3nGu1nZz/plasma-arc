// scripts/utility/Compiler.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { sync } from 'glob';
import Files from './Files.js';
import Processor from './Processor.js';
import RemoveSingleLineComments from '../processors/RemoveSingleLineComments.js';
import RemoveMultiLineComments from '../processors/RemoveMultiLineComments.js';
import RemoveLocalImports from '../processors/RemoveLocalImports.js';
import RemoveDuplicateNewLines from '../processors/RemoveDuplicateNewLines.js';

dotenv.config();

class Compiler {
    static pe = new PrettyError();
    static __filename = fileURLToPath(import.meta.url);
    static __dirname = path.dirname(Compiler.__filename);

    static async compile(src, dest, options = {}) {
        let input = '';
        let output = '';
        let count = 0;

        const processor = new Processor();

        if (options.removeComments) {
            processor.addProcessor(new RemoveSingleLineComments());
            processor.addProcessor(new RemoveMultiLineComments());
        }
        processor.addProcessor(new RemoveLocalImports());
        if (options.removeExtraLines) {
            processor.addProcessor(new RemoveDuplicateNewLines());
        }

        try {
            const files = sync(`${src}/**/*`, { ignore: Files.EXCLUDE_PATTERNS });
            files.forEach((filePath) => {
                if (Files.include(filePath) && !Files.exclude(filePath)) {
                    input += Files.read(filePath);
                    count++;
                    console.log(chalk.green(`Include: ${Files.shorten(filePath)}`));
                }
            });

            if (count === 0) {
                console.error(chalk.red(`Error: Compilation failed because no JS files found to compile at ${Compiler.__dirname}\n`));
                process.exit(1);
            }

            output = processor.process(input);
            Files.write(dest, output);
            console.log(chalk.magenta(`Compiled ${count} JS files into: ${Files.shorten(dest)}`));
        } catch (err) {
            console.error(chalk.red(`Error: Compilation failed`));
            console.error(Compiler.pe.render(err));
            process.exit(1);
        }
    }
}

export default Compiler;
