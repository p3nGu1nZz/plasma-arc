// scripts/build.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIRS = process.env.SOURCE_DIRS.split(',').map(dir => path.join(__dirname, `../${dir}`));
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const OUT_DIR = path.join(BUILD_DIR, process.env.OUT_DIR);
const SPACE_DIR = path.join(BUILD_DIR, process.env.SPACE_DIR);
const PUBLIC_DIR = path.join(__dirname, `../${process.env.PUBLIC_DIR}`);
const EXCLUDE = process.env.EXCLUDE_PATTERNS.split(',');
const INCLUDE = process.env.INCLUDE_PATTERNS.split(',');
const MODULE = process.env.MODULE_NAME;
const PUBLIC_FILE_TYPES = process.env.PUBLIC_FILE_TYPES.split(',');
const SHADERS_DIR = process.env.SHADERS_DIR;

const counters = { dirCount: 0, fileCount: 0 };

const pipeline = new Pipeline();

pipeline.connect(new CreateOut(OUT_DIR, counters));
pipeline.connect(new CopySrc(SOURCE_DIRS, OUT_DIR, SPACE_DIR, EXCLUDE, counters));
pipeline.connect(new LogIncludes(counters));
pipeline.connect(new CreateSpace(SPACE_DIR, counters));
pipeline.connect(new CompileJS(OUT_DIR, SPACE_DIR, MODULE, INCLUDE, EXCLUDE));
pipeline.connect(new CopyPublic([PUBLIC_DIR], SPACE_DIR, PUBLIC_FILE_TYPES, counters));
pipeline.connect(new CopyShaders(SHADERS_DIR, OUT_DIR, counters));
pipeline.connect(new CompileWGSL(SOURCE_DIRS, OUT_DIR, counters));
pipeline.connect(new EmbedShaders(OUT_DIR, SPACE_DIR, MODULE));
pipeline.connect(new UpdateIndex(SPACE_DIR, MODULE));
pipeline.connect(new BuildSummary(counters));

pipeline.flow().catch((err) => pipeline.drain(err));
