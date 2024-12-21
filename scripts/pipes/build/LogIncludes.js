// scripts/pipes/build/LogIncludes.js

import Pipe from '../../utility/Pipe.js';
import chalk from 'chalk';

class LogIncludes extends Pipe {
    constructor(includedFileCount) {
        super('logIncludes', () => {
            console.log(chalk.blue(`Total included files: ${includedFileCount}`));
        });
    }
}

export default LogIncludes;
