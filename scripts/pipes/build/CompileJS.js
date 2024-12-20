// scripts/pipes/build/CompileJS.js

import { Pipe } from '../../utility/Pipe.js';
import Compiler from '../../utility/Compiler.js';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import path from 'path';

const pe = new PrettyError();

class CompileJS extends Pipe {
    constructor(outDir, spaceDir, moduleName, includePatterns, excludePatterns) {
        super('compileJS', () => {
            try {
                console.log(`Compiling files from directory: ${outDir}`);
                const options = { include: includePatterns, exclude: excludePatterns, sourceMaps: true, removeComments: true };
                Compiler.compile(outDir, path.join(spaceDir, moduleName), options);
            } catch (err) {
                console.error(chalk.red(`Error during compile: ${err}`));
                console.error(pe.render(err));
                throw err;
            }
        });
    }
}

export { CompileJS };
