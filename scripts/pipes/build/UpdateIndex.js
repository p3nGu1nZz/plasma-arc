// scripts/pipes/build/UpdateIndex.js

import path from 'path';
import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';
import chalk from 'chalk';

class UpdateIndex extends Pipe {
    constructor(spaceDir, moduleName) {
        super('updateIndex', () => {
            const indexPath = path.join(spaceDir, 'index.html');
            if (Files.exists(indexPath)) {
                try {
                    let content = Files.read(indexPath);
                    content = content.replace(/<script type="module" src=".*"><\/script>/, `<script type="module" src="${moduleName}"></script>`);
                    Files.write(indexPath, content);
                    console.log(chalk.cyan(`Update: ${Files.shorten(indexPath)}`));
                } catch (err) {
                    this.handleLeak(err);
                }
            }
        });
    }
}

export default UpdateIndex;
