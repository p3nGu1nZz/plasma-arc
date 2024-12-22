// scripts/publish.js

import { logConfig } from './utility/Config.js';
import chalk from 'chalk';
import Pipeline from './utility/Pipeline.js';
import HuggingFace from './pipes/publish/HuggingFace.js';
import Pipe from './utility/Pipe.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

logConfig(global.CONFIG);

const TOKEN = process.env.HF_TOKEN;
const PROJECT = process.env.HF_PROJECT;
const ORG = process.env.HF_ORG;

const pipeline = new Pipeline();

pipeline.connect(new HuggingFace(global.CONFIG.BUILD_DIR, TOKEN, PROJECT, ORG));

pipeline.connect(new Pipe('log', () => {
    console.log(chalk.blue(`Publishing done for project: ${PROJECT}`));
    console.log();
}));

pipeline.flow();
