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

let includedFileCount = 0;
let dirCount = 0;

const pipeline = new Pipeline();

pipeline.add(new CreateOut(OUT_DIR));
pipeline.add(new CopySrc(SOURCE_DIRS, OUT_DIR, SPACE_DIR, EXCLUDE));
pipeline.add(new LogIncludes(includedFileCount));
pipeline.add(new CreateSpace(SPACE_DIR));
pipeline.add(new CompileJS(OUT_DIR, SPACE_DIR, MODULE, INCLUDE, EXCLUDE));
pipeline.add(new CopyPublic([PUBLIC_DIR], SPACE_DIR, PUBLIC_FILE_TYPES));
pipeline.add(new CopyShaders(SHADERS_DIR, OUT_DIR));
pipeline.add(new CompileWGSL(SOURCE_DIRS, OUT_DIR));
pipeline.add(new EmbedShaders(OUT_DIR, SPACE_DIR, MODULE));
pipeline.add(new UpdateIndex(SPACE_DIR, MODULE));
pipeline.add(new BuildSummary(dirCount, includedFileCount));

pipeline.execute().catch((err) => pipeline.handleError(err));
