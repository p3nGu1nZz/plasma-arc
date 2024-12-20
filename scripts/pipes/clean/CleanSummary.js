// pipes/clean/CleanSummary.js

import chalk from 'chalk';
import { Pipe } from '../../utility/Pipe.js';

class CleanSummary extends Pipe {
    constructor(dirCount, fileCount) {
        super('log', () => {
            console.log();
            console.log(chalk.blue(`Total dirs cleaned: ${dirCount}`));
            console.log(chalk.blue(`Total files deleted: ${fileCount}`));
            console.log();
        });
    }
}

export { CleanSummary };
