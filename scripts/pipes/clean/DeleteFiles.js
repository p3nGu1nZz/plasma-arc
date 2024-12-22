// scripts/pipes/clean/DeleteFiles.js

import Pipe from '../../utility/Pipe.js';
import Files from '../../utility/Files.js';

class DeleteFiles extends Pipe {
    constructor(buildDir, counters) {
        super('deleteFiles', () => {
            if (Files.exists(buildDir)) {
                try {
                    Files.remove(buildDir);
                    counters.dirCount++;
                } catch (err) {
                    this.handleLeak(err);
                }
            }
        });
    }
}

export default DeleteFiles;
