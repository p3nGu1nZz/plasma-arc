// scripts/clean.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Pipeline from './utility/Pipeline.js';
import CleanDirs from './pipes/clean/CleanDirs.js';
import DeleteFiles from './pipes/clean/DeleteFiles.js';
import CleanSummary from './pipes/clean/CleanSummary.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const OUT_DIR = path.join(BUILD_DIR, process.env.OUT_DIR);
const SPACE_DIR = path.join(BUILD_DIR, process.env.SPACE_DIR);
const DIRS = [OUT_DIR, SPACE_DIR];

const counters = { dirCount: 0, fileCount: 0 };

const pipeline = new Pipeline();

pipeline.connect(new CleanDirs(DIRS, counters));
pipeline.connect(new DeleteFiles(BUILD_DIR, counters));
pipeline.connect(new CleanSummary(counters));

pipeline.flow();
