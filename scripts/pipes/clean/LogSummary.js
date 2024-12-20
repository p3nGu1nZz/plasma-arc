// scripts/pipes/clean/LogSummary.js

import { Pipe } from '../../utility/Pipe.js';
import chalk from 'chalk';

class LogSummary extends Pipe {
    constructor(dirCount, fileCount) {
        super('cleanLog', () => {
            console.log();
            console.log(chalk.blue(`Total dirs deleted: ${dirCount}`));
            console.log(chalk.blue(`Total files deleted: ${fileCount}`));
            console.log();
        });
    }
}

export { LogSummary };
