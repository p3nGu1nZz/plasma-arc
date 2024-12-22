// scripts/pipes/build/BuildSummary.js

import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class BuildSummary extends Pipe {
    constructor(counters) {
        super('buildSummary', () => {
            const startTime = global.CONFIG.START_TIME;
            const endTime = performance.now();
            const buildDuration = (endTime - startTime) / 1000;

            console.log(chalk.blue.bold(`Total dirs created: ${counters.dirCount}`));
            console.log(chalk.blue.bold(`Total files processed: ${counters.fileCount}`));
            console.log(chalk.blue.bold(`Build duration: ${buildDuration.toFixed(2)} seconds`));
        });
    }
}

export default BuildSummary;
