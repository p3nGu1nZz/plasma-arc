// scripts/pipes/build/CompileJS.js

import path from 'path';
import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';
import Compiler from '../../utility/Compiler.js';

class CompileJS extends Pipe {
    constructor(outDir, spaceDir, moduleName, includePatterns, excludePatterns) {
        super('compileJS', async () => {
            try {
                this.logStart(outDir);
                const options = this.getCompileOptions(includePatterns, excludePatterns);
                const destPath = path.join(spaceDir, moduleName);
                await Compiler.compile(outDir, destPath, options);
            } catch (err) {
                this.handleLeak(err);
            }
        });
    }

    logStart(outDir) {
        console.log(chalk.green.bold(`Compiling files from directory: ${outDir}`));
    }

    getCompileOptions(includePatterns, excludePatterns) {
        return {
            include: includePatterns,
            exclude: excludePatterns,
            sourceMaps: true,
            removeComments: true,
            removeExtraLines: true
        };
    }
}

export default CompileJS;
