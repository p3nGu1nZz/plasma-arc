// scripts/clean.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Pipeline } from './utility/Pipeline.js';
import { CleanDirs } from './pipes/clean/CleanDirs.js';
import { DeleteFiles } from './pipes/clean/DeleteFiles.js';
import { CleanSummary } from './pipes/clean/CleanSummary.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const SPACE_DIR = path.join(BUILD_DIR, 'space');
const OUT_DIR = path.join(BUILD_DIR, 'out');
const DIRS = [OUT_DIR, SPACE_DIR];

let dirCount = 0;
let fileCount = 0;

const pipeline = new Pipeline();

pipeline.add(new CleanDirs(DIRS));
pipeline.add(new DeleteFiles(BUILD_DIR));
pipeline.add(new CleanSummary(dirCount, fileCount));

pipeline.execute();
