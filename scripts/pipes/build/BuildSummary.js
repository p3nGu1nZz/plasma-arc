// scripts/pipes/build/BuildSummary.js

import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class BuildSummary extends Pipe {
    constructor(counters) {
        super('buildSummary', () => {
            console.log();
            console.log(chalk.blue(`Total dirs created: ${counters.dirCount}`));
            console.log(chalk.blue(`Total files processed: ${counters.fileCount}`));
            console.log();
        });
    }
}

export default BuildSummary;
