// scripts/pipes/build/CreateSpace.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import chalk from 'chalk';

class CreateSpace extends Pipe {
    constructor(spaceDir, counters) {
        super('createSpace', () => {
            try {
                Files.create(spaceDir);
                counters.dirCount++;
                console.log(chalk.cyan(`Create: ${Files.shorten(spaceDir)}`));
            } catch (err) {
                this.handleLeak(err);
            }
        });
    }
}

export default CreateSpace;
