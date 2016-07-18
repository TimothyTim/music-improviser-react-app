const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev.config.js');
const bundler = webpack(config);

module.exports = () => {
    browserSync({
      server: {
        baseDir: 'src',

        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: config.output.publicPath,
            // pretty colored output
            stats: { colors: true },
            // Set to false to display a list of each file that is being bundled.
            noInfo: true
          }),

          webpackHotMiddleware(bundler),

          historyApiFallback()
        ]
      },

      files: [
        'src/*.html'
      ]
    });
};
