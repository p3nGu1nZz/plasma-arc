// scripts/server.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    console.log(chalk.blue(`Request URL: ${req.url}`));
    next();
});

app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.type('application/javascript');
        console.log(chalk.green(`Setting MIME type for: ${req.path}`));
    }
    next();
});

app.use(express.static(path.join(__dirname, '../build/space')));

app.use((req, res, next) => {
    if (!res.headersSent) {
        res.status(404).send('404 Not Found');
    }
});

app.listen(PORT, () => {
    console.log(chalk.yellow(`Server running on port ${PORT}`));
});
