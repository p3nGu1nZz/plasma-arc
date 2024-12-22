// scripts/pipes/build/LogIncludes.js

import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class LogIncludes extends Pipe {
    constructor(counters) {
        super('logIncludes', () => {
            console.log(chalk.blue(`Total included files: ${counters.fileCount}`));
        });
    }
}

export default LogIncludes;
