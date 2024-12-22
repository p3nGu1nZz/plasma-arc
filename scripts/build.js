// scripts/build.js

import { logConfig } from './utility/Config.js';
import Pipeline from './utility/Pipeline.js';
import CreateOut from './pipes/build/CreateOut.js';
import CopySrc from './pipes/build/CopySrc.js';
import LogIncludes from './pipes/build/LogIncludes.js';
import CreateSpace from './pipes/build/CreateSpace.js';
import CompileJS from './pipes/build/CompileJS.js';
import CopyPublic from './pipes/build/CopyPublic.js';
import CopyShaders from './pipes/build/CopyShaders.js';
import EmbedShaders from './pipes/build/EmbedShaders.js';
import UpdateIndex from './pipes/build/UpdateIndex.js';
import BuildSummary from './pipes/build/BuildSummary.js';
import CompileWGSL from './pipes/build/CompileWGSL.js';

logConfig(global.CONFIG);

const counters = { dirCount: 0, fileCount: 0 };

const pipeline = new Pipeline();

pipeline.connect(new CreateOut(global.CONFIG.OUT_DIR, counters));
pipeline.connect(new CopySrc(global.CONFIG.SOURCE_DIRS, global.CONFIG.OUT_DIR, global.CONFIG.SPACE_DIR, global.CONFIG.EXCLUDE, counters));
pipeline.connect(new LogIncludes(counters));
pipeline.connect(new CreateSpace(global.CONFIG.SPACE_DIR, counters));
pipeline.connect(new CompileJS(global.CONFIG.OUT_DIR, global.CONFIG.SPACE_DIR, global.CONFIG.MODULE, global.CONFIG.INCLUDE, global.CONFIG.EXCLUDE));
pipeline.connect(new CopyPublic([global.CONFIG.PUBLIC_DIR], global.CONFIG.SPACE_DIR, global.CONFIG.PUBLIC_FILE_TYPES, counters));
pipeline.connect(new CopyShaders(global.CONFIG.SHADERS_DIR, global.CONFIG.OUT_DIR, counters));
pipeline.connect(new CompileWGSL(global.CONFIG.SOURCE_DIRS, global.CONFIG.OUT_DIR, counters));
pipeline.connect(new EmbedShaders(global.CONFIG.OUT_DIR, global.CONFIG.SPACE_DIR, global.CONFIG.MODULE));
pipeline.connect(new UpdateIndex(global.CONFIG.SPACE_DIR, global.CONFIG.MODULE));
pipeline.connect(new BuildSummary(counters));

pipeline.flow().catch((err) => pipeline.drain(err));
