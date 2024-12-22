// scripts/pipes/build/CreateOut.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import chalk from 'chalk';

class CreateOut extends Pipe {
    constructor(outDir, counters) {
        super('createOut', async () => {
            try {
                Files.create(outDir);
                counters.dirCount++;
                console.log(chalk.cyan(`Create: ${Files.shorten(outDir)}`));
            } catch (err) {
                this.handleLeak(err);
            }
        });
    }
}

export default CreateOut;
