// scripts/pipes/build/CreateSpace.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import chalk from 'chalk';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

class CreateSpace extends Pipe {
    constructor(spaceDir) {
        super('createSpace', () => {
            try {
                Files.create(spaceDir);
                console.log(chalk.cyan(`Create: ${Files.shorten(spaceDir)}`));
            } catch (err) {
                console.error(chalk.red(`Error creating space directory: ${err}`));
                console.error(pe.render(err));
                throw err;
            }
        });
    }
}

export default CreateSpace;
