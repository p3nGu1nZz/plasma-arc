// scripts/publish.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import Pipeline from './utility/Pipeline.js';
import HuggingFace from './pipes/publish/HuggingFace.js';
import Pipe from './utility/Pipe.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const TOKEN = process.env.HF_TOKEN;
const PROJECT = process.env.HF_PROJECT;
const ORG = process.env.HF_ORG;

const pipeline = new Pipeline();

pipeline.connect(new HuggingFace(BUILD_DIR, TOKEN, PROJECT, ORG));

pipeline.connect(new Pipe('log', () => {
    console.log(chalk.blue(`Publishing done for project: ${PROJECT}`));
    console.log();
}));

pipeline.flow();
