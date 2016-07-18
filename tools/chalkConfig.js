// Centralized configuration for chalk, which is used to add color to console.log statements.
const chalk = require('chalk');

module.exports = {
    error: chalk.red,
    success: chalk.green,
    warning: chalk.yellow,
    processing: chalk.blue
};
