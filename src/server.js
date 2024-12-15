/**
 * @file server.js
 * @description Node.js server setup for serving static files and handling requests for the Plasma Arc Project.
 *              This script sets up middleware for logging requests, handling MIME types, and serving static assets.
 * @version 1.0.0
 * @license MIT
 * @see {@link https://github.com/p3nGu1nZz/plasma-arc|GitHub Repository}
 * @author K. Rawson
 * @contact rawsonkara@gmail.com
 * 
 * Middleware:
 * - Logging requests using chalk for color-coded console output
 * - Setting correct MIME types for .js files
 * 
 * Static Files:
 * - Serving files from 'public', 'src', 'assets', 'components', 'shaders', 'utils', and 'wgpu' directories
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(chalk.blue(`Request URL: ${req.url}`));
    next();
});

// Middleware to set correct MIME types for .js files and log responses
app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.type('application/javascript');
        console.log(chalk.green(`Setting MIME type for: ${req.path}`));
    }
    next();
});

// Serve static files from the 'public', 'src', and 'assets' directories
app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../src/components')));
app.use(express.static(path.join(__dirname, '../src/shaders')));
app.use(express.static(path.join(__dirname, '../src/utils')));
app.use(express.static(path.join(__dirname, '../src/wgpu')));


// If no file is found, respond with a 404 error
app.use((req, res, next) => {
    if (!res.headersSent) {
        res.status(404).send('404 Not Found');
    }
});

app.listen(PORT, () => {
    console.log(chalk.yellow(`Server running on port ${PORT}`));
});
