// pipes/build/BuildSummary.js

import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class BuildSummary extends Pipe {
    constructor(dirCount, includedFileCount) {
        super('log', () => {
            console.log();
            console.log(chalk.blue(`Total dirs created: ${dirCount}`));
            console.log(chalk.blue(`Total files processed: ${includedFileCount}`));
            console.log();
        });
    }
}

export default BuildSummary;
