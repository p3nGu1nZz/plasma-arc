// scripts/pipes/build/CreateOut.js

import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/Files.js';
import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class CreateOut extends Pipe {
    constructor(outDir) {
        super('createOut', async () => {
            try {
                Files.create(outDir);
                console.log(chalk.cyan(`Create: ${Files.shorten(outDir)}`));
            } catch (err) {
                console.error(chalk.red(`Error creating out directory: ${err}`));
                console.error(pe.render(err));
                throw err;
            }
        });
    }
}

export { CreateOut };
