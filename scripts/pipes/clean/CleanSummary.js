// scripts/pipes/clean/CleanSummary.js

import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class CleanSummary extends Pipe {
    constructor(counters) {
        super('cleanSummary', () => {
            console.log(chalk.blue.bold(`Total dirs cleaned: ${counters.dirCount}`));
            console.log(chalk.blue.bold(`Total files deleted: ${counters.fileCount}`));
        });
    }
}

export default CleanSummary;
