// pipes/publish/HuggingFace.js

import { exec } from 'child_process';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { Pipe } from '../Pipe.js';

const pe = new PrettyError();

class HuggingFace extends Pipe {
    constructor(buildDir, token, project, org) {
        super('publish', () => {
            const command = `huggingface-cli upload ${buildDir} -t ${token} -p ${org}/${project}`;

            exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.error(chalk.red(`Error: ${err.message}`));
                    console.error(pe.render(err));
                    process.exit(1);  // Gracefully exit on error
                }
                if (stderr) {
                    console.error(chalk.red(`Stderr: ${stderr}`));
                    console.error(pe.render(new Error(stderr)));
                    process.exit(1);  // Gracefully exit on stderr
                }
                console.log(chalk.green(`Stdout: ${stdout}`));
            });
        });
    }
}

export default HuggingFace;
