// scripts/pipes/clean/CleanSummary.js

import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class CleanSummary extends Pipe {
    constructor(counters) {
        super('cleanSummary', () => {
            console.log();
            console.log(chalk.blue(`Total dirs cleaned: ${counters.dirCount}`));
            console.log(chalk.blue(`Total files deleted: ${counters.fileCount}`));
            console.log();
        });
    }
}

export default CleanSummary;
