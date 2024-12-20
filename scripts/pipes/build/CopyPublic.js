// scripts/pipes/build/CopyPublic.js

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { Pipe } from '../../utility/Pipe.js';
import { Files } from '../../utility/Files.js';

const pe = new PrettyError();

class CopyPublic extends Pipe {
    constructor(sourceDirs, spaceDir, publicFileTypes) {
        super('copyPublic', () => {
            try {
                sourceDirs.filter(src => src.includes('public')).forEach((publicDir) => {
                    const publicFiles = fs.readdirSync(publicDir);
                    publicFiles.forEach((file) => {
                        const srcPath = path.join(publicDir, file);
                        const destPath = path.join(spaceDir, file);

                        const isValidFile = publicFileTypes.some(type => file.endsWith(type.trim().substring(1)));
                        if (fs.statSync(srcPath).isFile() && isValidFile) {
                            Files.copy(srcPath, destPath);
                        }
                    });
                    console.log(chalk.cyan(`Copy: ${Files.shorten(publicDir)}`));
                });
            } catch (err) {
                console.error(chalk.red(`Error copying public: ${err}`));
                console.error(pe.render(err));
                throw err;
            }
        });
    }
}

export { CopyPublic };
