// scripts/utility/Files.js

import chalk from 'chalk';
import dotenv from 'dotenv';
import PrettyError from 'pretty-error';
import { match } from 'minimatch';
import fs from 'fs';
import path from 'path';

const pe = new PrettyError();

dotenv.config();

const INCLUDE_PATTERNS = process.env.INCLUDE_PATTERNS.split(',');
const EXCLUDE_PATTERNS = process.env.EXCLUDE_PATTERNS.split(',');

class Files {
    static exclude(filePath, excludePatterns = EXCLUDE_PATTERNS) {
        try {
            const patternMatched = excludePatterns.some(pattern => match([filePath], pattern).length > 0);
            if (patternMatched) {
                console.log(chalk.yellow(`Exclude: ${filePath}`));
            }
            return patternMatched;
        } catch (err) {
            console.error(chalk.red(`Error excluding file: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static include(filePath, includePatterns = INCLUDE_PATTERNS) {
        try {
            const patternMatched = includePatterns.some(pattern => match([filePath], pattern).length > 0);
            if (patternMatched) {
                console.log(chalk.green(`Include: ${filePath}`));
            }
            return patternMatched;
        } catch (err) {
            console.error(chalk.red(`Error including file: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static flatten(file, src) {
        try {
            return file.endsWith('.js') && src.includes('src');
        } catch (err) {
            console.error(chalk.red(`Error flattening file: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static shorten(filePath, max = 40) {
        try {
            return filePath.length > max ? `...${filePath.slice(-max + 3)}` : filePath;
        } catch (err) {
            console.error(chalk.red(`Error shortening file path: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static create(dirPath) {
        try {
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                console.log(chalk.green(`Created directory: ${dirPath}`));
            } else {
                console.log(chalk.yellow(`Directory already exists: ${dirPath}`));
            }
        } catch (err) {
            console.error(chalk.red(`Error creating directory: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static exists(filePath) {
        try {
            return fs.existsSync(filePath);
        } catch (err) {
            console.error(chalk.red(`Error checking existence of file: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static read(dirPath) {
        try {
            return fs.readdirSync(dirPath);
        } catch (err) {
            console.error(chalk.red(`Error reading directory: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static isDir(filePath) {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            console.error(chalk.red(`Error checking if path is a directory: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static remove(filePath) {
        try {
            fs.rmSync(filePath, { recursive: true, force: true });
            console.log(chalk.green(`Removed: ${filePath}`));
        } catch (err) {
            console.error(chalk.red(`Error removing file or directory: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static unlink(filePath) {
        try {
            fs.unlinkSync(filePath);
            console.log(chalk.green(`Unlinked: ${filePath}`));
        } catch (err) {
            console.error(chalk.red(`Error unlinking file: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }
}

export { Files };
