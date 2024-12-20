// scripts/publish.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { Pipeline } from './utility/Pipeline.js';
import { HuggingFace } from './pipes/publish/HuggingFace.js';

// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Initialize PrettyError
const pe = new PrettyError();

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const TOKEN = process.env.HF_TOKEN;
const PROJECT = process.env.HF_PROJECT;
const ORG = process.env.HF_ORG;

const pipeline = new Pipeline();

pipeline.add(new HuggingFace(BUILD_DIR, TOKEN, PROJECT, ORG));

pipeline.add(new Pipe('log', () => {
    console.log(chalk.blue(`Publishing done for project: ${PROJECT}`));
    console.log();
}));

pipeline.run();
