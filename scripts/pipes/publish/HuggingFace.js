// pipes/publish/HuggingFace.js

import { exec } from 'child_process';
import chalk from 'chalk';
import Pipe from '../../utility/Pipe.js';

class HuggingFace extends Pipe {
    constructor(buildDir, token, project, org) {
        super('huggingFace', () => {
            const command = `huggingface-cli upload ${buildDir} -t ${token} -p ${org}/${project}`;

            exec(command, (err, stdout, stderr) => {
                if (err || stderr) {
                    this.handleExecError(err, stderr);
                }
                console.log(chalk.green(`Stdout: ${stdout}`));
            });
        });
    }

    handleExecError(err, stderr) {
        if (err) {
            console.error(chalk.red(`Error: ${err.message}`));
            console.error(Pipe.pe.render(err));
            process.exit(1);  // Gracefully exit on error
        }
        if (stderr) {
            console.error(chalk.red(`Stderr: ${stderr}`));
            console.error(Pipe.pe.render(new Error(stderr)));
            process.exit(1);  // Gracefully exit on stderr
        }
    }
}

export default HuggingFace;
