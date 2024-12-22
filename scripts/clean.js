// scripts/clean.js

import './utility/Config.js';
import Pipeline from './utility/Pipeline.js';
import CleanDirs from './pipes/clean/CleanDirs.js';
import DeleteFiles from './pipes/clean/DeleteFiles.js';
import CleanSummary from './pipes/clean/CleanSummary.js';

const counters = { dirCount: 0, fileCount: 0 };

const pipeline = new Pipeline();

pipeline.connect(new CleanDirs([global.CONFIG.OUT_DIR, global.CONFIG.SPACE_DIR], counters));
pipeline.connect(new DeleteFiles(global.CONFIG.BUILD_DIR, counters));
pipeline.connect(new CleanSummary(counters));

pipeline.flow();
