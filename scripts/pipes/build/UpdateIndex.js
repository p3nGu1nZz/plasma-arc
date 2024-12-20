// scripts/pipes/build/UpdateIndex.js

import { Pipe } from '../../utility/Pipe.js';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { Files } from '../../utility/Files.js';

const pe = new PrettyError();

class UpdateIndex extends Pipe {
    constructor(spaceDir, moduleName) {
        super('updateIndex', () => {
            const indexPath = path.join(spaceDir, 'index.html');
            if (fs.existsSync(indexPath)) {
                try {
                    let content = fs.readFileSync(indexPath, 'utf-8');
                    content = content.replace(/<script type="module" src=".*"><\/script>/, `<script type="module" src="${moduleName}"></script>`);
                    fs.writeFileSync(indexPath, content);
                    console.log(chalk.cyan(`Update: ${Files.shorten(indexPath)}`));
                } catch (err) {
                    console.error(chalk.red(`Error updating index: ${err}`));
                    console.error(pe.render(err));
                    throw err;
                }
            }
        });
    }
}

export { UpdateIndex };
