/**
 * @file copyFiles.js
 * @description Script to copy files from source directories to the build directory, while excluding specified patterns.
 *              This script handles the copying of files and directories, ensuring certain files are excluded from the build.
 *              It also flattens the directory structure for JS files in the build directory.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Constants:
 * - SOURCE_DIRS: Directories to copy files from.
 * - BUILD_DIR: Directory to copy files to.
 * - EXCLUDE_PATTERNS: Patterns of files to exclude from copying.
 * - INCLUDE_PATTERNS: Patterns of files to include in copying.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_DIRS = [path.join(__dirname, '../src'), path.join(__dirname, '../public')];
const BUILD_DIR = path.join(__dirname, '../build');
const EXCLUDE_PATTERNS = ['server.js'];
const INCLUDE_PATTERNS = ['**/*.js', '**/*.html', '**/*.css']; // Example patterns, adjust as needed

// Function to check if a file should be excluded
function shouldExclude(filePath) {
    return EXCLUDE_PATTERNS.some(pattern => filePath.endsWith(pattern));
}

// Function to copy files while respecting exclude patterns and flattening JS files
function copyFiles(src, dest) {
    fs.readdir(src, (err, files) => {
        if (err) {
            console.error(chalk.red(`Error reading directory: ${err}`));
            return;
        }

        files.forEach((file) => {
            const srcPath = path.join(src, file);
            const destPath = shouldFlatten(file, srcPath) ? path.join(dest, path.basename(file)) : path.join(dest, file);

            if (shouldExclude(file)) {
                console.log(chalk.yellow(`Excluded: ${srcPath}`));
                return;
            }

            fs.stat(srcPath, (err, stats) => {
                if (err) {
                    console.error(chalk.red(`Error reading file: ${err}`));
                    return;
                }

                if (stats.isDirectory()) {
                    if (!fs.existsSync(destPath)) {
                        fs.mkdirSync(destPath);
                        console.log(chalk.cyan(`Created directory: ${destPath}`));
                    }
                    copyFiles(srcPath, destPath);
                } else {
                    fs.copyFile(srcPath, destPath, (err) => {
                        if (err) {
                            console.error(chalk.red(`Error copying file: ${err}`));
                        } else {
                            console.log(chalk.green(`Copied: ${srcPath} to ${destPath}`));
                        }
                    });
                }
            });
        });
    });
}

// Function to determine if a file should be flattened
function shouldFlatten(file, srcPath) {
    return file.endsWith('.js') && srcPath.includes('src');
}

// Ensure the build directory exists
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
    console.log(chalk.cyan(`Created directory: ${BUILD_DIR}`));
}

// Start the file copy process for each source directory
SOURCE_DIRS.forEach((srcDir) => {
    copyFiles(srcDir, BUILD_DIR);
});
