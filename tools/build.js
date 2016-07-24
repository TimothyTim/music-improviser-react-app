// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
require('dotenv').config();
const fs = require('fs');
const webpack = require('webpack');
const ncp = require('ncp');
const config = require('../webpack.prod.config.js');
const chalk = require('./chalkConfig');

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log(chalk.processing('Generating js config file...'));

fs.writeFileSync('src/constants/config.js', "export default { GOOGLE_TRACKING_ID: '" + process.env.GOOGLE_TRACKING_ID + "' };", 'utf8', (writeError) => {
  if (writeError) {
    return console.log(chalk.error(writeError));
  }
  console.log(chalk.success('config written to /src/constants'));

  return writeError;
});

console.log(chalk.processing('Generating minified bundle for production via Webpack. This will take a moment...'));

webpack(config).run((error, stats) => {
    if (error) { // so a fatal error occurred. Stop here.
        console.log(chalk.error(error));
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.error(error)));
    }

    if (jsonStats.hasWarnings) {
        console.log(chalk.warning('Webpack generated the following warnings: '));
        jsonStats.warnings.map(warning => console.log(chalk.warning(warning)));
    }

    ncp('src/public', 'dist/public');
    ncp('package.json', 'dist/package.json');
    ncp('favicon.ico', 'dist/favicon.ico');

    console.log(`Webpack stats: ${stats}`);

    // if we got this far, the build succeeded.
    console.log(chalk.success('Your app is compiled in production mode in /dist. It\'s ready to roll!'));

    return 0;
});
