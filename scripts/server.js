/**
 * scripts/server.js
 * © 2025 Kara Rawson
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Determine the environment
const isProd = process.env.NODE_ENV === 'production';

// Middleware to log requests
app.use((req, res, next) => {
    console.log(chalk.blue(`[plasma-arc] Request URL: ${req.url}`));
    next();
});

// Middleware to set correct MIME types for .js files
app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.type('application/javascript');
        console.log(chalk.green(`[plasma-arc] Setting MIME type for: ${req.path}`));
    }
    next();
});

// Serve different static directories based on the environment
if (isProd) {
    app.use(express.static(path.join(__dirname, `../${process.env.BUILD_DIR}/${process.env.SPACE_DIR}`)));
} else {
    app.use(express.static(path.join(__dirname, `../${process.env.PUBLIC_DIR}`)));
    app.use(express.static(path.join(__dirname, `../${process.env.SOURCE_DIRS}`)));
    app.use(express.static(path.join(__dirname, `../assets`)));
    app.use(express.static(path.join(__dirname, `../src/components`)));
    app.use(express.static(path.join(__dirname, `../src/shaders`)));
    app.use(express.static(path.join(__dirname, `../src/utils`)));
    app.use(express.static(path.join(__dirname, `../src/wgpu`)));
}

// If no file is found, respond with a 404 error
app.use((req, res, next) => {
    if (!res.headersSent) {
        res.status(404).send(chalk.red('[plasma-arc] 404 Not Found'));
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(chalk.yellow(`[plasma-arc] Server running on port ${PORT}`));
});
