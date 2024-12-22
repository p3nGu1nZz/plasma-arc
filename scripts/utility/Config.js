// scripts/utility/Config.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Config {
    constructor() {
        if (!Config.instance) {
            this.initializeConfig();
            Config.instance = this;
        }

        return Config.instance;
    }

    initializeConfig() {
        global.CONFIG = {
            SOURCE_DIRS: process.env.SOURCE_DIRS.split(',').map(dir => path.join(__dirname, `../../${dir}`)),
            BUILD_DIR: path.join(__dirname, `../../${process.env.BUILD_DIR}`),
            OUT_DIR: path.join(path.join(__dirname, `../../${process.env.BUILD_DIR}`), process.env.OUT_DIR),
            SPACE_DIR: path.join(path.join(__dirname, `../../${process.env.BUILD_DIR}`), process.env.SPACE_DIR),
            PUBLIC_DIR: path.join(__dirname, `../../${process.env.PUBLIC_DIR}`),
            EXCLUDE: process.env.EXCLUDE_PATTERNS.split(','),
            INCLUDE: process.env.INCLUDE_PATTERNS.split(','),
            MODULE: process.env.MODULE_NAME,
            PUBLIC_FILE_TYPES: process.env.PUBLIC_FILE_TYPES.split(','),
            SHADERS_DIR: path.join(__dirname, `../../${process.env.SHADERS_DIR}`),
            START_TIME: performance.now(),
        };
    }

    static getInstance() {
        if (!Config.instance) {
            new Config();
        }
        return Config.instance;
    }
}

function logConfig(config, prefix = '> ') {
    for (const [key, value] of Object.entries(config)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            logConfig(value, prefix);
        } else {
            console.log(`${prefix}${key}:`, value);
        }
    }
    console.log(); // Add a newline for better readability
}

Config.getInstance();
Object.freeze(Config);

export { logConfig };
