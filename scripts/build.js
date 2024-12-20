/**
 * @file scripts/build.js
 * @description Manages the build process, including source file processing, directory creation, file copying, and JavaScript compilation.
 * @version 1.0.0
 * @license MIT
 * author: K. Rawson
 * @contact rawsonkara@gmail.com
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * 
 * Imports:
 * - fs: Node.js file system module for file operations.
 * - path: Node.js path module for handling file paths.
 * - dotenv: For environment variable management.
 * - chalk: For color-coded logging.
 * - pretty-error: For improved error stack traces.
 * - glob: For pattern matching files.
 * - { Pipeline, Pipe } from './utility/pipeline.js': For setting up and managing the build pipeline.
 * - { Files } from './utility/files.js': For file and directory operations.
 * - Compiler from './utility/compiler.js': For compiling JavaScript files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { sync as globSync } from 'glob';
import { Pipeline, Pipe } from './utility/pipeline.js';
import { Files } from './utility/files.js';
import Compiler from './utility/compiler.js';

// Initialize PrettyError
const pe = new PrettyError();

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Split and construct the SOURCE_DIRS paths properly
const SOURCE_DIRS = process.env.SOURCE_DIRS.split(',').map(dir => path.join(__dirname, `../${dir}`));
const BUILD_DIR = path.join(__dirname, `../${process.env.BUILD_DIR}`);
const OUT_DIR = path.join(BUILD_DIR, 'out');
const SPACE_DIR = path.join(BUILD_DIR, 'space');
const EXCLUDE = process.env.EXCLUDE_PATTERNS.split(',');
const INCLUDE = process.env.INCLUDE_PATTERNS.split(',');
const MODULE = process.env.MODULE_NAME;
const ROOT_FILE = process.env.ROOT_FILE;
const PUBLIC_FILE_TYPES = process.env.PUBLIC_FILE_TYPES.split(',');

let fileCount = 0;
let dirCount = 0;
let includedFileCount = 0;

const pipeline = new Pipeline();

pipeline.add(new Pipe('createOut', () => {
    try {
        Files.create(OUT_DIR);
        console.log(chalk.cyan(`Create: ${Files.shorten(OUT_DIR)}`));
        dirCount++;
    } catch (err) {
        console.error(chalk.red(`Error creating out directory: ${err}`));
        console.error(pe.render(err));
        throw err;
    }
}));

pipeline.add(new Pipe('copySrc', () => {
    try {
        SOURCE_DIRS.filter(src => src.includes('src')).forEach((srcDir) => {
            const pattern = path.join(srcDir, '**/*');
            const files = globSync(pattern, { ignore: EXCLUDE });

            if (!files.length) {
                console.warn(chalk.yellow(`No files found in ${srcDir}`));
            } else {
                console.log(chalk.green(`Copying files from ${srcDir}`));
            }

            files.forEach((filePath) => {
                const relativePath = path.relative(srcDir, filePath);
                const destPath = path.join(OUT_DIR, relativePath);

                if (fs.statSync(filePath).isFile()) {
                    Files.copy(filePath, destPath);
                }
            });
        });
    } catch (err) {
        console.error(chalk.red(`Error copying src: ${err}`));
        console.error(pe.render(err));
        throw err;
    }
}));

pipeline.add(new Pipe('logIncludedFiles', () => {
    console.log(chalk.blue(`Total included files: ${includedFileCount}`));
}));

pipeline.add(new Pipe('createSpace', () => {
    try {
        Files.create(SPACE_DIR);
        console.log(chalk.cyan(`Create: ${Files.shorten(SPACE_DIR)}`));
        dirCount++;
    } catch (err) {
        console.error(chalk.red(`Error creating space directory: ${err}`));
        console.error(pe.render(err));
        throw err;
    }
}));

pipeline.add(new Pipe('compile', () => {
    try {
        console.log(`Compiling files from directory: ${OUT_DIR}`);
        const options = { include: INCLUDE, exclude: EXCLUDE, sourceMaps: true };
        Compiler.compile(OUT_DIR, path.join(SPACE_DIR, MODULE), options);
    } catch (err) {
        console.error(chalk.red(`Error during compile: ${err}`));
        console.error(pe.render(err));
        throw err;
    }
}));

pipeline.add(new Pipe('copyPublic', () => {
    try {
        SOURCE_DIRS.filter(src => src.includes('public')).forEach((publicDir) => {
            const publicFiles = fs.readdirSync(publicDir);
            publicFiles.forEach((file) => {
                const srcPath = path.join(publicDir, file);
                const destPath = path.join(SPACE_DIR, file);

                const isValidFile = PUBLIC_FILE_TYPES.some(type => file.endsWith(type.trim().substring(1)));
                if (fs.statSync(srcPath).isFile() && isValidFile) {
                    Files.copy(srcPath, destPath);
                }
            });
            console.log(chalk.cyan(`Copy: ${Files.shorten(publicDir)}`));
        });
    } catch (err) {
        console.error(chalk.red(`Error copying public: ${err}`));
        console.error(pe.render(err));
        throw err;
    }
}));

pipeline.add(new Pipe('embedShaders', () => {
    const shadersDir = path.join(OUT_DIR, 'shaders');
    const destFile = path.join(SPACE_DIR, MODULE);

    if (Files.exists(shadersDir)) {
        try {
            const shaderFiles = Files.read(shadersDir);
            let shaderCode = '';

            shaderFiles.forEach((shader) => {
                const shaderPath = path.join(shadersDir, shader);
                const code = fs.readFileSync(shaderPath, 'utf-8');
                shaderCode += `// ${shader}\n${code}\n\n`;
            });

            fs.appendFileSync(destFile, shaderCode);
            console.log(chalk.cyan(`Embed: ${Files.shorten(destFile)}`));
        } catch (err) {
            console.error(chalk.red(`Error embedding shader: ${err}`));
            console.error(pe.render(err));
            throw err;
        }
    } else {
        console.warn(chalk.yellow(`Shaders not found: ${Files.shorten(shadersDir)}`));
    }
}));

pipeline.add(new Pipe('updateIndex', () => {
    const indexPath = path.join(SPACE_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
        try {
            let content = fs.readFileSync(indexPath, 'utf-8');
            content = content.replace(/<script type="module" src=".*"><\/script>/, `<script type="module" src="${MODULE}"></script>`);
            fs.writeFileSync(indexPath, content);
            console.log(chalk.cyan(`Update: ${Files.shorten(indexPath)}`));
        } catch (err) {
            console.error(chalk.red(`Error updating index: ${err}`));
            console.error(pe.render(err));
            throw err;
        }
    }
}));

pipeline.add(new Pipe('log', () => {
    console.log();
    console.log(chalk.blue(`Total dirs created: ${dirCount}`));
    console.log(chalk.blue(`Total files processed: ${fileCount}`));
    console.log();
}));

pipeline.run();
