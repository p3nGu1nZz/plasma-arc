// scripts/pipes/clean/CleanSummary.js

import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class CleanSummary extends Pipe {
    constructor(counters) {
        super('cleanSummary', () => {
            const startTime = global.CONFIG.START_TIME;
            const endTime = performance.now();
            const cleanDuration = (endTime - startTime) / 1000;

            console.log(chalk.blue.bold(`Total dirs cleaned: ${counters.dirCount}`));
            console.log(chalk.blue.bold(`Total files deleted: ${counters.fileCount}`));
            console.log(chalk.blue.bold(`Clean duration: ${cleanDuration.toFixed(2)} seconds`));
        });
    }
}

export default CleanSummary;
