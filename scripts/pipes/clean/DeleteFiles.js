// scripts/pipes/clean/DeleteFiles.js

import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/Files.js';
import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class DeleteFiles extends Pipe {
    constructor(buildDir) {
        super('deleteFiles', () => {
            if (Files.exists(buildDir)) {
                try {
                    Files.remove(buildDir);
                } catch (err) {
                    console.error(chalk.red(`Error deleting build dir: ${err}`));
                    console.error(pe.render(err));
                    process.exit(1);
                }
            }
        });
    }
}

export { DeleteFiles };
