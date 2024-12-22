// scripts/pipes/build/CompileJS.js

import path from 'path';
import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';
import Compiler from '../../utility/Compiler.js';

class CompileJS extends Pipe {
    constructor(outDir, spaceDir, moduleName, includePatterns, excludePatterns) {
        super('compileJS', async () => {
            try {
                const options = this.getCompileOptions(includePatterns, excludePatterns);
                const destPath = path.join(spaceDir, moduleName);

                this.log(outDir, spaceDir, moduleName, destPath);
                await Compiler.compile(outDir, destPath, options);
            } catch (err) {
                this.handleLeak(err);
            }
        });
    }

    log(outDir, spaceDir, moduleName, destPath) {
        console.log(chalk.green.bold(`Compiling files from directory: ${outDir}`));
        console.log(chalk.green.bold(`Space directory: ${spaceDir}`));
        console.log(chalk.green.bold(`Module name: ${moduleName}`));
        console.log(chalk.blue(`Destination path: ${destPath}`));
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
