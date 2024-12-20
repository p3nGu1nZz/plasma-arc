// scripts/utility/files.js
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';
import PrettyError from 'pretty-error';
import { match } from 'minimatch';

// Initialize PrettyError
const pe = new PrettyError();

// Load environment variables from .env file
dotenv.config();

const INCLUDE_PATTERNS = process.env.INCLUDE_PATTERNS.split(',');
const EXCLUDE_PATTERNS = process.env.EXCLUDE_PATTERNS.split(',');

class Files {
    static exclude(filePath, excludePatterns = EXCLUDE_PATTERNS) {
        const patternMatched = excludePatterns.some(pattern => match([filePath], pattern).length > 0);
        if (patternMatched) {
            console.log(chalk.yellow(`Exclude: ${filePath}`));
        }
        return patternMatched;
    }

    static include(filePath, includePatterns = INCLUDE_PATTERNS) {
        const patternMatched = includePatterns.some(pattern => match([filePath], pattern).length > 0);
        if (patternMatched) {
            console.log(chalk.green(`Include: ${filePath}`));
        }
        return patternMatched;
    }

    static flatten(file, src) {
        return file.endsWith('.js') && src.includes('src');
    }

    static shorten(filePath, max = 40) {
        return filePath.length > max ? `...${filePath.slice(-max + 3)}` : filePath;
    }

    static count(dir, includePatterns = INCLUDE_PATTERNS, excludePatterns = EXCLUDE_PATTERNS) {
        let count = 0;
        const files = fs.readdirSync(dir);

        console.log(chalk.blue(`Scanning directory: ${dir}`));

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);

            console.log(chalk.blue(`Checking file: ${filePath}`));

            if (stats.isDirectory()) {
                count += Files.count(filePath, includePatterns, excludePatterns);
            } else {
                const isExcluded = Files.exclude(filePath, excludePatterns);
                const isIncluded = Files.include(filePath, includePatterns);
                console.log(chalk.yellow(`isExcluded: ${isExcluded}, isIncluded: ${isIncluded}`));

                if (!isExcluded && isIncluded) {
                    count++;
                    console.log(chalk.green(`Matched file: ${filePath}`));
                } else {
                    console.log(chalk.yellow(`Excluded file: ${filePath}`));
                }
            }
        });

        console.log(chalk.yellow(`Counted ${count} files in ${dir}`));
        return count;
    }

    static create(dir) {
        if (!fs.existsSync(dir)) {
            try {
                fs.mkdirSync(dir, { recursive: true });
                console.log(chalk.yellow(`Created: ${Files.shorten(dir)}`));
            } catch (err) {
                console.error(chalk.red(`Error creating directory: ${err.message}`));
                console.error(pe.render(err));
                throw err;
            }
        }
    }

    static copy(src, dest) {
        try {
            const destDir = path.dirname(dest);
            Files.create(destDir);
            fs.copyFileSync(src, dest);
            console.log(chalk.yellow(`Copied: ${Files.shorten(src)} to ${Files.shorten(dest)}`));
        } catch (err) {
            console.error(chalk.red(`Error copying file: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static copyDir(src, dest, includePatterns = INCLUDE_PATTERNS, excludePatterns = EXCLUDE_PATTERNS) {
        try {
            const files = fs.readdirSync(src);

            files.forEach((file) => {
                const srcPath = path.join(src, file);
                const destPath = Files.flatten(file, srcPath) ? path.join(dest, path.basename(file)) : path.join(dest, file);

                const isExcluded = Files.exclude(srcPath, excludePatterns);
                const isIncluded = Files.include(srcPath, includePatterns);

                if (isExcluded || !isIncluded) {
                    return;
                }

                const stats = fs.statSync(srcPath);

                if (stats.isDirectory()) {
                    Files.create(destPath);
                    Files.copyDir(srcPath, destPath, includePatterns, excludePatterns);
                } else {
                    const parentDir = path.dirname(destPath);
                    Files.create(parentDir);
                    Files.copy(srcPath, destPath);
                }
            });
        } catch (err) {
            console.error(chalk.red(`Error copying directory: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }

    static exists(filePath) {
        return fs.existsSync(filePath);
    }

    static read(dir) {
        return fs.readdirSync(dir);
    }

    static isDir(filePath) {
        return fs.lstatSync(filePath).isDirectory();
    }

    static remove(dir) {
        if (Files.exists(dir)) {
            const files = Files.read(dir);

            files.forEach((file) => {
                const filePath = path.join(dir, file);
                if (Files.isDir(filePath)) {
                    Files.remove(filePath);
                } else {
                    Files.unlink(filePath);
                }
            });

            fs.rmdirSync(dir);
            console.log(chalk.yellow(`Removed: ${Files.shorten(dir)}`));
        }
    }

    static unlink(filePath) {
        try {
            fs.unlinkSync(filePath);
            console.log(chalk.yellow(`Unlinked: ${Files.shorten(filePath)}`));
        } catch (err) {
            console.error(chalk.red(`Error unlinking file: ${err.message}`));
            console.error(pe.render(err));
            throw err;
        }
    }
}

export { Files };
